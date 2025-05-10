import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { dbConnection } from "./dbConnection";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    
providers: [
  CredentialsProvider({
    name: 'Credentials',
    
    credentials: {
      email: { label: "email", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      if(!credentials?.email || !credentials?.password){
        throw new Error("Missing email or password")
      }
      try {
        await dbConnection()
        const user = await User.findOne({email: credentials.email})
        if(!user){
            throw new Error("no user found")
        }
        const isValid = await bcrypt.compare(credentials.password, user.password)
        if(!isValid){
            throw new Error("incorrect password")
        }

        return{
            id: user._id.toString(),
            email: user.email
        }
      } catch (error) {
        throw error   
      } 
    }
  })
],

    callbacks:{
        async session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
        async jwt({ token, user }) {
            if(user){
                token.id = user.id 
            }
            return token
        }
    }, 
    pages:{
        signIn: '/login',
        error: "/login"
    },
    session:{
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    secret: process.env.NEXTAUTH_SECRET


}
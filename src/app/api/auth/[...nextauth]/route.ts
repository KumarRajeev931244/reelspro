import { authOptions } from "@/app/libs/auth";
import NextAuth, { AuthOptions } from "next-auth";

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}
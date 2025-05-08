import { NextRequest,NextResponse } from "next/server";
import { dbConnection } from "@/app/libs/dbConnection";
import User from "@/models/User";

export async function POST(request: NextRequest){
    try {
        const {email, password} =  await request.json()
        
        if(!email || !password){
            return NextResponse.json(
                {error: "email and password is required"},
                {status: 400}
            )
        }
        const response = await dbConnection()
    
        console.log("response:", response);
        
        const existingUser = await User.findOne({email})
        
        
        if(existingUser){
            return NextResponse.json(
                {error: "email already register please login"},
                {status: 400}
            )
        }
        await User.create({
            email,
            password
        })
        return NextResponse.json(
            {message: "user register successfully"},
            {status: 201}
        )
    } catch (error) {
        return NextResponse.json(
            {error: "failed to register user "},
            {status: 500}
        )
        
    }
}
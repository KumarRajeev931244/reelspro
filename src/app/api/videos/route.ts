import { authOptions } from "@/app/libs/auth";
import { dbConnection } from "@/app/libs/dbConnection";
import Video, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try {
        await dbConnection()
        const videos = await Video.find({}).sort({createdAt: -1}).lean()
        if(!videos || videos.length === 0){
            return NextResponse.json([], {status:400})
        }
        return NextResponse.json(videos)
    } catch (error) {
        return  NextResponse.json(
            {error: "failed to fetch videos"},
            {status: 500}
        )
        
    }
}

export async function POST(request: NextRequest){
    try {
        // find user is login
        const session = await getServerSession(authOptions)
        console.log("session:",session);
        
        if(!session){
            return NextResponse.json(
                {error:"unauthorized"},
                {status: 401}
            )
        }
        await dbConnection()
        const body:IVideo = await request.json()
        if(
            !body.description ||
            !body.videoUrl ||
            !body.thumbnailUrl || 
            !body.title
        ){
            return NextResponse.json(
                {error: "missing required field"},
                {status: 400}
            )
        }
        const videoData = {
            ...body,
            controls: body.control ?? true,
            transformation:{
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100
            }
        }
          const newVideo = await Video.create(videoData)
          return NextResponse.json(newVideo)
    } catch (error) {
        return NextResponse.json(
            {error: "failed to create a video"},
            {status: 500}
        )
        
    }

}
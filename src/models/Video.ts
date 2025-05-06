import mongoose from "mongoose";

export const video_Dimension = {
    height: 1920,
    width: 1080
} as const

export interface IVideo{
    _id?: mongoose.Types.ObjectId,
    title: string,
    description: string,
    videoUrl: string,
    thumbnailUrl: string;
    control?: boolean;
    transformation?:{
        height: number,
        width: number
        quality?: number
    },
    createdAt?: number,
    updatedAt?: number

}

const videoSchema = new mongoose.Schema<IVideo>({
    title:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    thumbnailUrl:{
        type: String,
        required: true
    },
    control:{
        type: Boolean,
        required: true
    },
    transformation:{
        height:{
            type:Number,
            default: video_Dimension.height
        },
        width:{
            type:Number,
            default: video_Dimension.width
        },
        quality:{
            type: Number,
            min: 1,
            max: 100
        }
    },
    

},{timestamps: true})

const Video = mongoose.models?.Video || mongoose.model<IVideo>('Video', videoSchema)

export default Video
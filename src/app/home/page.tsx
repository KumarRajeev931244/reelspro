import { IVideo } from "@/models/Video";
import { useEffect, useState } from "react";
import { apiClient } from "../libs/api-client";

export default function Home(){
    const [videos, setVideos] = useState<IVideo[]>([])
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const data =  await apiClient.getVideos()
                setVideos(data)
            } catch (error) {
                console.error("error fetching videos", error)
            }
        }
        fetchVideos()
    }, [])
    return(
        <div>
            <h1>chai aur code</h1>
        </div>
    )
}
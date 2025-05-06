import { Connection } from "mongoose"
declare global{
    var mongoose:{
        conn: Connection | null            //connection already exists
        promise: Promise<Connection> | null        // connection ho raha hai
    }
}

export {}
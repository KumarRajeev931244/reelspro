import mongoose, { models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
    email: string,
    password: string,
    id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new Schema({
    email:{
        type:String,
        required: true,
        unique: true
    }, 
    password:{
        type: String,
        required: [true, "password is required"]
    }
},{timestamps: true})

// mongodb mae save karne se phele

userSchema.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
})


// const User = models?.User || mongoose.model<IUser>("User",userSchema)
const User = (models.users as mongoose.Model<IUser>) || mongoose.model<IUser>("users",userSchema)

export default User
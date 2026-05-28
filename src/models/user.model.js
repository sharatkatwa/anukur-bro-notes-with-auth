import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique: true,
        lowercase: true,
        trim: true,
    }
})

const UserModel = mongoose.model("User",userSchema)

export default UserModel
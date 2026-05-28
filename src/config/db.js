import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb://localhost:27017/notesAuth")
        console.log("Mongodb connected successfully");
        
    } catch (error) {
        console.log("error connecting mongodb", error);
    }

}

export default connectDB
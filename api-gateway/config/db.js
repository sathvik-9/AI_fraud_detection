import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/fraudDetection");
        console.log("MongoDB connected");
    }
    catch(error){
        console.log("Error connecting to MongoDB:", error);
    }
}
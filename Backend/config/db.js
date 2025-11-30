import mongoose from "mongoose";

export const connectDb=async()=>{
    await mongoose.connect('mongodb+srv://oiiamsaurav_fooddeliveryproject:Bigbang_1306@cluster0.3c5krfp.mongodb.net/food-del').then(()=>{
        console.log("db connected");
    })
}
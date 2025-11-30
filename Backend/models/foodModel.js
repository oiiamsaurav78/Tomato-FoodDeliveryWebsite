import mongoose from "mongoose";

const foodSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    category:{type:String}
})

const foodModel=mongoose.models.food ||  mongoose.model("food",foodSchema);
// if model is created it will not create again other wise it create everytime

export default foodModel;
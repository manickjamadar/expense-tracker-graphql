import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    description:{
        type:String,
        required:true,
    },
    paymentType:{
        type:String,
        enum:["CASH","CARD"],
    },
    category:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    date: {
        type:Date,
        required:true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    }
},{timestamps:true});
const Transaction = mongoose.model("Transaction",transactionSchema);
export default Transaction;
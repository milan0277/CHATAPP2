const mongoose=require('mongoose');
const userModel = require("./userModel")
const conversationModel = require("./conversationModel");

const messageSchema = new mongoose.Schema({
    convoId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversationModel",
        required:true
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel",
        required:true
    },
    message:{
        type:String
    },
    attachment:{
        type:String
    }        
},{timestamps:true})

const messageModel=mongoose.model('messageModel',messageSchema)
module.exports=messageModel
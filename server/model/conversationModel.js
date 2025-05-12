const mongoose=require("mongoose");
const userModel = require('./userModel')
const messageModel = require('./messageModel')

const conversationSchema=new mongoose.Schema({
    
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    }],
    
    messages:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"messageModel"
    }],

},{timestamps:true})        

const conversationModel = mongoose.model("conversationM",conversationSchema)
module.exports=conversationModel
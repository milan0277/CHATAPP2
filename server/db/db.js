const mongoose=require('mongoose');
require('dotenv').config()
const mongoUrl=process.env.MONGO_URL;

mongoose.connect(mongoUrl)

const db=mongoose.connection

db.on("connected",()=>{
    console.log('db connected')
})
db.on("error",()=>{
    console.log('db error')
})
db.on("disconnected",()=>{
    console.log('db dis-connected')
})

module.exports=db


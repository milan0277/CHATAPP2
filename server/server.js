const express=require('express');
const app=express();
require('dotenv').config()
const bodyParser=require('body-parser')
const cors=require('cors');
const cookieParser=require('cookie-parser')
const { Server } = require("socket.io");
const http=require('http')
const path=require('path')


const server=http.createServer(app)
const io=new Server(server,{
  cors:{
    origin: 'http://localhost:5173', // Without trailing slash
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Include credentials if necessary
  }
})

//db
const db = require("./db/db")
//parse
app.use(bodyParser.json())
//port
const PORT=process.env.PORT || 5000;
//cookie parser
app.use(cookieParser())

//routes
const userRouter = require("./route/userRoute")
const chatRouter = require('./route/chatRoute')


const corsOptions = {
  origin: 'http://localhost:5173', // Without trailing slash
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Include credentials if necessary
};
app.use(cors(corsOptions))

const users=new Map()

io.on("connection",(socket)=>{
  console.log('user connected',socket.id)
  // console.log("users at connection created time",users)

  socket.on("register",(userId)=>{
    console.log("registerUserId :",userId)
    users.set(userId,socket.id)
    console.log(users)
  })


  socket.on('message',({m,receiverId,senderId})=>{
    // console.log(m,image,audio,receiverId)
    console.log("socket",m,receiverId,senderId)
    const receiverSocketId=users.get(receiverId)
    // console.log(u)
   
    
    // console.log("receiverSoketId:",receiverSocketId)
    // if(m==="" && !audio){
    //   if(receiverSocketId){
    //     // console.log("!m")
    //     io.to(receiverSocketId).emit("data",{image,senderId})
    //   }
    // }
    // else if(m && !image){
    //   if(receiverSocketId){
    //     // console.log("!image")
    //     io.to(receiverSocketId).emit("data",{m,senderId})  
    //   }
    // }
    // else if(!m && !image && audio){
    //   if(receiverSocketId){
    //     // console.log("!image")
    //     io.to(receiverSocketId).emit("data",{audio,senderId})
    //   }
    // }
    // else{
      if(receiverSocketId){
        // console.log('both')
        io.to(receiverSocketId).emit("data",{m,senderId})
      }
      else{
        console.log("user is not online")
      }
    // }
   
  })
   

  socket.on("deletemessage",({mId,receiverId})=>{
    console.log("users",users)
    console.log(mId,receiverId)
    let receiverSocektId = users.get(receiverId)
    console.log(receiverSocektId)
    if(receiverSocektId){
      io.to(receiverSocektId).emit("dMessage",mId)
    }
})


  socket.on('disconnect',()=>{
    users.forEach((value,key)=>{
      if(value===socket.id){
        users.delete(key)
      }
    })
    console.log('user disconnected',socket.id)
  })

})


app.use("/app",userRouter)
app.use('/app',chatRouter)
server.listen(PORT,()=>{
    console.log('server is running at ',PORT)
})
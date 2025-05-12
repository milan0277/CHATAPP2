const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const genToken = require('../jwt/gentoken')

const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        // console.log(email,password)
        if(!email || !password){
            return res.status(400).json({error:"all fields are required"})
        }
        // console.log(email,password)

        const existUser=await userModel.findOne({email});
        if(!existUser){
            return res.status(400).json({message:"agent doesn't exist"})
        }
        // console.log('email found',existUser)

        const Password=await bcrypt.compare(password,existUser.password)

        if(!Password){
            return res.status(400).json({message:"invalid password"})
        }

        genToken(res,existUser._id)
        return res.status(200).json({message:"login succesfull",existUser})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"internal server error"})
    }
}

const signup=async(req,res)=>{
    try{

        const { name,email,password }=req.body;
        console.log(name,email,password)
        if(!name || !email || !password ){
            return res.status(400).json({message:"All fields are required"})
        }

        const existUser=await userModel.findOne({email})
        if(existUser){
            return res.status(400).json({message:"agent exist"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        if(!hashedPassword){
            return res.status(400).json({message:"password is not hashed"})
        }

        const newDoc=new userModel({name,email,password:hashedPassword})
        const newagent=await newDoc.save()

        return res.status(201).json({message:"created successfully",newagent})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"internal server error"})
    }
}

const logout = (req,res)=>{
    try{
        const cookie = req.cookies.jwtCookie;
        // console.log("cookies :",cookie)
        return res.status(200).clearCookie("jwtCookie").json({message:"logout successfull"})
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"internal server error"})
    }
}


module.exports = { Login,signup,logout }
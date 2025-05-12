const jwt=require('jsonwebtoken')

const genToken=async(res,id)=>{
    try{
        const token = jwt.sign({id},process.env.SECERET_KEY,{expiresIn:"1d"})
        // console.log("token :",token)
        return res.cookie("jwtCookie",token,{ maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"internal server error"})
    }

}

module.exports=genToken
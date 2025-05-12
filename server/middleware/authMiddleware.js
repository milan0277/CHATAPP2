const jwt=require('jsonwebtoken')

const authMid = async(req,res,next)=>{
    try{
        const cookies = req.cookies.jwtCookie;
        if(!cookies){
            return res.status(400).json({message:"no cookie found"})
        }

        const decode = jwt.verify(cookies,process.env.SECERET_KEY)
        if(!decode){
            return res.status(400).json({message:"token is not valid"})
        }

        req._id=decode.id;
        next()
    }
    catch(err){
        console.log(err)
        return res.status(500).json({error:"internal server error at authmid"})
    }
}

module.exports=authMid
const express=require('express');
const router=express.Router();
const authMid = require("../middleware/authMiddleware")

const { Login,signup,logout } = require('../controller/user')

router.post("/api/login",Login)
router.post("/api/signup",signup)
router.get('/api/logout',authMid,logout)

module.exports=router
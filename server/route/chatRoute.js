const express=require('express');
const router=express.Router();
const authMid = require("../middleware/authMiddleware");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,  '-' + uniqueSuffix+file.originalname )
    }
  })
  
  const upload = multer({ storage: storage })

const { allUserExceptLoggedUser,sendMessage,receiveMessage,showImage } = require('../controller/chat');

router.get('/api/otherusers',authMid,allUserExceptLoggedUser)
router.post('/api/sendmessage/:id',authMid,upload.single("attachment"),sendMessage)
router.get('/api/receivemessage/:id',authMid,receiveMessage)
router.get('/api/showimage/:fileName',authMid,showImage)

module.exports = router
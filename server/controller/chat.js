const userModel = require("../model/userModel");
const messageModel = require("../model/messageModel");
const conversationModel = require("../model/conversationModel");
const path = require("path");

const allUserExceptLoggedUser = async (req, res) => {
  try {
    const id = req._id;

    const otherUsers = await userModel.find({ _id: { $ne: id } });
    // console.log("otherusers :",otherUsers)

    return res.status(200).json(otherUsers);
  } catch (err) {
    console.log("error at allUserExceptLoggedUser api:", err);
    return res.status(500).json({ error: "internal server error" });
  }
};

const sendMessage = async (req, res) => {
  try {
    const senderId = req._id;
    const receiverId = req.params.id;

    const message = req.body?.message ? req?.body?.message : null;

    const attachment = req?.file ? req?.file?.filename : null;
    console.log("attachment :", attachment);

    if (!senderId) {
      return res.status(400).json({ error: "u are not a valid user" });
    }

    if (!receiverId) {
      return res.status(400).json({ error: "receiverID is required" });
    }

    if (!message && !attachment) {
      return res.status(400).json({ error: "send something" });
    }

    let existConversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!existConversation) {
      existConversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    if (!message) {
      const newMessage = await messageModel.create({
        convoId: existConversation._id,
        senderId,
        receiverId,
        attachment,
      });

      if (newMessage) {
        existConversation.messages.push(newMessage);
      }

      await existConversation.save();
      return res
        .status(200)
        .json({ messge: "message send successfully", convo: newMessage });
    }

    const newMessage = await messageModel.create({
      convoId: existConversation._id,
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      existConversation.messages.push(newMessage);
    }

    await existConversation.save();
    return res
      .status(200)
      .json({ messge: "message send successfully", convo: newMessage });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "internal server error at sender message api" });
  }
};

const receiveMessage = async (req, res) => {
  try {
    const senderId = req.params.id;
    const receiverId = req._id;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [receiverId, senderId] },
      })
      .populate("messages");
    // console.log(conversation?._id)

    if (!conversation) {
      return res.status(200).json([]);
    }

    // const isReadUpdate = await messageModel.updateMany({convoId:conversation?._id,receiverId:req._id},{$set:{isRead:true}})

    // console.log("isReadUpdate",isReadUpdate)

    return res.status(200).json(conversation.messages);
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "internal server error at receive message api" });
  }
};

const showImage = async (req, res) => {
  try {
    const filename = req.params.fileName;

    const getdirpath = path.join(process.cwd(), "./uploads");
    const getimagefullPath = `${getdirpath}/${filename}`;

    return res.sendFile(getimagefullPath);
  } catch (err) {
    // console.log(err);
    return res
      .status(500)
      .json({ error: "internal server error at showImage api" });
  }
};

module.exports = {
  allUserExceptLoggedUser,
  sendMessage,
  receiveMessage,
  showImage,
};

const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const jwt = require('jsonwebtoken');

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '2h',
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
};

const getAllConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find().sort({ updatedAt: -1 });
    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMessagesByConversation = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id }).sort("createdAt");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const sendMessageAsAdmin = async (req, res) => {
  try {
    const { conversationId, receiverId, text, type } = req.body;

    const newMessage = new Message({
      conversationId,
      senderId: "admin",
      receiverId,
      text,
      type,
    });

    await newMessage.save();

    res.status(200).json({ message: "Message sent", data: newMessage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ sessionId: req.params.sessionId });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
    adminLogin,
    getAllConversations,
    getMessagesByConversation,
    sendMessageAsAdmin,
    getUserDetails
}
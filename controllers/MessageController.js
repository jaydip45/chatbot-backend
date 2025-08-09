const Message = require('../models/Message');
const Conversation = require('../models/Conversation');
const User = require('../models/User');

const newMessage = async (req, res) => {
  try {
    const { senderId, text, type = 'text' } = req.body;

    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const receiverId = senderId.toString() === admin._id.toString()
      ? req.body.receiverId 
      : admin._id;         
    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const message = new Message({
      conversationId: conversation._id,
      senderId,
      receiverId,
      text,
      type
    });

    const savedMessage = await message.save();

    conversation.lastMessage = text;
    await conversation.save();

    return res.status(200).json(savedMessage);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id });
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  newMessage,
  getMessages
};

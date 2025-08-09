const Conversation = require('../models/Conversation');
const User = require('../models/User');

const newConversation = async (req, res) => {
  try {
    const { senderId } = req.body;

    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const receiverId = admin._id;

    let conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    if (conversation) {
      return res.status(200).json(conversation);
    }

    conversation = new Conversation({
      members: [senderId, receiverId],
      lastMessage: '' 
    });

    await conversation.save();
    return res.status(200).json(conversation);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getConversation = async (req, res) => {
  try {
    const { senderId } = req.body;

    const admin = await User.findOne({ isAdmin: true });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const receiverId = admin._id;

    const conversation = await Conversation.findOne({
      members: { $all: [senderId, receiverId] }
    });

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  newConversation,
  getConversation
};

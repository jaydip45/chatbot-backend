const Conversation = require('../models/Conversation');

const newConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const exist = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });

    if (exist) {
      return res.status(200).json('conversation already exists');
    }

    const newConversation = new Conversation({
      members: [senderId, receiverId]
    });

    await newConversation.save();
    return res.status(200).json('conversation saved successfully');
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    const conversation = await Conversation.findOne({ members: { $all: [receiverId, senderId] } });
    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  newConversation,
  getConversation
};

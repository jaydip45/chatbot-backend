const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

module.exports = function setupSocket(io) {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinConversation', (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
    });

    socket.on('sendMessage', async (data) => {
      // data: { conversationId, senderId, receiverId, text, type? }
      try {
        const message = new Message(data);
        const savedMessage = await message.save();

        await Conversation.findByIdAndUpdate(data.conversationId, {
          lastMessage: data.text,
          updatedAt: new Date(),
        });

        io.to(data.conversationId).emit('receiveMessage', savedMessage);
      } catch (err) {
        console.error('Error handling sendMessage:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

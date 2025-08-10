const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

module.exports = function setupSocket(io) {
  io.on("connection", (socket) => {
    socket.on("joinConversation", (conversationId) => {
      if (!conversationId) return;
      socket.join(conversationId);
    });

    socket.on("sendMessage", async (data) => {
      const { conversationId, senderId, text, type, senderType } = data || {};
      if (!conversationId || !senderId || !text) return;

      try {
        const message = new Message({
          conversationId,
          senderId,
          text,
          type: type || "text",
          senderType,
          createdAt: new Date(),
        });
        const savedMessage = await message.save();

        await Conversation.findByIdAndUpdate(conversationId, {
          lastMessage: text,
          updatedAt: new Date(),
        });

        io.to(conversationId).emit("receiveMessage", savedMessage);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });
  });
};

const express = require('express');
const {
    addUser,
    getUsers
} = require('../controllers/UserController');
const {
    newConversation,
    getConversation
} = require('../controllers/ConversationController');
const {
    newMessage,
    getMessages
} = require('../controllers/MessageController');
const {
    adminLogin,
    getAllConversations,
    getMessagesByConversation,
    sendMessageAsAdmin,
    getUserDetails
} = require('../controllers/adminController');

const adminAuth = require('../middleware/adminAuth');

const route = express.Router();

route.post('/add', addUser);
route.get('/users', getUsers);

route.post('/conversation/add', newConversation);
route.post('/conversation/get', getConversation);

route.post('/message/add', newMessage);
route.get('/message/get/:id', getMessages);
route.post('/login', adminLogin);
route.get('/admin/conversations', adminAuth, getAllConversations);
route.get('/admin/messages/:id', adminAuth, getMessagesByConversation);
route.post('/admin/messages/send', adminAuth, sendMessageAsAdmin);
route.get('/admin/user/:sessionId', adminAuth, getUserDetails);

module.exports = route;

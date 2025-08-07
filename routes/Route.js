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

module.exports = route;

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// const chatRoutes = require('./routes/chat.routes');
const connectDB = require('./utils/db');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Chatbot Backend Running');
});

module.exports = app;
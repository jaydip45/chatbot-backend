const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./utils/db');
const Route = require("./routes/Route.js") ;

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/", Route);

app.get('/', (req, res) => {
  res.send('Chatbot Backend Running');
});

module.exports = app;
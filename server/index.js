// index.js
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const gameRoutes = require('./routes/game');
const initSocket = require('./socket'); // Import socket initializer
require('dotenv').config();

const app = express();
const server = http.createServer(app);

connectDB();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/game', gameRoutes);

// Initialize Socket.io
const io = initSocket(server); // Pass the server instance

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

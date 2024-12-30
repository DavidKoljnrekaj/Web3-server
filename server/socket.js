// socket.js
const socketIo = require('socket.io');

const initSocket = (server) => {
    const io = socketIo(server, { cors: { origin: '*' } });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('joinGame', ({ gameId, username }) => {
            socket.join(gameId);
            io.to(gameId).emit('playerJoined', { username });
            socket.emit('message', `Welcome to the game, ${username}!`);
            console.log(`User ${username} joined game room ${gameId}`);
        });

        socket.on('moveMade', (gameId, move) => {
            io.to(gameId).emit('updateGame', move);
            console.log(`Move made in game ${gameId}:`, move);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

module.exports = initSocket;

const Game = require('../models/game');

async function createGame(creator) {
    const players = [creator]
    const game = new Game({
        players,
        scores: new Map(players.map(player => [player, 0])),
    });
    return await game.save();
}

// Closes a game by setting isOpen to false
async function closeGame(gameId) {
    return await Game.findOneAndUpdate({ gameId }, { isOpen: false }, { new: true });
}

// Retrieves all currently open games
async function getOpenGames() {
    return await Game.find({ isOpen: true });
}

// Deletes a game from the database
async function deleteGame(gameId) {
    return await Game.findOneAndDelete({ gameId });
}

async function joinGame(gameId, username) {
    const game = await Game.findOne({ gameId });
    if (!game) throw new Error('Game not found');

    // Check if player already joined
    if (!game.players.includes(username)) {
        game.players.push(username);
        game.scores.set(username, 0); // Initialize player's score
        await game.save();
    }

    return game;
}



module.exports = { createGame, closeGame, getOpenGames, deleteGame, joinGame };

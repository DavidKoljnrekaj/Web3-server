const express = require('express');
const Game = require('../models/game');
const { createGame, closeGame, getOpenGames, deleteGame, joinGame } = require('../service/game');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const { player } = req.body; // Expecting a single player ID
        if (!player) {
            return res.status(400).json({ message: 'Player ID is required' });
        }
        const game = await createGame(player); 
        res.status(201).json({ game });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.post('/close/:gameId', async (req, res) => {
    try {
        const { gameId } = req.params;
        const updatedGame = await closeGame(gameId);
        if (!updatedGame) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json({ message: 'Game closed', game: updatedGame });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to get all open games
router.get('/open', async (req, res) => {
    try {
        const openGames = await getOpenGames();
        res.status(200).json({ games: openGames });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to delete a game
router.delete('/:gameId', async (req, res) => {
    try {
        const { gameId } = req.params;
        const deletedGame = await deleteGame(gameId);
        if (!deletedGame) return res.status(404).json({ message: 'Game not found' });
        res.status(200).json({ message: 'Game deleted', game: deletedGame });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/join/:gameId', async (req, res) => {
    try {
        const { gameId } = req.params;
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const game = await joinGame(gameId, username);
        if (!game) {
            return res.status(404).json({ message: 'Game not found or closed' });
        }
        res.status(200).json({ message: `Player ${username} joined the game`, game });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});



module.exports = router;

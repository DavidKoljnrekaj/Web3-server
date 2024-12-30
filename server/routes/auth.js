const express = require('express');
const Player = require('../models/player');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const player = new Player({ username, password });
    try {
    await player.save();
    res.status(201).json({ message: 'User registered' });
    } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
        const { username, password } = req.body;
    
        try {
            // Find player by username
            const player = await Player.findOne({ username });         
            // Check if player exists and the password matches
            if (!player || player.password !== password) {
                return res.status(400).json({ message: 'Invalid username or password' });
            }      
            // If successful, return player data (or a success message)
            res.status(200).json({ message: 'Login successful', username: player.username });
        } catch (err) {
            console.error(err.message);
                res.status(500).json({ message: 'Server error' });
            }
});

module.exports = router;

const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Import UUID  
const Player = require('./player'); 

const gameSchema = new mongoose.Schema({
    gameId: {
         type: String, 
         unique: true, 
         default: uuidv4 
        }, // Automatically generated UUID
    players: [{ 
        type: String, // Store usernames instead of ObjectId references
        required: true,
        validate: {
            validator: async function (username) {
                const player = await Player.findOne({ username });
                return !!player; // Returns true if player exists
            },
        message: props => `Player with username ${props.value} does not exist!`
        }
    }],
    
    scores: { 
        type: Map, of: Number, 
        default: {} 
    },
    isFinished: { 
        type: Boolean, 
        default: false 
    },
    lastWinner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Player', 
        default: null 
    },
    createdAt: { 
        type: Date, default: Date.now 
    },
    isOpen: { 
        type: Boolean, 
        default: true 
    },
});

module.exports = mongoose.model('Game', gameSchema);

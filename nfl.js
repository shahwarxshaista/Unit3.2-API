const mongoose = require('mongoose');

var NFL = mongoose.model('nfl', {
    Player_Name: { type: String },
    Team: {type: String },
    Rushing_Yards: {type: Number },
    Touchdowns_thrown: {type: Number },
    Sacks: {type: Number },
    Field_goal: { type: Number },
    Catches: { type: Number }
    
});

module.exports = { NFL };
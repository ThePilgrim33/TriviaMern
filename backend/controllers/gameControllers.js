const user = require("../models/User");
require('dotenv').config();

module.exports.topPlayers = async (req, res) => {
    try {
        let users = await user.find({})
                    .select({ username: true, highScore: true, _id: true })
                    .sort({ highScore: -1 })
                    .limit(5);
        res.json(users);
} catch(err) {
    console.error(err)
    res.status(500).json("Server Error.");}
};

module.exports.updateScore = async (req, res) => {
    const { username, newScore } = req.body;
    try {
        const currentUser = await user.findOne({
            username: username
        });
        if (newScore > currentUser.highScore) {
        currentUser.highScore = newScore;
        await currentUser.save();
        }
        res.json(currentUser);
    } catch(err) {
    console.error(err);
    res.status(500).json("Server Error.")
    }
};
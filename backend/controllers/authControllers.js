const user = require("../models/User");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
    const { username, pwd, pwdConfirm, highScore } = req.body;
    try {
    let userLookup = await user.findOne({
        username: username
    });
    if (!userLookup) {
        if (!username) {
        res.json(`${username}, ${pwd}, ${pwdConfirm}, ${highScore}`);
        } else if (pwd != pwdConfirm) {
            return res.status(401).json(
                { error: "Please make sure password inputs match."
            });
        } else {
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(pwd, salt);
            const newUser = new user({
                username: username,
                password: passwordHash,
                highScore: highScore
            });
            await newUser.save();
            res.json({
                username: newUser.username,
                id: newUser._id,
                password: newUser.password
            });
        }
    } else {
        return res.status(401).json({ 
            error: "Username already registered." 
        });
    }
    } catch(err) {
        console.error(err);
        return res.status(500).json("Server Error.");
    }
}

module.exports.login = async (req, res) => {
    const { username, pwd } = req.body;
    try {
        let userLookup = await user.findOne({
            username: username
        });
        if (!userLookup) {
            return res.status(401).json({error: "Username does not exist."});
        } 
        let pwdMatch = await bcrypt.compare(pwd, userLookup.password);
        if (!pwdMatch) {
            return res.status(401).json({error: "Incorrect Password"});
        } 
        const payload = {
            id: userLookup._id,
            username: userLookup.username
        };
        jwt.sign(
            payload,
            process.env.TOKEN_SECRET,
            {
                expiresIn: 3700
            },
            (err, token) => {
                return res.json({
                    success: true,
                    token: "Bearer" + token});
            }
        );

    } catch(err) {
        res.status(500).json(err);
    }
};
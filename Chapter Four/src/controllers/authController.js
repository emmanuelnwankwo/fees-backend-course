const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { env } = require('../config/envConfig');
const User = require('../models/user');


async function login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const isPasswordValid = bcrypt.compare(password, user.hashPassword);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const secret = env.JWT_SECRET;
    const token = jwt.sign({ username, role: user.role }, secret, { expiresIn: '1h' });
    return res.status(200).json({
        data: { username, role: user.role },
        token
    });
}


async function registerUser(req, res) {
    const { username, password, role } = req.body;
    const userExist = await User.findOne({ username });
    if (userExist) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, hashPassword: hashedPassword, role });
    await user.save();
    return res.status(201).json({
        message: 'User created successfully'
    });
}

module.exports = {
    login,
    registerUser
}
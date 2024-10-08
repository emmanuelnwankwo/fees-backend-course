const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

const inMemoryUserStorage = [];


router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = inMemoryUserStorage.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
            message: 'Invalid credentials'
        });
    }
    
    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ username, role: user.role }, secret, { expiresIn: '1h' });
    res.status(200).json({
        token
    });
});

router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    const user = inMemoryUserStorage.find(user => user.username === username);
    if (user) {
        return res.status(409).json({
            message: 'User already exists'
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    inMemoryUserStorage.push({ username, password: hashedPassword, role });
    res.status(201).json({
        message: 'User created successfully'
    });
});


module.exports = router;
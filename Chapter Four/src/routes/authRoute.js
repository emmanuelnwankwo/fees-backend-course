const express = require('express');
const { authController } = require('../controllers/index');
const { authMiddleware } = require('../middlewares/index');

const router = express.Router();


const { login, registerUser } = authController;
const { onUserLogin, onUserRegisteration } = authMiddleware;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     description: Login to the application
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Emmanuel
 *               password:
 *                 type: string
 *                 example: Password123
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *
 */
router.post('/login', onUserLogin, login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register
 *     description: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: Emmanuel
 *               password:
 *                 type: string
 *                 example: Password123
 *               role:
 *                 type: string
 *                 example: admin
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Registration successful
 *       409:
 *         description: User already exists
 *
 */
router.post('/register', onUserRegisteration, registerUser);


module.exports = router;
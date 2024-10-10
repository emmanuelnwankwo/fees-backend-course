const { authValidation } = require('../validations/index');
const jwt = require('jsonwebtoken');
const { env } = require('../config/envConfig');

const authorize = (req, res, next) => {
    if (req.userRole === 'admin') {
        next();
    } else {
        return res.status(403).send({ error: 'Forbidden' });
    }
};

const authenticate = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') ?? null;
        const secret = env.JWT_SECRET;
        const decoded = jwt.verify(token, secret);
        req.userRole = decoded.role;
        next();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' });
    }
};

const onUserLogin = (req, res, next) => {
    try {
        const validated = authValidation.validateUserLogin(req.body);
        if (validated) {
            next();
        }
    } catch (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
};

const onUserRegisteration = (req, res, next) => {
    try {
        const validated = authValidation.validateUserRegistration(req.body);
        if (validated) {
            next();
        }
    } catch (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
};

module.exports = { authorize, onUserLogin, onUserRegisteration, authenticate };
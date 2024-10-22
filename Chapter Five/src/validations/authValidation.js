const Joi = require('joi');


function validateUserLogin(userObject) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(50).required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
    });

    const { error } = schema.validate({ ...userObject });
    if (error) {
        throw error;
    }
    return true;
}

function validateUserRegistration(userObject) {
    const schema = Joi.object({
        username: Joi.string().alphanum().min(3).max(50).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        role: Joi.string().regex(/^(user|admin)$/).required()
    });

    const { error } = schema.validate({ ...userObject });
    if (error) {
        throw error;
    }
    return true;
}

module.exports = {
    validateUserLogin,
    validateUserRegistration
};
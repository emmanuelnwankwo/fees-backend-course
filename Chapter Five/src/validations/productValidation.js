const Joi = require('joi');

function validateNewProduct(productObject) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30).required(),
        description: Joi.string().max(100).required(),
        status: Joi.string().regex(/^(available|sold)$/).required()
    });

    const { error } = schema.validate({ ...productObject });
    if (error) {
        throw error;
    }
    return true;
}

function validateProductUpdate(productObject) {
    const schema = Joi.object({
        name: Joi.string().min(1).max(30),
        description: Joi.string().max(100),
        status: Joi.string().regex(/^(available|sold)$/)
    });

    const { error } = schema.validate({ ...productObject });
    if (error) {
        throw error;
    }
    return true;
}

module.exports = {
    validateNewProduct,
    validateProductUpdate
};
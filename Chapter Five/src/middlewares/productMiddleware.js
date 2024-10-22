const { productValidation } = require('../validations/index');

const { validateNewProduct, validateProductUpdate } = productValidation;

function onAddProduct(req, res, next) {
    try {
        const validated = validateNewProduct(req.body);
        if (validated) {
            next();
        }
    } catch (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
}

function onUpdateProduct(req, res, next) {
    try {
        const validated = validateProductUpdate(req.body);
        if (validated) {
            next();
        }
    } catch (error) {
        return res.status(400).send({ error: error.details[0].message });
    }
}

module.exports = {
    onAddProduct,
    onUpdateProduct,
};
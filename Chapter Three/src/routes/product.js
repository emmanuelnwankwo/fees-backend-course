const express = require('express');

const router = express.Router();

const inMemoryStorage = [];

const authorize = (req, res, next) => {
    console.log(req.userRole)
    if (req.userRole === 'admin') {
        next();
    } else {
        res.status(403).send({ error: 'Forbidden' });
    }
};

router.get('/products', (req, res) => {

    if (inMemoryStorage.length === 0) {
        res.status(404).json({
            message: 'No products found'
        });
    } else {
        res.status(200).json({
            data: inMemoryStorage
        });
    }
});

router.post('/product', authorize, (req, res) => {
    const product = req.body;
    const isProductExist = inMemoryStorage.find(p => p.id === product.id);
    if (isProductExist) {
        res.status(409).json({
            message: 'Product already exists'
        });
    } else {
        inMemoryStorage.push(product);
        res.status(201).json({
            message: 'Product created successfully',
            data: product
        });
    }

});

router.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const product = inMemoryStorage.find(product => product.id === Number.parseInt(id));
    if (product) {
        res.status(200).json({
            data: product
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
});

router.put('/product/:id', authorize, (req, res) => {
    const id = req.params.id;
    console.log(id);
    const product = inMemoryStorage.find(product => product.id === Number.parseInt(id));
    if (product) {
        const updatedProduct = req.body;
        inMemoryStorage.splice(inMemoryStorage.indexOf(product), 1, updatedProduct);
        res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } else {
        // res.status(404).json({
        //     message: 'Product not found'
        // });

        inMemoryStorage.push(product);
        res.status(201).json({
            message: 'Product created successfully',
            data: product
        });
    }
});

router.patch('/product/:id', authorize, (req, res) => {
    const id = req.params.id;
    const product = inMemoryStorage.find(product => product.id === Number.parseInt(id));
    if (product) {
        const updatedProduct = req.body;
        inMemoryStorage.splice(inMemoryStorage.indexOf(product), 1, { ...product, ...updatedProduct });
        res.status(200).json({
            message: 'Product updated successfully',
            data: { ...product, ...updatedProduct }
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
});

router.delete('/product/:id', authorize, (req, res) => {
    const id = req.params.id;
    const product = inMemoryStorage.find(product => product.id === Number.parseInt(id));
    if (product) {
        inMemoryStorage.splice(inMemoryStorage.indexOf(product), 1);
        res.status(200).json({
            message: 'Product deleted successfully'
        });
    } else {
        res.status(404).json({
            message: 'Product not found'
        });
    }
});

module.exports = router;
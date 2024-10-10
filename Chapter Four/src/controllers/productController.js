const Product = require('../models/product');

async function getProducts(req, res) {
    const products = await Product.find();
    if (products.length === 0) {
        return res.status(404).json({
            message: 'No products found'
        });
    } else {
        return res.status(200).json({
            data: products
        });
    }
}

async function createProduct(req, res) {
    const productObject = req.body;
    const productExist = await Product.findOne({ name: productObject.name });
    if (productExist) {
        res.status(409).json({
            message: 'Product already exists'
        });
    } else {
        const product = await Product.create({ ...productObject });
        await product.save();
        return res.status(201).json({
            message: 'Product created successfully',
            data: product
        });
    }

}

async function getProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
        return res.status(200).json({
            data: product
        });
    } else {
        return res.status(404).json({
            message: 'Product not found'
        });
    }
}


async function updateProduct(req, res) {
    const id = req.params.id;
    const productObject = req.body;
    const product = await Product.findById(id);
    if (product) {
        const updatedProduct = { ...product, ...productObject };
        await Product.updateOne({ _id: id }, updatedProduct);
        return res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } else {
        const product = await Product.create({ ...productObject });
        await product.save();
        return res.status(201).json({
            message: 'Product created successfully',
            data: product
        });
    }
}

async function partialUpdateProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
        const productObject = req.body;
        const updatedProduct = { ...product, ...productObject };
        await Product.updateOne({ _id: id }, updatedProduct);
        return res.status(200).json({
            message: 'Product updated successfully',
            data: updatedProduct
        });
    } else {
        return res.status(404).json({
            message: 'Product not found'
        });
    }
}

async function deleteProduct(req, res) {
    const id = req.params.id;
    const product = await Product.findById(id);
    if (product) {
        await Product.deleteOne({ _id: id });
        return res.status(200).json({
            message: 'Product deleted successfully'
        });
    } else {
        return res.status(404).json({
            message: 'Product not found'
        });
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    partialUpdateProduct,
    deleteProduct
}
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        length: 50
    },
    description: {
        type: String,
        required: true,
        length: 500
    },
    status: {
        type: String,
        enum: ['available', 'sold'],
        default: 'available',
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
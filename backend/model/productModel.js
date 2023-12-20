const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    productName: String,
    productId: String,
    manufacturerName: String,
    productDescription: String,
    productQuantity: Number,
    productImage: String,
    category: String,
    productPrice: Number
}, 'products');

module.exports = Product;

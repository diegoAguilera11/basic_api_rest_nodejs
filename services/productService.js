const { Product } = require("../models");



const createProduct = async (productData) => {
    const product = new Product(productData);
    await product.save();
    return product;
};




module.exports = {
    createProduct
}
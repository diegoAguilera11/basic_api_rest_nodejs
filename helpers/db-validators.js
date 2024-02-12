const { Role, User, Category, Product } = require("../models");


const thisValidateRole = async (name = '') => {
    const existRole = await Role.findOne({ name });
    if (!existRole) {
        throw new Error(`The role ${role} is not registered to DB`);
    }
};

// Verify exists email
const verifyEmail = async (email) => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`This email already exists`);
    }
}

const existUserID = async (id) => {

    const existUser = await User.findById(id);
    if (!existUser) {
        throw new Error(`This ID: ${id} is not exists`);
    }
}

const existCategoryID = async (id) => {

    const existCategory = await Category.findById(id);
    if (!existCategory) {
        throw new Error(`This ID: ${id} is not exists`);
    }
}

const existProductID = async (id) => {

    const existProduct = await Product.findById(id);
    if (!existProduct) {
        throw new Error(`This ID: ${id} is not exists`);
    }
}

// Verify exists category
const verifyCategory = async (category) => {

    console.log(category);
    const existCategory = await Category.findOne({ category });
    if (!existCategory) {
        return false;
    }

    return true;
}

const allowedCollections = (collection, collections = []) => {
    
    const include = collections.includes(collection);

    if(!include) {
        throw new Error(`This collection ${collection} is not allowed`)
    }
    return true;
}

module.exports = {
    thisValidateRole,
    verifyEmail,
    existUserID,
    existCategoryID,
    existProductID,
    verifyCategory,
    allowedCollections
};
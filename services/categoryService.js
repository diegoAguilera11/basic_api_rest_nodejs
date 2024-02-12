const Category = require("../models/category");



const createCategory = async (categoryData) => {

    
    const category = new Category(categoryData);
    await category.save();
    return category;
};


module.exports = {
    createCategory
}
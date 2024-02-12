const { response, request } = require('express');

const Category = require('../models/category');

const categoryService = require('../services/categoryService');

const { verifyCategory } = require('../helpers/db-validators');
const { obtainUidJWT } = require('../helpers/obtain-user-jwt');


const getCategories = async (req = request, res = response) => {

    const { limit, init = 0 } = req.query;
    const query = { status: true };

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip(Number(init))
            .limit(Number(limit)),
    ]);

    res.json({
        total,
        categories
    });

}

const getCategory = async (req = request, res = response) => {

    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');

    res.json({
        msg: 'desde getCategory',
        category
    });
}

const postCategories = async (req = request, res = response) => {

    const name = req.body.name.toUpperCase();

    const categoryDB = await verifyCategory(name);

    if (categoryDB) {
        return res.status(400).json({
            msg: 'This category already exists',
        });
    }

    console.log(categoryDB);

    // Obtain JWT
    const authHeader = req.headers['authorization'];

    // Separate the token from the "Bearer" prefix
    token = authHeader && authHeader.split(' ')[1];
    const uid = obtainUidJWT(token);

    // Generate new category
    const data = {
        name,
        user: uid,
    }

    const category = await categoryService.createCategory(data);

    res.status(201).json(category);
}

const putCategories = async (req = request, res = response) => {

    try {
        const { id } = req.params;
        const { status, user, ...data } = req.body;

        data.name = data.name.toUpperCase();

        // Obtain JWT
        const authHeader = req.headers['authorization'];

        // Separate the token from the "Bearer" prefix
        token = authHeader && authHeader.split(' ')[1];
        const uid = obtainUidJWT(token);
        data.user = uid;

        const category = await Category.findByIdAndUpdate(id, data, { new: true });

        res.status(201).json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact with the administrator',
        });
    }
}


const deleteCategories = async (req = request, res = response) => {

    try {
        const { id } = req.params;

        // Delete category
        const deletedCategory = await Category.findByIdAndUpdate(id, { status: false }, { new: true });
        res.status(200).json({
            msg: 'Category deleted',
            deletedCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contact with the administrator',
        });
    }
}



module.exports = {
    getCategories,
    getCategory,
    postCategories,
    putCategories,
    deleteCategories
}
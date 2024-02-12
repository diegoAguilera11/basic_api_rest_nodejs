const { request, response } = require("express");
const { ObjectId } = require("mongoose").Types;

const User = require("../models/user");
const { Category, Product } = require("../models");

const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users'
];


const search = async (req = request, res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `The allowed collections are: ${allowedCollections}`
        });
    }

    switch (collection) {
        case 'categories':
            searchCategories(term, res);
            break;
        case 'products':
            searchProducts(term, res);
            break;
        case 'users':
            searchUsers(term, res);
            break;

        default:
            res.status(500).json({
                msg: 'Search not found'
            });
    }
}

const searchUsers = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term); // return true if exist

    if (isMongoID) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [users, count] = await Promise.all([
        User.find({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }]
        }),
        User.countDocuments({
            $or: [{ name: regex }, { email: regex }],
            $and: [{ status: true }]
        })
    ]);

    return res.json({
        total: count,
        results: users,
    });
}

const searchCategories = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term); // return true if exist

    if (isMongoID) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [categories, count] = await Promise.all([
        Category.find({
            $or: [{ name: regex, status: true }]
        }),
        Category.countDocuments({
            $or: [{ name: regex, status: true }]
        })
    ]);

    return res.json({
        total: count,
        results: categories,
    });
}

const searchProducts = async (term = '', res = response) => {

    const isMongoID = ObjectId.isValid(term); // return true if exist

    if (isMongoID) {
        const product = await Product.findById(term);
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');

    const [products, count] = await Promise.all([
        Product.find({
            $or: [{ name: regex, status: true }],
        }),
        Product.countDocuments({
            $or: [{ name: regex, status: true }],
        })
    ]);

    return res.json({
        total: count,
        results: products,
    });
}


module.exports = {
    search,
};
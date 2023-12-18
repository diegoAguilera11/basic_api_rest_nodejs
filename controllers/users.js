const { response, request } = require('express');
const User = require('../models/user');
const userService = require('../services/userService');
const bcryptjs = require('bcryptjs');
const { validateFields } = require('../middlewares/validate-fields');

const getUsers = async (req = request, res = response) => {

    const { limit, init = 0 } = req.query;
    const query = { status: true };

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(init))
            .limit(Number(limit)),
    ]);


    res.json({
        total,
        users
    });
};

const postUsers = async (req, res = response) => {

    const { name, email, password, role } = req.body;

    // Password encrypt and save to db
    const user = await userService.createUser({ name, email, password, role });

    res.json({
        user
    });
};

const putUsers = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...other } = req.body;

    if (password) {
        // Update Password
        other.password = await userService.updatePasswordUser(password);
    }

    const updatedUser = await User.findByIdAndUpdate(id, other);

    res.json({
        updatedUser
    });
}

const patchUsers = (req, res = response) => {
    res.json({
        'message': 'Patch API! Controller'
    });
}

const deleteUsers = async (req, res = response) => {

    const { id } = req.params;

    // Physics delete user
    // const user = await User.findByIdAndDelete(id);

    const user = await User.findByIdAndUpdate(id, {status: false});

    res.json({
        user
    });
}

module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}
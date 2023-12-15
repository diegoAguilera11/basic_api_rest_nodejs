const { response, request } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { validateFields } = require('../middlewares/validate-fields');
const getUsers = (req = request, res = response) => {

    const query = req.query;

    res.json({
        'message': 'Get API! Controller',
        query
    });
};

const postUsers = async (req, res = response) => {

    const {name, email, password, role} = req.body;
    const user = new User({name, email, password, role});

    // Password encrypt
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);

    // Save to db
    await user.save();


    res.json({
        user
    });
};

const putUsers = (req, res = response) => {

    const id = req.params.userID;

    res.json({
        'message': 'Put API! Controller',
        id
    });
}

const patchUsers = (req, res = response) => {
    res.json({
        'message': 'Patch API! Controller'
    });
}

const deleteUsers = (req, res = response) => {
    res.json({
        'message': 'Delete API! Controller'
    });
}




module.exports = {
    getUsers,
    postUsers,
    putUsers,
    patchUsers,
    deleteUsers
}
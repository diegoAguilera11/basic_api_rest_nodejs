const { response, request } = require('express');

const getUsers = (req = request, res = response) => {

    const query = req.query;

    res.json({
        'message': 'Get API! Controller',
        query
    });
};

const postUsers = (req, res = response) => {

    const { name, email } = req.body;

    res.json({
        'message': 'Post API! Controller',
        name,
        email
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
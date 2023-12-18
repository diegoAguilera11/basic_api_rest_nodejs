const User = require('../models/user');
const bcryptjs = require('bcryptjs');


const createUser = async (userData) => {
    const user = new User(userData);
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(user.password, salt);
    await user.save();
    return user;
};

const updatePasswordUser = async (password) => {

    const salt = bcryptjs.genSaltSync();
    const newPassword = bcryptjs.hashSync(password, salt);

    return newPassword;
}

module.exports = { 
    createUser,
    updatePasswordUser
};
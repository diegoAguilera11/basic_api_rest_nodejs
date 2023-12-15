const Role = require("../models/role");
const User = require("../models/user");


const thisValidateRole = async (name = '') => {
    const existRole = await Role.findOne({ name });
    if (!existRole) {
        throw new Error(`The role ${role} is not registered to DB`);
    };
};

// Verify exists email
const verifyEmail = async (email) => {
    const existEmail = await User.findOne({ email });
    if (existEmail) {
        throw new Error(`This email already exists`);
    };
}

module.exports = {
    thisValidateRole,
    verifyEmail,
};
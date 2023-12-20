const { response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const generateJWT = require("../helpers/generate-jwt");

const login = async (req, res = response) => {

    const { email, password } = req.body;
    try {

        // Validate exists email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                msg: 'Invalidate credentials.'
            });
        }

        // Validate status user
        if (user.status === false) {
            return res.status(400).json({
                msg: 'Invalidate credentials - status'
            });
        }

        // Verify password
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Invalidate credentials -password'
            });
        }

        // Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        });
    } catch (error) {
        return res.status(500).json({
            msg: 'Oops, error is comming.'
        })
    }
};


module.exports = {
    login,
};
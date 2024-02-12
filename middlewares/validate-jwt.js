const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req, res = response, next) => {
    const authHeader= req.headers['authorization'];

    // Separate the token from the "Bearer" prefix
    token = authHeader && authHeader.split(' ')[1];

    if(!token){
        return res.status(401).json({
            msg: 'Not in token'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);


        // Read to user == uid
        const user = await User.findById(uid);

        if(!user){
            return res.status(401).json({
                msg: 'Not in token'
            });
        }


        //Verify this state is true for uid
        if(!user.status){
            return res.status(401).json({
                msg: 'Not in token'
            });
        }


        req.user = user;

        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'invalid token',
        });
    }
}


module.exports = {
    validateJWT
};
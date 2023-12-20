const { response } = require("express")


const isAdmin = (req, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'An error occurred while validating the user'
        })
    }

    const { name, role } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: 'Not is ADMIN ROLE'
        });
    }

    next();
}

const thisRole = (...roles) => {

    return (req, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Not in token'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: 'This service require to role'
            });
        }

        next();
    }
}


module.exports = {
    isAdmin,
    thisRole
}
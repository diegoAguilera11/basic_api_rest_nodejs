const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '3h'
        }, (error, token) => {
            if(error){
                console.log(error);
                reject('Error to generate token');
            } else {
                resolve(token);
            }
        });
    });
};

module.exports = generateJWT;


const validateJWT  = require('../middlewares/validate-jwt');
const validateFields =  require('../middlewares/validate-fields');
const validateRoles = require('../middlewares/validate-roles');
const validateArchiveUpload = require('../middlewares/validate-archive');


module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles,
    ...validateArchiveUpload
};
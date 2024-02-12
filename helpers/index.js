

const dbValidators = require('./db-validators');
const generarJWT = require('./generate-jwt');
const uploadArchive = require('./upload-archive');
const obtainUserJWT = require('./obtain-user-jwt');

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...uploadArchive,
    ...obtainUserJWT
}
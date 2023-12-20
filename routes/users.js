const { Router } = require('express');
const { check } = require('express-validator');

const {validateFields, 
       validateJWT, 
       isAdmin, 
       thisRole} = require('../middlewares/index');

const { verifyEmail, thisValidateRole, existUserID } = require('../helpers/db-validators');

const { getUsers,
    postUsers,
    putUsers,
    deleteUsers } = require('../controllers/users');

const router = Router();


router.get('/', getUsers);

router.post('/', [
    check('name', 'The  name is required').not().isEmpty(),
    check('email', 'This email is invalid').isEmail(),
    check('email', 'This email already exists').custom(verifyEmail),
    check('password', 'This password must be less than 6 characters').isLength({ min: 6 }),
    check('role').custom(thisValidateRole),
    validateFields
], postUsers);

router.put('/:id', [
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existUserID),
    check('role').custom(thisValidateRole),
    validateFields
], putUsers);

router.delete('/:id', [
    validateJWT,
    isAdmin,
    thisRole('ADMIN_ROLE','SALES_ROLE'),
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existUserID),
    validateFields
], deleteUsers);

module.exports = router;
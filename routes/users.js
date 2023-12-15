const { Router } = require('express');
const { getUsers, postUsers, putUsers, patchUsers, deleteUsers } = require('../controllers/users');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { verifyEmail, thisValidateRole } = require('../helpers/db-validators');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'The  name is required').not().isEmpty(),
    check('email', 'This email is invalid').isEmail(),
    check('email', 'This email already exists').custom(verifyEmail),
    check('password', 'This password must be less than 6 characters').isLength({ min: 6 }),
    // check('role', 'This role is invalid').isIn('ADMIN_ROLE', 'USER_ROLE'),
    check('role').custom(thisValidateRole),
    validateFields
], postUsers);

router.put('/:userID', putUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);






module.exports = router;
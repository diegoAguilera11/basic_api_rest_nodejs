const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields, validateJWT, isAdmin } = require('../middlewares');
const { getCategories, getCategory, deleteCategories, putCategories, postCategories } = require('../controllers/categories');
const { existCategoryID } = require('../helpers/db-validators');

const router = Router();

// Obtain categories - public
router.get('/', getCategories);

// Obtain one category - public
router.get('/:id', [
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existCategoryID),
    validateFields
], getCategory);

// Create category - private - user with valid token
router.post('/', [
    validateJWT,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], postCategories);

// Update category - private - user with valid token
router.put('/:id', [
    validateJWT,
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existCategoryID),
    validateFields
], putCategories);

// Delete category - Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existCategoryID),
    validateFields
], deleteCategories);



module.exports = router;
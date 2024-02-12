const { Router } = require("express");
const { check } = require("express-validator");

const { getProducts, postProducts, putProducts, deleteProduct } = require("../controllers/products");

const { validateJWT, validateFields, isAdmin } = require("../middlewares");
const { existProductID } = require("../helpers/db-validators");




const router = Router();


//Obtain all products
router.get('/', getProducts);

// Create product - private - user with valid token
router.post('/', [
    validateJWT,
    isAdmin,
    check('name', 'The name is required').not().isEmpty(),
    validateFields
], postProducts);

// Update category - private - user with valid token
router.put('/:id', [
    validateJWT,
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existProductID),
    validateFields
], putProducts);

// Delete category - Admin
router.delete('/:id', [
    validateJWT,
    isAdmin,
    check('id', 'This not valid ID').isMongoId(),
    check('id').custom(existProductID),
    validateFields
], deleteProduct);


module.exports = router;
const { Router } = require("express");
const { check } = require("express-validator");

const { loadArchive, showImage, updateImageCloudinary } = require("../controllers/uploads");

const { validateFields, validateArchiveUpload } = require("../middlewares");
const { allowedCollections } = require("../helpers/db-validators");

const router = Router();

// Upload archive to db
router.post('/', validateArchiveUpload, loadArchive);

router.put('/:collection/:id', [
    check('id', 'This not valid ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateArchiveUpload,
    validateFields
], updateImageCloudinary);

router.get('/:collection/:id', [
    check('id', 'This not valid ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products'])),
    validateFields
], showImage);

module.exports = router;
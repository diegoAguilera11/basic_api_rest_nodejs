const { Router } = require("express");
const { search } = require("../controllers/search");



const router = new Router();


router.get('/:collection/:term', search);


module.exports = router;
const express = require('express');
const productControllerGet = require('../controller/productController');
const router = express.Router();
router.get("/product", productControllerGet);
module.exports = router;
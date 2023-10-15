const express = require('express');
const deleteController = require('../controller/deleteController');
const router = express.Router();

router.delete('/delete/:id', deleteController);

module.exports = router
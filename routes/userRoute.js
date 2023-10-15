const express = require('express');
const logout = require('../controller/userLogout');
const router = express.Router();

router.post("/:userId", logout);

module.exports = router;
const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const router = express.Router({ mergeParams: true });
router.get('', userCtrl.index);
module.exports = router;
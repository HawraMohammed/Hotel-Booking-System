const express = require('express');
const pagesCtrl = require('../controllers/pagesCtrl');

const router = express.Router();

router.get('/', pagesCtrl.home);
router.get('/about', pagesCtrl.about)

module.exports = router;

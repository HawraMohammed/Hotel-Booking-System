const express = require('express');
const router = express.Router({ mergeParams: true });
const isAdmin = require('../middleware/isAdmin');
const adminCtrl = require('../controllers/adminCtrl');
router.get('/hotels', adminCtrl.index);
router.get('/hotels/new', adminCtrl.newHotel);
router.post('/hotels', adminCtrl.createHotel);
module.exports = router;
const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const router = express.Router({ mergeParams: true });
router.get('/reservations', userCtrl.index);
router.get('/reservations/:reservationid', userCtrl.showReservation);
router.put('/reservations/:reservationid', userCtrl.cancelReservation);
module.exports = router;
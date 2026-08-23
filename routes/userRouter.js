const express = require('express');
const userCtrl = require('../controllers/userCtrl');
const isSignedIn = require('../middleware/isSignedIn');
const router = express.Router({ mergeParams: true });

router.get('', userCtrl.index);
router.get('/:hotelid', userCtrl.showHotel);
router.get('/:hotelid/reservations/new', isSignedIn, userCtrl.newReservation);
router.post('/:hotelid/reservations', isSignedIn, userCtrl.createReservation);
module.exports = router;
const express = require('express');
const hotelCtrl = require('../controllers/hotelCtrl');
const isSignedIn = require('../middleware/isSignedIn');
const router = express.Router({ mergeParams: true });

router.get('', hotelCtrl.index);
router.get('/:hotelid', hotelCtrl.showHotel);
router.get('/:hotelid/reservations/new', isSignedIn, hotelCtrl.newReservation);
router.post('/:hotelid/reservations', isSignedIn, hotelCtrl.createReservation);
module.exports = router;
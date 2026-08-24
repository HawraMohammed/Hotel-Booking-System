const User = require("../models/user");
const Hotel = require("../models/hotel");
const Reservation = require("../models/reservation");
const session = require("express-session");
const index = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.session.user._id }).populate('hotel').sort({ checkIn: -1 });;

        for (const reservation of reservations) {
            if (new Date() >= reservation.checkOut && reservation.status === 'confirmed') {
                reservation.status = 'completed';
                await reservation.save();
            }
        }
        res.render('user/reservations/index.ejs', { reservations });
    }
    catch (err) { console.log(err.message) }
}
const showReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.reservationid).populate('hotel');
        res.render('user/reservations/show.ejs', { reservation });
    }
    catch (err) { console.log(err.message) }
}
const cancelReservation = async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.reservationid, { status: 'cancelled' });
        res.redirect(`/users/${req.session.user._id}/reservations`);
    }
    catch (err) { console.log(err.message) }
}
module.exports = { index, showReservation, cancelReservation }
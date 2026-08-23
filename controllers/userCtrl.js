const User = require("../models/user");
const Hotel = require("../models/hotel");
const Reservation = require("../models/reservation");
const session = require("express-session");
const index = async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.session.user._id }).populate('hotel');
        res.render('user/reservations/index.ejs', { reservations });
    }
    catch (err) { console.log(err.message) }
}
module.exports = { index }
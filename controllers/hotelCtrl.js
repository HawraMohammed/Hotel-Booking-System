const Hotel = require("../models/hotel");
const Reservation = require("../models/reservation");
const index = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('user/hotels/index.ejs', { hotels });
    }
    catch (err) { console.log(err.message); }
}
const showHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        res.render('user/hotels/show.ejs', { hotel });
    }
    catch (err) { console.log(err.message) }
}
const newReservation = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        res.render('user/reservations/new.ejs', { hotel });
    }
    catch (err) { console.log(err.message) }
}
const createReservation = async (req, res) => {
    try {

        const hotel = await Hotel.findById(req.params.hotelid);
        const roomType = hotel.rooms.find(
            room => room.type === req.body.roomType
        );
        const reservations = await Reservation.find({
            hotel: req.params.hotelid, roomType: req.body.roomType,
            checkIn: { $lt: new Date(req.body.checkOut) },
            checkOut: { $gt: new Date(req.body.checkIn) }
        });
        const availableRooms = roomType.quantity - reservations.length;
        if (availableRooms <= 0)
            return res.send("No available room");

        const numOfNights =
            (new Date(req.body.checkOut) - new Date(req.body.checkIn))
            / (1000 * 60 * 60 * 24);

        const price = roomType.pricePerNight * numOfNights; // we don't trust the browser
        await Reservation.create({
            user: req.session.user._id,
            hotel: req.params.hotelid,
            roomType: req.body.roomType,
            numOfGuests: req.body.numOfGuests,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            numOfNights: numOfNights,
            price: price,
            paymentMethod: req.body.paymentMethod
        });
        res.redirect('/hotels');
    }
    catch (err) { console.log(err.message) }
}
module.exports = { index, showHotel, newReservation, createReservation };
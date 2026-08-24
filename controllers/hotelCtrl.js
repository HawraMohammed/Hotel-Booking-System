const User = require("../models/user");
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
        res.render('user/hotels/show.ejs', { hotel, comments: hotel.comments });
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
        const findExistingRes = await Reservation.findOne({
            user: req.session.user._id,
            checkIn: { $lt: new Date(req.body.checkOut) },
            checkOut: { $gt: new Date(req.body.checkIn) }
        });
        if (findExistingRes) return res.send('There is an exisiting reservation within this period');

        const hotel = await Hotel.findById(req.params.hotelid);
        const roomType = hotel.rooms.find(
            room => room.type === req.body.roomType
        );
        const reservations = await Reservation.find({
            hotel: req.params.hotelid, roomType: req.body.roomType,
            checkIn: { $lt: new Date(req.body.checkOut) },
            checkOut: { $gt: new Date(req.body.checkIn) },
            status: 'confirmed'
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
        res.redirect(`/users/${req.session.user._id}/reservations`);
    }
    catch (err) { console.log(err.message) }
}
const createComment = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        hotel.comments.push({
            title: req.body.title,
            description: req.body.description,
            stars: req.body.rating,
            user: req.session.user._id
        })
        await hotel.save();
        res.redirect(`/hotels/${req.params.hotelid}`);

    }
    catch (err) { console.log(err.message) }
}
const updateComment = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        const comment = hotel.comments.id(req.params.commentid);

        comment.title = req.body.title;
        comment.description = req.body.description;
        comment.stars = req.body.rating;

        await hotel.save();
        res.redirect(`/hotels/${req.params.hotelid}`);

    }
    catch (err) { console.log(err.message) }
}
const deleteComment = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        hotel.comments.pull(req.params.commentid);
        await hotel.save();
        res.redirect(`/hotels/${req.params.hotelid}`);

    }
    catch (err) { console.log(err.message) }
}
module.exports = { index, showHotel, newReservation, createReservation, createComment, updateComment, deleteComment };
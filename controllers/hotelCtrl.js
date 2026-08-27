const Hotel = require("../models/hotel");
const Reservation = require("../models/reservation");
const index = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('user/hotels/index.ejs', { hotels });
    }
    catch (err) { console.log(err.message); }
}

const handleSearch = async (req, res) => {
    try {
        let hotels;

        if (req.body.action === 'search') {
            if (req.body.filter === "location") {
                hotels = await Hotel.find({
                    location: {
                        $regex: req.body.search,
                        $options: 'i'
                    }
                });
            }
            else {
                hotels = await Hotel.find({
                    name: {
                        $regex: req.body.search,
                        $options: 'i'
                    }
                });
            }
        }
        else if (req.body.action === 'filter') {
            if (req.body.filter === "priceAsc") {
                hotels = await Hotel.aggregate([
                    {
                        $addFields: {
                            lowestPrice: { $min: "$rooms.pricePerNight" }
                        }
                    },
                    {
                        $sort: {
                            lowestPrice: 1
                        }
                    }
                ]);
            }
            else if (req.body.filter === "priceDesc") {
                hotels = await Hotel.aggregate([
                    {
                        $addFields: {
                            highestPrice: { $max: "$rooms.pricePerNight" }
                        }
                    },
                    {
                        $sort: {
                            highestPrice: -1
                        }
                    }
                ]);
            }

            else if (req.body.filter === "ratings") {
                hotels = hotels = await Hotel.aggregate([
                    {
                        $addFields: {
                            ratings: { $avg: "$comments.stars" }
                        }
                    },
                    {
                        $sort: {
                            ratings: -1
                        }
                    }
                ]);
            }
            else {
                hotels = await Hotel.find();
            }

        }
        res.json(hotels);
    }
    catch (err) { console.log(err.message); }
}
const showHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid).populate("comments.user");
        res.render('user/hotels/show.ejs', { hotel, comments: hotel.comments, googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
    }
    catch (err) { console.log(err.message) }
}
const newReservation = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        res.render('user/reservations/new.ejs', { hotel, error: req.query.error });
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
        if (findExistingRes) return res.redirect(
            `/hotels/${req.params.hotelid}/reservations/new?error=There exist a reservation within this period `
        );

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
            return res.redirect(
                `/hotels/${req.params.hotelid}/reservations/new?error=No available rooms within this period`
            );

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
        const hotel = await Hotel.findById(req.params.hotelid);;
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
module.exports = { index, handleSearch, showHotel, newReservation, createReservation, createComment, updateComment, deleteComment };
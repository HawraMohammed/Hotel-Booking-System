const Hotel = require('../models/hotel');
const index = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('admin/index.ejs', { hotels });
    }
    catch (err) { console.log(err.message) }
}
const newHotel = async (req, res) => {
    try {
        res.render('admin/new.ejs');
    }
    catch (err) { console.log(err.message) }
}
const createHotel = async (req, res) => {
    try {
        const roomTypes = Array.isArray(req.body.roomType)
            ? req.body.roomType
            : [req.body.roomType];

        const capacities = Array.isArray(req.body.capacity)
            ? req.body.capacity
            : [req.body.capacity];

        const prices = Array.isArray(req.body.pricePerNight)
            ? req.body.pricePerNight
            : [req.body.pricePerNight];

        const quantities = Array.isArray(req.body.quantity)
            ? req.body.quantity
            : [req.body.quantity];

        const rooms = roomTypes.map((type, i) => ({
            type,
            capacity: capacities[i],
            pricePerNight: prices[i],
            quantity: quantities[i],
            availableRooms: quantities[i]
        }));

        const servicesArray = Array.isArray(req.body.services)
            ? req.body.services
            : [req.body.services];
        await Hotel.create({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            map: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            rooms,
            picture: req.body.picture,
            services: servicesArray,
        });

        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
const editHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        res.render('admin/edit.ejs', { hotel });
    }
    catch (err) { console.log(err.message) }
}
const updateHotel = async (req, res) => {
    try {
        const roomTypes = Array.isArray(req.body.roomType)
            ? req.body.roomType
            : [req.body.roomType];

        const capacities = Array.isArray(req.body.capacity)
            ? req.body.capacity
            : [req.body.capacity];

        const prices = Array.isArray(req.body.pricePerNight)
            ? req.body.pricePerNight
            : [req.body.pricePerNight];

        const quantities = Array.isArray(req.body.quantity)
            ? req.body.quantity
            : [req.body.quantity];

        const rooms = roomTypes.map((type, i) => ({
            type,
            capacity: capacities[i],
            pricePerNight: prices[i],
            quantity: quantities[i],
            availableRooms: quantities[i]
        }));

        const servicesArray = Array.isArray(req.body.services)
            ? req.body.services
            : [req.body.services];
        await Hotel.findByIdAndUpdate(req.params.hotelid, {
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            map: {
                latitude: req.body.latitude,
                longitude: req.body.longitude
            },
            rooms,
            picture: req.body.picture,
            services: servicesArray,
        });

        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
const showHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        res.render('admin/show.ejs', { hotel });
    }
    catch (err) { console.log(err.message) }
}
const deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.hotelid);
        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
module.exports = { index, newHotel, createHotel, editHotel, updateHotel, showHotel, deleteHotel };
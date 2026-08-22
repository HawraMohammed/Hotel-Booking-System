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
            rooms,
            picture: req.body.pictures,
            services: servicesArray,
        });

        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
module.exports = { index, newHotel, createHotel };
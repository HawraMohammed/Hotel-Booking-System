const Hotel = require('../models/hotel');
const { cloudinary, uploadToCloudinary } = require("../config/cloudinary");

const index = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('admin/index.ejs', { hotels });
    }
    catch (err) { console.log(err.message) }
}
const newHotel = async (req, res) => {
    try {
        res.render('admin/new.ejs', { googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
    }
    catch (err) { console.log(err.message) }
}
const createHotel = async (req, res) => {
    try {

        const pictures = [];
        if (req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file);

                pictures.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }

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
            pictures: pictures,
            services: servicesArray,
        });

        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
const editHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        res.render('admin/edit.ejs', { hotel, googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
    }
    catch (err) { console.log(err.message) }
}
const updateHotel = async (req, res) => {
    try {
        console.log("FILES:", req.files);
        const hotel = await Hotel.findById(req.params.hotelid);
        if (req.body.deletePictures) {
            let deletePictures = req.body.deletePictures;
            if (!Array.isArray(deletePictures)) {
                deletePictures = [deletePictures];
            }
            for (const publicId of deletePictures) {
                await cloudinary.uploader.destroy(publicId);
                hotel.pictures = hotel.pictures.filter(
                    picture => picture.public_id !== publicId
                );
            }

        }
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {

                const result = await uploadToCloudinary(file);

                hotel.pictures.push({
                    url: result.secure_url,
                    public_id: result.public_id
                });
            }
        }
        await hotel.save();
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
            services: servicesArray,
        });

        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
const showHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid).populate('comments.user');

        res.render('admin/show.ejs', { hotel, comments: hotel.comments, googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY });
    }
    catch (err) { console.log(err.message) }
}
const deleteHotel = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelid);
        if (hotel.pictures.length > 0) {
            for (const picture of hotel.pictures) {
                await cloudinary.uploader.destroy(picture.public_id);
            }
        }
        await Hotel.findByIdAndDelete(req.params.hotelid);
        res.redirect('/admin/hotels');
    }
    catch (err) { console.log(err.message) }
}
module.exports = { index, newHotel, createHotel, editHotel, updateHotel, showHotel, deleteHotel };
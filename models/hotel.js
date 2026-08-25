const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    stars: { type: Number, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});
const roomSchema = new mongoose.Schema({
    type: { type: String, enum: ['Single', 'Double', 'Suite'], required: true },
    capacity: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    map: {
        latitude: Number,
        longitude: Number
    },
    rooms: [roomSchema],
    picture: { type: String, required: true },
    services: { type: [String], required: true },
    comments: [commentSchema]
});

const Hotel = mongoose.model('Hotel', hotelSchema);

// export it
module.exports = Hotel;
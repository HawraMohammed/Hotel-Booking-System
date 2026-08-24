const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    roomType: { type: String, required: true },
    numOfGuests: { type: Number, required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    numOfNights: { type: Number, required: true },
    price: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Benefit Pay', 'Cash', 'Apple Pay', 'Credit Card'], required: true },
    status: {
        type: String,
        enum: ['confiremed', 'cancelled', 'completed'],
        required: true,
        default: 'confiremed'
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// export it
module.exports = Reservation;
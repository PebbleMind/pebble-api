const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    user_id: {
        type: String,
    },
    appointment_id: {
        type: String,
    },
    date: {
        type: Date,
    },
    doctor_id: {
        type: String,
    },
    price: {
        type: String,
    },
    type: {
        type: String,
    },
    payment: {
        type: Boolean,
    }
})

module.exports = mongoose.model('User', dataSchema); 
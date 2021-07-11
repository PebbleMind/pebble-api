const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    time: {
        type: String
    },
    doctor_id: {
        type: String
    },
    user_id: {
        type: String
    },
    price: {
        type: Number
    },
    type: {
        type: String
    },
    payment: {
        type: Boolean
    }
});

module.exports = mongoose.model('Appointments', dataSchema); 

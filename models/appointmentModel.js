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
    },
    meeting_id: {
        type: Number
    },
    passcode: {
        type: String
    },
    join_url: {
        type: String
    }
});

module.exports = mongoose.model('Appointments', dataSchema); 

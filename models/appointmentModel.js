const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    doctor_id: {
        type: String
    },
    appointmentDetails: {
        date: {
            type: Date
        },
        time: {
            type: String
        },
        type: {
            type: String
        },
        mode: {
            type: String
        }
    },
    patientDetails:{
        name:{
            type: String
        },
        age:{
            type: Number
        },
        gender:{
            type: String
        }
    },
    price: {
        type: Number
    },
    payment: {
        type: Boolean
    },
    meeting_id: {
        type: Number,
        default: null
    },
    password: {
        type: String,
        default: null
    },
    join_url: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Appointments', dataSchema); 

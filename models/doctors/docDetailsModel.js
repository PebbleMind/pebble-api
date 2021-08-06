const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    first_name: {
        type: String, 
        required: true
    },
    last_name: {
        type: String, 
        required: true
    },
    doctor_id: {
        type: String,
    },
    specialization: {
        type: String,
        required: true
    },
    credentials: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
    },
    languages: {
        type: String,
    },
    bio:{
        type: String,
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    image:String,
    ratings: {
        type: Number,
    },

});

module.exports = mongoose.model('Doc Details', dataSchema);

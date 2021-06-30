const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    //default
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

    //work
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

    //contact and personal
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
    
    //additonal
    ratings: {
        type: Number,
    },

});

const Doctor = mongoose.model('Doctor', dataSchema); 
module.exports = Doctor; 

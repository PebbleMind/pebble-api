const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
    },
    zoom_id:{
        type: String,
    },
    basic:{
        first_name: {
            type: String, 
            required: true
        },
        last_name: {
            type: String, 
            required: true
        },
        dob: {
            type: Date,
        },
    },
    contact:{
        email: {
            type: String,
        },
        phone: {
            type: Number,
        },
    },
    work:{
        education: {
            type: String,
            required: true
        },
        specialization: {
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
    },
    tags:[{
        type: String,
    }],
    ratings: {
        type: Number,
    },
    image:String,
});

module.exports = mongoose.model('Doc Details', dataSchema);

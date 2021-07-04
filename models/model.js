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
    dob:{
        type: Date,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    verified: {
        type: Boolean,
        deafult: false
    } 
});

module.exports = mongoose.model('Login', dataSchema); 

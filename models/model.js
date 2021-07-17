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
    verified: {
        type: Boolean,
        deafult: false
    },
    uniqueString: {
        type: String, 
    } 
});

module.exports = mongoose.model('Login', dataSchema); 

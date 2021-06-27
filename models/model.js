const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    name: {
        type:String, 
        required:true
    },
    email: {
        type:String, 
        required:true
    } 
});

const Login = mongoose.model('Login', dataSchema); 
module.exports = Login; 

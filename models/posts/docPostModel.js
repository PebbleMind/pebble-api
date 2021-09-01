const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    doctorInfo:{
        doctor_id: {
            type: String,
        },
        name:{
            type: String,
        },
        education: {
            type: String,
        },
        image: {
            type: String,
        }
    },
    image:{
        type: String,
        default: ''
    }, 
    postInfo:{
        filename:{
            type: String,
            default: ''
        },
        description:{
            type: String,
        },
        date: {
            type: Date,
            default: new Date()
        },
    },
    postLikes: {
        type: Number,
        default: 0
    },
    postComments:[{ 
        user_id:{
            type: String,
        },
        comment: {
            type: String,
        },
        date: {
            type:String, 
            default: new Date()
        } 
    }]
});

module.exports = mongoose.model('Doctor Posts', dataSchema);
const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    doctor_id: {
        type: String,
    },
    image: String,
    postInfo:{
        description:{
            type: String,
        },
        date: {
            type: Date,
        },
    },
    postLikes: {
        type: Number,
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
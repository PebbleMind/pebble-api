const userData = require('../models/appointmentModel');

const getAllData = (req, res, next) => {
    userData.find({user_id: req.params.user_id}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    userData.findOne({_id:req.params.id, user_id: req.params.user_id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

module.exports = {
    getAllData,
    getOneData
};
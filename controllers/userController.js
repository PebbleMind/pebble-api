const userData = require('../models/userModel');

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

const newData = (req, res) => {
    const newData = new userData({
        user_id: req.params.user_id,
        appointment_id: req.body.appointment_id,
        date: req.body.date,
        doctor_id: req.body.doctor_id,
        price: req.body.price,
        type: req.body.type,
        payment: req.body.payment,
    })

    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
}

const updateData = (req, res, next) => {
    userData.findOne({user_id: req.params.user_id, _id:req.params.id}, (err, data) =>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        if(req.body.payment){
            data.payment = req.body.payment
        }
        data.save()
        return res.json(data)
    })
}

const deleteAllData = (req, res, next) => {
    userData.deleteMany({user_id: req.params.user_id}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {    
    userData.deleteOne({_id: req.params.id, user_id: req.params.user_id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data doesn't exist."});
        }
        else return res.json({message: "Data deleted."});
    })
};

module.exports = {
    getAllData,
    getOneData,
    newData,
    updateData,
    deleteAllData,
    deleteOneData
};
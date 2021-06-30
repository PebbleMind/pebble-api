const availData = require('../models/availModel');

const newData = (req, res) => {
    const newData = new availData({
        doctor_id: req.body.doctor_id,
        availability: req.body.availability,
            sun: req.body.sun,
                enabled: req.body.enabled,
                timing: req.body.timing,
            mon: req.body.mon,
                enabled: req.body.enabled,
                timing: req.body.timing,
            tue: req.body.tue,
                enabled: req.body.enabled,
                timing: req.body.timing,
            wed: req.body.wed,
                enabled: req.body.enabled,
                timing: req.body.timing,
            thu: req.body.thu,
                enabled: req.body.enabled,
                timing: req.body.timing,
            fri: req.body.fri,
                enabled: req.body.enabled,
                timing: req.body.timing,
            sat: req.body.sat,
                enabled: req.body.enabled,
                timing: req.body.timing,
    })

    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

const getAllData = (req, res, next) => {
    availData.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id;

    availData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const deleteAllData = (req, res, next) => {
    availData.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id;
    
    availData.deleteOne({_id: id}, (err, data) => {
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
    deleteAllData,
    deleteOneData
};

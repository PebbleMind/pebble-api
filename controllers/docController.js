const docData = require('../models/docModel')

const getAllData = (req, res, next) => {
    docData.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id;

    docData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const newData = (req, res) => {
    const newData = new docData({
        first_name: req.body.first_name,
        last_name: req.body.last_name, 
        doctor_id: req.body.doctor_id, 
        specialization: req.body.specialization, 
        credentials: req.body.credentials, 
        experience: req.body.experience, 
        languages: req.body.languages, 
        bio: req.body.bio, 
        dob: req.body.dob, 
        email: req.body.email, 
        phone: req.body.phone, 
        ratings: req.body.ratings, 
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

const deleteAllData = (req, res, next) => {
    docData.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id;
    
    docData.deleteOne({_id: id}, (err, data) => {
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

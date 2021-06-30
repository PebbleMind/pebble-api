const docData = require('../models/docModel');
const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadImg = multer({storage: storage}).single("image");

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
        image: req.file.path, 
        ratings: req.body.ratings, 
    })

    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

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
    uploadImg,
    newData,
    deleteAllData,
    deleteOneData
};

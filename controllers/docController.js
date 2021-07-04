const docData = require('../models/docModel');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/doctors");
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadImg = multer({storage: storage}).single("image");

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
        image: req.file.path, 
        ratings: req.body.ratings, 
    })

    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

const updateData = (req, res, next) => {
    docData.findOne({_id: req.params.id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data not found"});
        }

        if(req.body.first_name){
            data.first_name = req.body.first_name
        }
        if(req.body.last_name){
            data.last_name = req.body.last_name
        }
        if(req.body.doctor_id){
            data.doctor_id = req.body.doctor_id
        }
        if(req.body.specialization){
            data.specialization = req.body.specialization
        }
        if(req.body.credentials){
            data.credentials = req.body.credentials
        }
        if(req.body.experience){
            data.experience = req.body.experience
        }
        if(req.body.languages){
            data.languages = req.body.languages
        }
        if(req.body.bio){
            data.bio = req.body.bio
        }
        if(req.body.dob){
            data.dob = req.body.dob
        }
        if(req.body.email){
            data.email = req.body.email
        }
        if(req.body.phone){
            data.phone = req.body.phone
        }
        if(req.file){
            data.image = req.file.path
        }
        if(req.body.ratings){
            data.ratings = req.body.ratings
        }
        
        data.save()
        return res.json(data)
    })
}

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
    updateData,
    deleteAllData,
    deleteOneData
};

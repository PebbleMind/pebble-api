const Login = require('../models/model')
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/users");
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const uploadImg = multer({storage: storage}).single("image");

const getAllData = (req, res, next) => {
    Login.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id;

    Login.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const newData = (req, res) => {
    const newData = new Login({
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        image: req.file.path,
        verified: req.body.verified,
    })

    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

const updateData = (req, res, next) => {
    Login.findOne({_id: req.params.id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        if (req.body.first_name){
            data.first_name = req.body.first_name
        }
        if (req.body.last_name){
            data.last_name = req.body.last_name
        }
        if (req.body.dob){
            data.dob = req.body.dob
        }
        if (req.body.email){
            data.email = req.body.email
        }
        if (req.body.password){
            data.password = req.body.password
        }
        if (req.file){
            data.image = req.file.path
        }
        if (req.body.verified){
            data.verified = req.body.verified
        }

        data.save()
        return res.json(data)
    })
}

const deleteAllData = (req, res, next) => {
    Login.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id;
    
    Login.deleteOne({_id: id}, (err, data) => {
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

const userData = require('../../models/users/userDetailsModel');
const multer = require('multer');

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
    userData.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id;

    userData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const newData = (req, res) => {
    userData.findOne({
        email: req.body.email
    }, (err, data) => {
        if (err) {
            return res.json({
                Error: err
            });
        } else if(data) {
            return res.json({
                message: "Email already exists"
            });
        } else {
            var newData
            if(req.file){
                newData = new userData({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dob: req.body.dob, 
                    gender: req.body.gender,
                    email: req.body.email, 
                    phone: req.body.phone,
                    image: req.file.path, 
                })
            }
            else{
                newData = new userData({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    dob: req.body.dob, 
                    gender: req.body.gender,
                    email: req.body.email, 
                    phone: req.body.phone,
                })
            }
            newData.save((err, data) => {
                if(err) return res.json({Error: err});
                return res.json(data);
            })
        }
    })
};

const updateData = (req, res, next) => {
    userData.findOne({_id: req.params.id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        if(req.body.first_name){
            data.first_name = req.body.first_name
        }
        if(req.body.last_name){
            data.last_name = req.body.last_name
        }
        if(req.body.dob){
            data.dob = req.body.dob
        }
        if(req.body.gender){
            data.dob = req.body.gender
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
        data.save()
        return res.json(data)
    })
}

const deleteAllData = (req, res, next) => {
    userData.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id;
    
    userData.deleteOne({_id: id}, (err, data) => {
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

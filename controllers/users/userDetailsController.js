const userData = require('../../models/users/userDetailsModel');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.status(401).send({message: "Authorization required"})
    jwt.verify(token, process.env.API_USER_SECRET_KEY, (err, user) => {
        if (err){
            console.log(err)
            if(err.name == 'TokenExpiredError'){
                return res.status(400).send({message: "Token expired"})
            }else{
                return res.status(403).send({message: "Access denied"})
            }
        }else{
            next()
        }
    })
};

const generateFileName = (name) => {
    var fileName = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length;

    const searchTerm = '.'
    const imageType = name.substring(name.lastIndexOf(searchTerm)+1)

    for ( var i = 0; i < 20; i++ ) {
      fileName += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return fileName + '.' + imageType 
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/users");
      },
    filename: function (req, file, cb) {
        cb(null, generateFileName(file.originalname));
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
};

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
    authenticateToken,
    getAllData,
    getOneData,
    uploadImg,
    newData,
    updateData,
    deleteAllData,
    deleteOneData
};

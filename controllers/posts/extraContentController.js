const extraData = require('../../models/posts/extraContentModel');
const multer = require('multer')

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
        cb(null, "./uploads/posts");
      },
    filename: function (req, file, cb) {
        cb(null, generateFileName(file.originalname));
    },
});

const uploadImg = multer({storage: storage}).any();

const getAllData = (req, res, next) => {
    extraData.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id

    extraData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const newData = (req, res) => {
    const newData = new extraData({
        type: req.body.type,
        url: req.body.url,
        thumbnail: req.files[0].path,
        postedOn: new Date()
    })
    
    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

const updateData = (req, res, next) => {
    let id = req.params.id

    extraData.findOne({_id: id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
    })
};

const deleteAllData = (req, res, next) => {
    extraData.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id
    
    extraData.deleteOne({_id: id}, (err, data) => {
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

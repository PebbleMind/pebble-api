const postData = require('../../models/posts/docPostModel');
const multer = require('multer')

const generateFileName = () => {
    var fileName = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length;
    for ( var i = 0; i < 20; i++ ) {
      fileName += characters.charAt(Math.floor(Math.random() * 
      charactersLength));
    }
    return fileName
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads/posts");
      },
    filename: function (req, file, cb) {
        cb(null, generateFileName());
    },
});

const uploadImg = multer({storage: storage}).single("image");

const getAllData = (req, res, next) => {
    postData.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id

    postData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const newData = (req, res) => {
    var newData
    if(req.file){
        newData = new postData({
            doctor_id: req.body.doctor_id, 
            postInfo: req.body.postInfo,
                description: req.body.description,
                date: req.body.date,
                image: req.file.path,
        })
    }
    else{
        newData = new postData({
            doctor_id: req.body.doctor_id, 
            postInfo: req.body.postInfo,
                description: req.body.description,
                date: req.body.date,
        })
    }
    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

const updateData = (req, res, next) => {
    let id = req.params.id
    let user_id = req.body.user_id
    let comment = req.body.comment
    const tempData = {
        user_id: user_id,
        comment: comment,
        date: new Date()
    }

    postData.findOne({_id: id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        data.postComments.push(tempData)
        data.save(err => {
            if (err) { 
            return res.json({message: "Comment failed to add.", error:err});
            }
            return res.json(data);
        })
    })
}

const deleteAllData = (req, res, next) => {
    postData.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id
    
    postData.deleteOne({_id: id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data doesn't exist."});
        }
        else return res.json({message: "Data deleted."});
    })
};

const deleteAllComment = (req, res, next) => {
    let id = req.params.id

    postData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else{
            data.postComments = []
            data.save()
            return res.json({message: "Complete delete successful"});
        }
    })

};

const deleteOneComment = (req, res, next) => {
    let id = req.params.id
    let comment_id = req.params.c_id

    postData.findOne({_id: id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else{
            function checkComment(comment){
                return comment._id != comment_id
            }
            var filteredComments = data.postComments.filter(checkComment)
            data.postComments = filteredComments
            data.save()
            return res.json({message: "Data deleted."});
        }
    })
}

module.exports = {
    getAllData,
    getOneData,
    uploadImg,
    newData,
    updateData,
    deleteAllData,
    deleteOneData,
    deleteAllComment,
    deleteOneComment
};

const appData = require('../../models/appointmentModel');

const getAllData = (req, res, next) => {
    appData.find({doctor_id: req.params.doctor_id}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    appData.findOne({_id: req.params.id, doctor_id: req.params.doctor_id}, (err, data)=>{
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        else return res.json(data); 
    })
};

const newData = (req, res) => {
    const newData = new appData({
        date: req.body.date,
        time: req.body.time,
        doctor_id: req.body.doctor_id, 
        user_id: req.body.user_id,
        price: req.body.price,
        type: req.body.type,
        payment: req.body.payment,
        meeting_id: req.body.meeting_id,
        password: req.body.password,
        join_url: req.body.join_url,
    })

    newData.save((err, data) => {
        if(err) return res.json({Error: err});
        return res.json(data);
    })
};

const updateData = (req, res, next) => {
    appData.findOne({_id: req.params.id, doctor_id: req.params.doctor_id}, (err, data) => {
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
    appData.deleteMany({}, err => {
        if(err) {
          return res.json({message: "Complete delete failed"});
        }
        return res.json({message: "Complete delete successful"});
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id;
    
    appData.deleteOne({_id: id}, (err, data) => {
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

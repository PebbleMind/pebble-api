const adminLogin = require('../../models/admin/adminLoginModel')
//const bcrypt = require('bcrypt')

const getAllData = (req, res, next) => {
    if(req.headers.auth == '12345'){
        adminLogin.find({}, (err, data) => {
            if (err) {
                return res.json({
                    Error: err
                });
            }
            return res.json(data);
        })
    }else{
        return res.json({message: "Authorization required"});
    }
};

const newData = (req, res) => {
    //const orgPassword = req.body.password

    adminLogin.findOne({
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
            // bcrypt.hash(orgPassword, 10, function(err, hashedPassword) {
            //     if(err) return res.json({
            //         Error: err
            //     });
            //     const newData = new adminLogin({
            //         email: req.body.email,
            //         password: hashedPassword
            //     })
            //     newData.save((err, data) => {
            //         if (err) return res.json({
            //             Error: err
            //         });
            //         return res.json(data);
            //     })
            // });

            if(req.headers.auth == '12345'){
                const newData = new adminLogin({
                    email: req.body.email,
                    password: req.body.password
                })
                newData.save((err, data) => {
                    if (err) return res.json({
                        Error: err
                    });
                    return res.json(data);
                })
            }else{
                return res.json({message: "Authorization required"});
            }
        } 
    })
};

const updateData = (req, res, next) => {

    adminLogin.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err || !data) {
            return res.json({
                message: "Data not found"
            });
        }
        if (req.body.email) {
            data.email = req.body.email
        }
        if (req.body.password) {
            bcrypt.hash(req.body.password, 10, function(err, hashedPassword) {
                if(err) return res.json({
                    Error: err
                });
                data.password = hashedPassword
                console.log(hashedPassword)
            });
        }
        data.save()
        return res.json(data)
    })
}


const deleteOneData = (req, res, next) => {
    let id = req.params.id;

    adminLogin.deleteOne({
        _id: id
    }, (err, data) => {
        if (err || !data) {
            return res.json({
                message: "Data doesn't exist."
            });
        } else return res.json({
            message: "Data deleted."
        });
    })
};

module.exports = {
    getAllData,
    newData,
    updateData,
    deleteOneData
};
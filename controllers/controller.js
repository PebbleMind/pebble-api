const Login = require('../models/model')
const multer = require("multer");
const nodemailer = require("nodemailer")
const mailgun = require("mailgun-js")

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

const randString = () => {
    const len = 8
    let randStr = ''
    for (let i=0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch
    }
    return randStr
}

const sendConfirmationMail = (email, uniqueString) => {
    const mailjet = require ('node-mailjet')
    .connect('46dda229ba3eedf81dfa8f6620d2b9b7', '943f6bb84ff84788fc59320120e7da13')
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "pebblecontact.team@gmail.com",
            "Name": "Pebble Mind"
          },
          "To": [
            {
              "Email": email,
              "Name": "Praveen"
            }
          ],
          "Subject": "Email Confirmation",
          "HTMLPart": `<h3>Account Verification</h3>
                        <br><br>
                        <p>Hello, 
                        <br/> Click <a href='https://pebble-test.herokuapp.com/login/verfiy/${uniqueString}'>here</a> to verify you email address.
                        <br/> Thanks, <br/> Team Pebble.`
        }
      ]
    })
    request
      .then((result) => {
        console.log(result.body)
      })
      .catch((err) => {
        console.log(err.statusCode)
      })
    // var Transport = nodemailer.createTransport({
    //     service: "Gmail",
    //     auth: {
    //         user: "pebblecontact.team@gmail.com",
    //         pass: "vsk@pebble"
    //     }
    // });

    // var mailOptions;
    // let sender = "Pebble"
    // mailOptions = {
    //     from: sender,
    //     to: email,
    //     subject: "Email Confirmation - Pebble Account",
    //     html: `Hello, <br/> Click <a href=https://pebble-test.herokuapp.com/login/verify/${uniqueString}> here </a> to verify your email. <br/>Thanks,<br/>Team Pebble.`
    // };

    // Transport.sendMail(mailOptions, function(error, response){
    //     if(error){
    //         console.log(error)
    //     } else{
    //         console.log("Success: Message sent");
    //     }
    // });
    // const api_key = 'key-d092ba6d34a7c13b5b87823e3e09216b'
    // const DOMAIN = 'https://api.mailgun.net/v3/sandbox64b0499977074ebab31ffa756df31aa9.mailgun.org';
    // const mg = mailgun({apiKey: api_key, domain: DOMAIN});
    // const data = {
	//     from: 'Pebble <pebblecontact.team@gmail.com>',
	//     to: email,
	//     subject: 'Pebble - Email Confirmation',
	//     text: 'Account Verification',
    //     html: `<html><body>Click <a href="https://pebble.test.herokuapp.com/login/verfiy/${uniqueString}">here</a> to verify you email address</body></html>`
    // };
    // mg.messages().send(data, function (error, body) {
	//     console.log(body);
    // });
}

const newData = (req, res) => {
    const uniqueString = randString()
    const email = req.body.email

    const newData = new Login({
        first_name: req.body.first_name, 
        last_name: req.body.last_name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        verified: req.body.verified,
        uniqueString: uniqueString,
    })

    sendConfirmationMail(email, uniqueString)
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
        // if (req.file){
        //     data.image = req.file.path
        // }
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

const verifyUser = (req, res, next) => {
    Login.findOne({uniqueString: req.params.uniqueString}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Data not found"});
        }
        data.verified = true

        data.save()
        return res.json(data)
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
    verifyUser
};

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

const uploadImg = multer({
    storage: storage
}).single("image");

const getAllData = (req, res, next) => {
    Login.find({}, (err, data) => {
        if (err) {
            return res.json({
                Error: err
            });
        }
        return res.json(data);
    })
};

const getOneData = (req, res, next) => {
    let id = req.params.id;

    Login.findOne({
        _id: id
    }, (err, data) => {
        if (err || !data) {
            return res.json({
                message: "Data not found"
            });
        } else return res.json(data);
    })
};

const randString = () => {
    const len = 8
    let randStr = ''
    for (let i = 0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1)
        randStr += ch
    }
    return randStr
}

const sendConfirmationMail = (email, uniqueString, firstName) => {
    const mailjet = require('node-mailjet')
        .connect('46dda229ba3eedf81dfa8f6620d2b9b7', '943f6bb84ff84788fc59320120e7da13')
    const request = mailjet
        .post("send", {
            'version': 'v3.1'
        })
        .request({
            "Messages": [{
                "From": {
                    "Email": "pebblecontact.team@gmail.com",
                    "Name": "Pebble Mind"
                },
                "To": [{
                    "Email": email,
                    "Name": "Praveen"
                }],
                "Subject": "Email Confirmation",
                "HTMLPart": `<html>
                                <head>
                                    <meta charset="UTF-8">
                                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                </head>
                                    <div
                                        style="display: none; font-size: 1px; line-height: 1px; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
                                        &nbsp;
                                    </div>
                                    <table style="background: #F7F8FA; border: 0; border-radius: 0; width: 100%;" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="tw-body" style="padding: 15px 15px 0;" align="center">
                                                    <table style="background: #F7F8FA; border: 0; border-radius: 0;" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td class="" style="width: 600px;" align="center">
                                                                    <table
                                                                        style="background: #ffffff; border: 0px; border-radius: 4px; width: 99.6672%; overflow: hidden;"
                                                                        cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="" style="padding: 0px; width: 100%;" align="center">
                                                                                    <table dir="ltr" style="border: 0; width: 100%;" cellspacing="0"
                                                                                        cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="tw-card-body"
                                                                                                    style="padding: 20px 35px; text-align: left; color: #6f6f6f; font-family: sans-serif; border-top: 0;">
                                                                                                    <img src="https://img.freepik.com/free-vector/woman-meditating-peaceful-nature-illustration-yoga-healthy-lifestyle-concept-flat-cartoon-design_115968-34.jpg?size=626&ext=jpg" width="200px" height="auto">
                                                                                                    <h1 class="tw-h1"
                                                                                                        style="font-size: 24px; font-weight: bold; mso-line-height-rule: exactly; line-height: 32px; margin: 0 0 20px; color: #474747;">
                                                                                                        Hello ${firstName},</h1>
                                                                                                    <p class=""
                                                                                                        style="margin: 20px 0; font-size: 16px; mso-line-height-rule: exactly; line-height: 24px;">
                                                                                                        <span style="font-weight: 400;">Thank you for
                                                                                                            joining <strong>Pebble</strong>,</span><br /><br /><span
                                                                                                            style="font-weight: 400;">To complete the
                                                                                                            registration process, please confirm your
                                                                                                            email address to activate your
                                                                                                            account</span>.</p>
                                                                                                    <table style="border: 0; width: 100%;"
                                                                                                        cellspacing="0" cellpadding="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td>
                                                                                                                    <table class="button mobile-w-full"
                                                                                                                        style="border: 0px; border-radius: 7px; margin: 0px auto; width: 525px; background-color: #008bcb; height: 50px;"
                                                                                                                        cellspacing="0" cellpadding="0"
                                                                                                                        align="center">
                                                                                                                        <tbody>
                                                                                                                            <tr>
                                                                                                                                <td class="button__td "
                                                                                                                                    style="border-radius: 7px; text-align: center; width: 523px;margin: 0 auto">
                                                                                                                                    <a class="button__a"
                                                                                                                                        style="border-radius: 4px; color: #ffffff; display: block; font-family: sans-serif; font-size: 18px; font-weight: bold; mso-height-rule: exactly; line-height: 1.1; padding: 14px 18px; text-decoration: none; text-transform: none; border: 0;"
                                                                                                                                        href="http://pebble-test.herokuapp.com/login/verify/${uniqueString}"
                                                                                                                                        target="_blank"
                                                                                                                                        rel="noopener">Confirm
                                                                                                                                        email</a>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        </tbody>
                                                                                                                    </table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                    <div class=""
                                                                                                        style="border-top: 0; font-size: 1px; mso-line-height-rule: exactly; line-height: 1px; max-height: 0; margin: 20px 0; overflow: hidden;">
                                                                                                        ​</div>
                                                                                                    <p class=""
                                                                                                        style="margin: 20px 0; font-size: 16px; mso-line-height-rule: exactly; line-height: 24px;">
                                                                                                        Contact our support team <i><b>@pebblecontact.team@gmail.com</b></i> if you have any
                                                                                                        questions or concerns.</p>
                                                                                                    <p class="tw-signoff"
                                                                                                        style="margin: 45px 0 5px; font-size: 16px; mso-line-height-rule: exactly; line-height: 24px;">
                                                                                                        Thanks, <br />Team Pebble</p>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <div class=""
                                                                        style="border-top: 0; font-size: 1px; mso-line-height-rule: exactly; line-height: 1px; max-height: 0; margin: 8px 0 0 0; overflow: hidden;">
                                                                        ​</div>
                                                                    <table
                                                                        style="background: #FFFFFF; border: 0; border-radius: 4px; width: 100%; overflow: hidden;"
                                                                        cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class="" style="padding: 0;" align="center">
                                                                                    <table dir="ltr" style="border: 0; width: 100%;" cellspacing="0"
                                                                                        cellpadding="0">
                                                                                        <tbody>
                                                                                            <tr>
                                                                                                <td class="tw-card-body"
                                                                                                    style="padding: 20px 35px; text-align: left; color: #6f6f6f; font-family: sans-serif; border-top: 0;">
                                                                                                    <table dir="ltr" style="border: 0; width: 100%;"
                                                                                                        cellspacing="0" cellpadding="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td class=""
                                                                                                                    style="padding: 0 0 0 10px; text-align: left; color: #6f6f6f; font-family: sans-serif; border-left: 2px solid #316FEA;">
                                                                                                                    <p class=""
                                                                                                                        style="margin: 0; font-size: 16px; mso-line-height-rule: exactly; line-height: 24px;">
                                                                                                                        &ldquo;There is hope, even when your brain tells you there isn’t.<span
                                                                                                                            style="font-weight: 400;">.</span>&rdquo;
                                                                                                                    </p>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                    <div class=""
                                                                                                        style="border-top: 0; font-size: 1px; mso-line-height-rule: exactly; line-height: 1px; max-height: 0; margin: 15px 0 0 0; overflow: hidden;">
                                                                                                        ​</div>
                                                                                                    <table dir="ltr" style="border: 0; width: 100%;"
                                                                                                        cellspacing="0" cellpadding="0">
                                                                                                        <tbody>
                                                                                                            <tr>
                                                                                                                <td class="" style="width: 10%;"
                                                                                                                    align="center" valign="top">
                                                                                                                    <table dir="ltr"
                                                                                                                        style="border: 0; width: 100%;"
                                                                                                                        cellspacing="0" cellpadding="0">
                                                                                                                        <tbody>
                                                                                                                            <tr>
                                                                                                                                <td class=""
                                                                                                                                    style="padding: 0 15px 0 0; text-align: left;">
                                                                                                                                    <img class="  "
                                                                                                                                        style="border: 0px; height: 53px; vertical-align: middle; border-radius: 9999px;"
                                                                                                                                        src="https://image.evoke.org/-/media/Images/Evoke/Contributors/JohnGreen/JohnGreenCropped.ashx?rev=e2d3348fcfb44581b41e5ece51e0a9bf&hash=393318B0973C079027F644335C0B49EB"
                                                                                                                                        width="53" />
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        </tbody>
                                                                                                                    </table>
                                                                                                                </td>
                                                                                                                <td class="" style="width: 100.837%;"
                                                                                                                    align="center" valign="middle">
                                                                                                                    <table dir="ltr"
                                                                                                                        style="border: 0; width: 100%;"
                                                                                                                        cellspacing="0" cellpadding="0">
                                                                                                                        <tbody>
                                                                                                                            <tr>
                                                                                                                                <td class=""
                                                                                                                                    style="padding: 0; text-align: left; color: #6f6f6f; font-family: sans-serif;">
                                                                                                                                    <p class=""
                                                                                                                                        style="margin: 0; color: #474747; font-size: 13px; mso-line-height-rule: exactly; line-height: 20px;">
                                                                                                                                        <span
                                                                                                                                            style="font-weight: bold;">-
                                                                                                                                            John Green</span>
                                                                                                                                    </p>
                                                                                                                                    <p class=""
                                                                                                                                        style="margin: 0; color: #6f6f6f; font-size: 13px; mso-line-height-rule: exactly; line-height: 20px;">
                                                                                                                                        <span
                                                                                                                                            style="font-weight: 400;">Author&nbsp;<br /></span>
                                                                                                                                    </p>
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        </tbody>
                                                                                                                    </table>
                                                                                                                </td>
                                                                                                            </tr>
                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </td>
                                                                                            </tr>
                                                                                        </tbody>
                                                                                    </table>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <table dir="ltr" style="border: 0; width: 100%;" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td class=""
                                                                                    style="padding: 25px 0; text-align: center; color: #9a9a9a; font-family: sans-serif; font-size: 11px; mso-line-height-rule: exactly; line-height: 20px;">                                                      
                                                                                    <p class="" style="margin: 5px 0 0;">2021 &copy; Pebble LTD, All
                                                                                        rights reserved.</p>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                            </html>`

            }]
        })
    request
        .then((result) => {
            console.log(result.body)
        })
        .catch((err) => {
            console.log(err.statusCode)
        })
}

const newData = (req, res) => {
    const uniqueString = randString()
    const email = req.body.email
    const firstName = req.body.first_name

    const newData = new Login({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        email: req.body.email,
        password: req.body.password,
        verified: req.body.verified,
        uniqueString: uniqueString,
    })

    sendConfirmationMail(email, uniqueString, firstName)
    newData.save((err, data) => {
        if (err) return res.json({
            Error: err
        });
        return res.json(data);
    })
};

const updateData = (req, res, next) => {
    Login.findOne({
        _id: req.params.id
    }, (err, data) => {
        if (err || !data) {
            return res.json({
                message: "Data not found"
            });
        }
        if (req.body.first_name) {
            data.first_name = req.body.first_name
        }
        if (req.body.last_name) {
            data.last_name = req.body.last_name
        }
        if (req.body.dob) {
            data.dob = req.body.dob
        }
        if (req.body.email) {
            data.email = req.body.email
        }
        if (req.body.password) {
            data.password = req.body.password
        }
        // if (req.file){
        //     data.image = req.file.path
        // }
        if (req.body.verified) {
            data.verified = req.body.verified
        }

        data.save()
        return res.json(data)
    })
}

const deleteAllData = (req, res, next) => {
    Login.deleteMany({}, err => {
        if (err) {
            return res.json({
                message: "Complete delete failed"
            });
        }
        return res.json({
            message: "Complete delete successful"
        });
    })
};

const deleteOneData = (req, res, next) => {
    let id = req.params.id;

    Login.deleteOne({
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

const verifyUser = (req, res, next) => {
    Login.findOne({
        uniqueString: req.params.uniqueString
    }, (err, data) => {
        if (err || !data) {
            return res.json({
                message: "Data not found"
            });
        }
        data.verified = true

        data.save()
        return res.sendFile(process.cwd() + '/emailConfirmation.html')
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
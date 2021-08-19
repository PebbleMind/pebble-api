const express = require('express'); 

//user
const userLoginController = require('../controllers/users/userLoginController');
const userAppController = require('../controllers/users/userAppController');
const userDetailsController = require('../controllers/users/userDetailsController');
const userMoodController = require('../controllers/users/userMoodController');

//doctor
const docLoginController = require('../controllers/doctors/docLoginController');
const docDetailsController = require('../controllers/doctors/docDetailsController');
const docAvailController = require('../controllers/doctors/docAvailController');
const docAppController = require('../controllers/doctors/docAppController');

//posts
const docPostController = require('../controllers/posts/docPostController');

const router  = express.Router();

//user - login
router.get('/users/login', userLoginController.getAllData);
router.get('/users/login/:id', userLoginController.getOneData);
router.post('/users/login', userLoginController.newData); 
router.patch('/users/login/:id', userLoginController.updateData);
router.delete('/users/login', userLoginController.deleteAllData);
router.delete('/users/login/:id', userLoginController.deleteOneData);

//user - account verification
router.get('/users/verify/:uniqueString', userLoginController.verifyUser);

//user - details
router.get('/users', userDetailsController.getAllData);
router.get('/users/:id', userDetailsController.getOneData);
router.post('/users', userDetailsController.uploadImg, userDetailsController.newData); 
router.patch('/users/:id', userDetailsController.uploadImg, userDetailsController.updateData); 
router.delete('/users', userDetailsController.deleteAllData);
router.delete('/users/:id', userDetailsController.deleteOneData);

//user - appointments
router.get('/users/:user_id/appointments', userAppController.getAllData);
router.get('/users/:user_id/appointments/:id', userAppController.getOneData);
router.delete('/users/:user_id/appointments', userAppController.deleteAllData);
router.delete('/users/:user_id/appointments/:id', userAppController.deleteOneData);

//user - mood tracker
router.get('/users/:user_id/mood', userMoodController.getAllData);
router.get('/users/:user_id/mood/:id', userMoodController.getAllData);
router.post('/users/:user_id/mood', userMoodController.newData)
router.delete('/users/:user_id/mood', userMoodController.deleteAllData);
router.delete('/users/:user_id/mood/:id', userMoodController.deleteOneData);

//doctor - login
router.get('/doctors/login', docLoginController.getAllData);
router.get('/doctors/login/:id', docLoginController.getOneData);
router.post('/doctors/login', docLoginController.newData); 
router.patch('/doctors/login/:id', docLoginController.updateData);
router.delete('/doctors/login', docLoginController.deleteAllData);
router.delete('/doctors/login/:id', docLoginController.deleteOneData);

//doctor - details
router.get('/doctors', docDetailsController.getAllData);
router.get('/doctors/:id', docDetailsController.getOneData);
router.post('/doctors', docDetailsController.uploadImg, docDetailsController.newData); 
router.patch('/doctors/:id', docDetailsController.uploadImg, docDetailsController.updateData); 
router.delete('/doctors', docDetailsController.deleteAllData);
router.delete('/doctors/:id', docDetailsController.deleteOneData);

//doctor - availability
router.get('/doctors/:doctor_id/availability', docAvailController.getAllData);
router.get('/doctors/:doctor_id/availability/:id', docAvailController.getOneData);
router.post('/doctors/:doctor_id/availability', docAvailController.newData); 
router.patch('/doctors/:doctor_id/availability/:id', docAvailController.updateData); 
router.delete('/doctors/:doctor_id/availability', docAvailController.deleteAllData);
router.delete('/doctors/:doctor_id/availability/:id', docAvailController.deleteOneData);

//doctor - appointments 
router.get('/doctors/:doctor_id/appointments', docAppController.getAllData);
router.get('/doctors/:doctor_id/appointments/:id', docAppController.getOneData);
router.post('/doctors/:doctor_id/appointments', docAppController.newData); 
router.patch('/doctors/:doctor_id/appointments/:id', docAppController.updateData); 
router.delete('/doctors/:doctor_id/appointments', docAppController.deleteAllData);
router.delete('/doctors/:doctor_id/appointments/:id', docAppController.deleteOneData);

//home - doctor posts
router.get('/posts', docPostController.getAllData);
router.get('/posts/:id', docPostController.getOneData);
router.post('/posts', docPostController.uploadImg, docPostController.newData); 
router.post('/posts/:id/comment', docPostController.updateData); 
router.delete('/posts', docPostController.deleteAllData);
router.delete('/posts/:id', docPostController.deleteOneData);
router.delete('/posts/:id/comment', docPostController.deleteAllComment);
router.delete('/posts/:id/comment/:c_id', docPostController.deleteOneComment);


module.exports = router;

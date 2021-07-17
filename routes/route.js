const express = require('express'); 
const loginController = require('../controllers/controller');
const docController = require('../controllers/docController');
const docAvailController = require('../controllers/docAvailController');
const docAppoinmentController = require('../controllers/docAppController');
const userAppController = require('../controllers/userAppController');
const router  = express.Router();


router.get('/login', loginController.getAllData);
router.get('/login/:id', loginController.getOneData);
router.post('/login', loginController.uploadImg, loginController.newData); 
router.patch('/login/:id', loginController.uploadImg, loginController.updateData);
router.delete('/login', loginController.deleteAllData);
router.delete('/login/:id', loginController.deleteOneData);

router.get('/login/verify/:uniqueString', loginController.verifyUser);

router.get('/doctors', docController.getAllData);
router.get('/doctors/:id', docController.getOneData);
router.post('/doctors', docController.uploadImg, docController.newData); 
router.patch('/doctors/:id', docController.uploadImg, docController.updateData); 
router.delete('/doctors', docController.deleteAllData);
router.delete('/doctors/:id', docController.deleteOneData);

router.get('/doctors/:doctor_id/availability', docAvailController.getAllData);
router.get('/doctors/:doctor_id/availability/:id', docAvailController.getOneData);
router.post('/doctors/:doctor_id/availability', docAvailController.newData); 
router.patch('/doctors/:doctor_id/availability/:id', docAvailController.updateData); 
router.delete('/doctors/:doctor_id/availability', docAvailController.deleteAllData);
router.delete('/doctors/:doctor_id/availability/:id', docAvailController.deleteOneData);

router.get('/doctors/:doctor_id/appointments', docAppoinmentController.getAllData);
router.get('/doctors/:doctor_id/appointments/:id', docAppoinmentController.getOneData);
router.post('/doctors/:doctor_id/appointments', docAppoinmentController.newData); 
router.patch('/doctors/:doctor_id/appointments/:id', docAppoinmentController.updateData); 
router.delete('/doctors/:doctor_id/appointments', docAppoinmentController.deleteAllData);
router.delete('/doctors/:doctor_id/appointments/:id', docAppoinmentController.deleteOneData);

router.get('/user/:user_id/appointments', userAppController.getAllData);
router.get('/user/:user_id/appointments/:id', userAppController.getOneData);
router.delete('/user/:user_id/appointments', userAppController.deleteAllData);
router.delete('/user/:user_id/appointments/:id', userAppController.deleteOneData);

module.exports = router;

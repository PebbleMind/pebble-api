const express = require('express'); 
const loginController = require('../controllers/controller');
const docController = require('../controllers/docController');
const availController = require('../controllers/availController');
const userController = require('../controllers/userController');
const router  = express.Router();


router.get('/login', loginController.getAllData);
router.get('/login/:id', loginController.getOneData);
router.post('/login', loginController.uploadImg, loginController.newData); 
router.patch('/login/:id', loginController.uploadImg, loginController.updateData);
router.delete('/login', loginController.deleteAllData);
router.delete('/login/:id', loginController.deleteOneData);

router.get('/doctors', docController.getAllData);
router.get('/doctors/:id', docController.getOneData);
router.post('/doctors', docController.uploadImg, docController.newData); 
router.patch('/doctors/:id', docController.uploadImg, docController.updateData); 
router.delete('/doctors', docController.deleteAllData);
router.delete('/doctors/:id', docController.deleteOneData);

router.get('/doctors/:doctor_id/availability', availController.getAllData);
router.get('/doctors/:doctor_id/availability/:id', availController.getOneData);
router.post('/doctors/:doctor_id/availability', availController.newData); 
router.patch('/doctors/:doctor_id/availability/:id', availController.updateData); 
router.delete('/doctors/:doctor_id/availability', availController.deleteAllData);
router.delete('/doctors/:doctor_id/availability/:id', availController.deleteOneData);

router.get('/user/:user_id/appointments', userController.getAllData);
router.get('/user/:user_id/appointments/:id', userController.getOneData);
router.post('/user/:user_id/appointments', userController.newData);
router.patch('/user/:user_id/appointments/:id', userController.updateData); 
router.delete('/user/:user_id/appointments', userController.deleteAllData);
router.delete('/user/:user_id/appointments/:id', userController.deleteOneData);

module.exports = router;

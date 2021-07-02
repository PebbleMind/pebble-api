const express = require('express'); 
const loginController = require('../controllers/controller');
const docController = require('../controllers/docController');
const availController = require('../controllers/availController');
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

router.get('/availability', availController.getAllData);
router.get('/availability/:id', availController.getOneData);
router.post('/availability', availController.newData); 
router.patch('/availability/:id', availController.updateData); 
router.delete('/availability', availController.deleteAllData);
router.delete('/availability/:id', availController.deleteOneData);

module.exports = router;

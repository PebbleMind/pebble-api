const express = require('express'); 
const multer = require('multer');
const loginController = require('../controllers/controller');
const docController = require('../controllers/docController');
const router  = express.Router();
const upload = multer();


router.get('/login', loginController.getAllData);
router.get('/login/:id', loginController.getOneData);
router.post('/login', upload.none(), loginController.newData); 
router.delete('/login', loginController.deleteAllData);
router.delete('/login/:id', loginController.deleteOneData);

router.get('/doctors', docController.getAllData);
router.get('/doctors/:id', docController.getOneData);
router.post('/doctors', upload.none(), docController.newData); 
router.delete('/doctors', docController.deleteAllData);
router.delete('/doctors/:id', docController.deleteOneData);

module.exports = router;

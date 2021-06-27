const express = require('express'); 
const multer = require('multer');
const dataController = require('../controllers/controller');
const router  = express.Router();
const upload = multer();


router.get('/login', dataController.getAllData);
router.get('/login/:id', dataController.getOneData);
router.post('/login', upload.none(), dataController.newData); 
router.delete('/login', dataController.deleteAllData);
router.delete('/login/:id', dataController.deleteOneData);

module.exports = router;

var express = require('express');
var router = express.Router();
 

 
 
var employeeCntrl = require('../controllers/employeeController');
/* GET home page. */
 
 
 
router.get('/json', employeeCntrl.json);
router.get('/', employeeCntrl.index);
router.post('/employee',  employeeCntrl.employee);
router.get('/employee',  employeeCntrl.index);
router.get('/edit/:id', employeeCntrl.edit);
router.post('/update/:id', employeeCntrl.update);
router.get('/delete/:id', employeeCntrl.delete);
  
 
module.exports = router;
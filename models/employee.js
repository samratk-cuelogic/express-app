
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Joi = require('joi');

  
 
var employee_Schema = new Schema({ 
    firstName: { type: String, required: true},
    lastName : { type: String, required: true},
    address  : { type: String, required: true},
    country  : { type: String, required: true},
    phone    : { type: String, required: true},
    department  : { type: String, required: true} 
});
 

var employee = mongoose.model('employee', employee_Schema);

module.exports.employee = employee;

 


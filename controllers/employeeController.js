var express = require('express');
var mongoose = require('mongoose'); 
var employee = require('../models/employee').employee;


exports.json = function(req, res, next) { 
    var sss= employee.find({}, function(err, newempd) {
        if (err) throw err;
         
         res.json({
         	status: 200,
		    message: 'Records found!', 
		    result: newempd
		  });
        
    });  
  
};
exports.index = function(req, res, next) { 
     employee.find({}, function(err, newempd) {
        if (err) throw err;
        var errData1 = {};
        res.render('index2', { empData: JSON.stringify(newempd), errData: errData1 });
    });  
};
exports.edit = function(req, res, next) { 
      employee.find({ _id: req.params.id }, function(err, docs) {
        res.render('edit.ejs', { posts: docs[0] });
    });
};
exports.delete = function(req, res, next) { 
        employee.findByIdAndRemove(req.params.id, function(err) {
	        if (err) throw err;
	        console.log('User deleted!');
	        res.redirect( '/' );
	        //res.redirect('http://localhost:3000/');
	    });
};
exports.update = function(req, res, next) { 
       var data = req.body;
	    // console.log("Edit : ");
	    // console.log(data);
	    employee.findByIdAndUpdate(data._id, {
	        firstName: data.firstName,
	        lastName: data.lastName,
	        address: data.address,
	        country: data.country,
	        phone: data.phone,
	        department: data.department
	    }, function(err, user) {
	        if (err) throw err;
	        console.log(" User updated successfully!! ");
	       // res.redirect('http://localhost:3000/');
	        res.redirect( '/' );
	    });
};

exports.employee = function(req, res, next) { 
        var data = req.body;
	    var newemp1 = employee({
	        firstName: data.firstName,
	        lastName: data.lastName,
	        address: data.address,
	        country: data.country,
	        phone: data.phone,
	        department: data.department
	    });
	    newemp1.save(function(err, data) {
	        // if (err) throw err;
	        if (err) {
	            // console.log('ERROR : ' + JSON.stringify(err));
	            console.log('ERROR : ' + JSON.stringify(err.errors.firstName.message));
	            employee.find({}, function(err1, newempd) {
	                res.render('index2.ejs', { empData: JSON.stringify(newempd), errData: err.errors });
	            });

	        } else {
	            console.log('Success  : ' + JSON.stringify(data));
	            var errData1 = {};
	            employee.find({}, function(err1, newempd) {
	                res.render('index2.ejs', { empData: JSON.stringify(newempd), errData: errData1 });
	            });
	        }

	    });
};
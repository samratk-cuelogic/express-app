var express = require('express');
var path = require('path');
var Boom = require('boom');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');

var BodyParser = require('body-parser');
 

 

var expressValidator = require('express-validator');



var logger = require('morgan');
var dotenv = require('dotenv')
//*****Routes*****
var indexRouter = require('./routes/index');
 
var cors = require('cors')

var app = express();
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema;

 
mongoose.connect('mongodb://localhost:27017/dbemployee', function(err) {
    if (err) throw err;
    console.log('Successfully connected to monogo db');
});

/*app.use(parser.urlencoded({ extended: false }))
app.use(parser.json())*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
// ------- Allow cross origin requests ----------

 app.use(expressValidator())

app.use(cors());
app.use(BodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var employee = require('./models/employee');

 

app.use('/', indexRouter);
//app.use('/users', usersRouter);
 

app.use((err, req, res, next) => { res.status(400).send(err); }); 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// Example error handler 
app.use(function (err, req, res, next) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});


module.exports = app;

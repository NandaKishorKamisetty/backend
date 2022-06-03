var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var app = express();
require('dotenv').config()

//database connection
const dburl=process.env.DB_URL

//database connection
var mc=require("mongodb").MongoClient
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{

if(err){
  console.log("error in databaase connection",err.message)
}
else{
const dbObj=client.db('sample')
app.set('databaseObject',dbObj)
console.log('database is c0nnected')
}


})



//importing and using apis
var loginApi=require('./routes/login')
app.use('/login',loginApi)

var signupApi =require('./routes/signup')
app.use('/signup',signupApi)







// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



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

module.exports = app;

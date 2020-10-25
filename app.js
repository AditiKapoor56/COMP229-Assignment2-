/*
	Name: Aditi kapoor
	Student ID: 301108498
	Date: 21-10-2020
*/

var port=process.env.PORT || 8080;
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

//Set view enigne to EJS
app.set('view engine', 'ejs');

//BodyParser is used to handle POST requests
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({extended: true})); 

//Session for authenticating user once he/she has logged in
app.use(session({secret:'running cats',resave:false, saveUninitialized:true}));

//Routes are contained in index.js file
var router=require('./routes/router.js');

app.use("/",router);
app.use("/public", express.static(__dirname + '/public'));

app.listen(port);
console.log('Server started: localhost:8080');

module.exports=app
/*
	Name: Aditi kapoor
	Student ID: 301108498
	Date: 21-10-2020
*/

const { MongoClient, ObjectId } = require('mongodb');
var mongo = require('mongodb').MongoClient;
var mongoUrl = "mongodb+srv://admin:123@assignment2.b4vhj.mongodb.net/";
var express = require('express');
var router = express.Router();
var restricted=require('./middlewares').restricted;
var updateContact=require('./utility_functions').updateContact;

router.get('/', function(req, res) {
res.render('pages/index',{page_title:"Aditi Kapoor - Web Portfolio"});
});

router.get('/services', function(req, res) {
    res.render('pages/services',{page_title:"Aditi Kapoor - Services"});
});

router.get('/projects', function(req, res) {
    res.render('pages/projects',{page_title:"Aditi Kapoor - Projects"});
});

router.get('/aboutme', function(req, res) {
    res.render('pages/aboutme',{page_title:"Aditi Kapoor - About Me"});
});

router.get('/register', function(req, res) {
    res.render('pages/register',{
        page_title:"Aditi Kapoor - Registration", 
        auth_status:(req.query.auth_status)?req.query.auth_status:""
    });
});

router.get('/contact', function(req, res) {
    res.render('pages/contact',{page_title:"Aditi Kapoor - Contact"});
});


router.get('/login', function(req, res) {
    res.render('pages/login',{page_title:"Aditi Kapoor - Login", auth_status:(req.query.status)?req.query.status:""});
});

router.get('/logout',function(req,res){
    req.session.user=null;
    res.redirect('/login');
});

//CONTACT MANAGEMENT
//------------------------------------------------------
//Update contacts
router.get('/update/:id', restricted,function(req, res) {
    var _id=req.params.id;
    var name=req.query.name;
    var number=req.query.number;
    var email=req.query.email;

    updateContact(_id, name, number, email);
    res.render('pages/update',{page_title:"Aditi Kapoor - Update Contact"});
});

//Delete Contacts
router.get('/delete/:id', restricted, function(req, res) {
    var _id=req.params.id;

    MongoClient.connect(mongoUrl, function(err,db){
        dbo=db.db("portfolio");
        dbo.collection("contacts").deleteOne({"_id": ObjectId(_id)});
        res.redirect('/admin');
    });
});

//Show Contacts
router.get('/admin', restricted, function(req, res) {
    var contact_list=[];

    MongoClient.connect(mongoUrl, function(err,db){
        dbo=db.db("portfolio");
        dbo.collection("contacts").find().toArray(function(err,results){
            for(let i=0;i<results.length;i++)
                contact_list.push(results[i]);

            res.render('pages/admin',{page_title:"Aditi Kapoor - Manage Contacts", contact_list:contact_list});
        });
    });
});


//AUTHENTICATION
//----------------------------------------------
router.get('/login/auth',function(req,res){
    
    var username=req.query.username;
    var password=req.query.password;
    var isLoggedIn=null;

    //Check mongodb for the combination of username and password
    MongoClient.connect(mongoUrl, function(err,db){
        dbo=db.db("portfolio");
        dbo.collection("users").find({}).toArray(function(err,results){
            for(let i=0;i<results.length;i++)
                if(username==results[i].username && password==results[i].password)
                    isLoggedIn=true;

            if(isLoggedIn){
                req.session.user=username;
                console.log("Logged in as "+username);
                res.redirect('/admin');
            }
            else res.redirect('/login?status=Invalid Credentials');
        });
    });
});

module.exports = router;
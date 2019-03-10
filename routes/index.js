var express = require('express');
var router = express.Router();
var python_runner = require("./python-runner.js");
var db = require("../db/all.js");

router.get('/', function(req, res, next) {
    var all = [];
    all.push(python_runner.runScript("title", "test.py", ""));
    Promise.all(all).then(function (values) {
        res.render("home.handlebars");
    });
});

router.get('/login', function(req, res, next) {
    res.render("login.handlebars");
});

router.post('/login', function(req, res, next){

 db.User.find({username: "John"}).then(function(user){
     res.send(JSON.stringify(user));
 });

});

router.get('/register', function(req, res, next) {
    res.render("register.handlebars");
});

router.post('/register', function(req, res, next){

    db.User.find({username: "John"}).then(function(user){
        res.redirect("/bookings");
    });

});

module.exports = router;

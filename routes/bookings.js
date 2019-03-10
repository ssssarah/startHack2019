var express = require('express');
var router = express.Router();
var db = require("../db/all.js");

router.get('/', function(req, res, next) {
  db.User.find({username:"John"}).then(function(user){
    db.Vehicle.findAll().then(function(vehicles){
      db.Booking.findAll().then(function(bookings){
        res.render("home.handlebars", {user: user, bookings: bookings, vehicles: vehicles});
      });
    });
  });
});

module.exports = router;

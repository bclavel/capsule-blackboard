var articleModel = require('../models/article');
var userModel = require('../models/users');

var dateFormat = require('./function');
var express = require('express');
var router = express.Router();

var usersList = []

router.get('/', function(req, res, next) {
  userModel.find(
    function (err, users) {
      console.log(users);
      res.render('users', {
        usersList: users,
        dateFormat
      });
    }
  )
});

module.exports = router;

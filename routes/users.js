var articleModel = require('../models/article');
var userModel = require('../models/users');

var express = require('express');
var router = express.Router();

var usersList = []

router.get('/', function(req, res, next) {
  userModel.find(
    function (err, users) {
      console.log(users);
      res.render('users', {
        usersList: users,
      });
    }
  )
});

module.exports = router;

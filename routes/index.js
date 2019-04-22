var articleModel = require('../models/article');
var userModel = require('../models/users');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { });
});


router.post('/addArticle', function(req, res, next) {
  console.log(req.body);

  var newArticle = new articleModel ({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    weight: req.body.weight,
    img: req.body.img,
  });

  newArticle.save(
    function (error, article) {
      console.log(article);
    }
  )

  res.render('index', { });
});

router.post('/addUser', function(req, res, next) {
  console.log(req.body);

  var newUser = new userModel ({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    country: req.body.country,
    age: req.body.age,
    status: req.body.status,
    gender: req.body.gender,
    date_insert: req.body.date_insert,
  });

  newUser.save(
    function (error, user) {
      console.log(user);
    }
  )

  res.render('index', { });
});

var articleList = []

router.get('/catalog', function(req, res, next) {
  articleModel.find(
    function (err, articles) {
      res.render('catalog', {
        articleList: articles,
      });
    }
  )
});


router.get('/messages', function(req, res, next) {
  res.render('messages', { });
});

router.get('/order', function(req, res, next) {
  res.render('order', { });
});

router.get('/orders-list', function(req, res, next) {
  res.render('orders-list', { });
});

router.get('/tasks', function(req, res, next) {
  res.render('tasks', { });
});


module.exports = router;

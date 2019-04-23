var articleModel = require('../models/article');
var userModel = require('../models/users');
var orderModel = require('../models/order');
// var messageModel = require('../models/message');
// var taskModel = require('../models/task');

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

var messagesList = []

router.get('/messages', function(req, res, next) {
  userModel.findById('5cbf15233e02d52a840ad607',
    function (err, user) {
      res.render('messages', {
      messagesList: user
     });
    }
  )
});


router.post('/addMessage', function(req, res, next) {

  userModel.findOne({_id: '5cbf15233e02d52a840ad607'},
    function (err, user) {

      user.messages.push(
        {
          title : req.body.title,
          content: req.body.content,
          date_exp: req.body.date_exp,
          read: req.body.read,
          sender: req.body.sender,
        }
      )
      user.save(
        function (error, user) {
          console.log(user);
        }
      )

      res.render('index', { });
    }
  )
});

// router.post('/addOrder', function(req, res, next) {
//   console.log(req.body);
//
//   var newOrder = new orderModel ({
//     total: req.body.total,
//     shipping_cost: req.body.shipping_cost,
//     insert_date: req.body.insert_date,
//     status_payement: req.body.status_payement,
//     date_payement: req.body.date_payement,
//     status_shipment: req.body.status_shipment,
//     delivery_address: req.body.delivery_address,
//     delivery_country: req.body.delivery_country,
//     delivery_zipcode: req.body.delivery_zipcode,
//     user: req.body.user,
//     articles: [{ }]
//   });
//
//   newOrder.save(
//     function (error, user) {
//       console.log(user);
//     }
//   )
//
//   res.render('index', { });
// });


router.get('/order', function(req, res, next) {
  res.render('order', { });
});

router.get('/orders-list', function(req, res, next) {
  res.render('orders-list', { });
});

var taskList = []

router.get('/tasks', function(req, res, next) {
  userModel.findById('5cbf15233e02d52a840ad607',
    function (err, user) {
      res.render('tasks', {
      taskList: user
     });
    }
  )
});


router.post('/addTask', function(req, res, next) {

  userModel.findOne({_id: '5cbf15233e02d52a840ad607'},
    function (err, user) {

      user.tasks.push(
        {
          name: req.body.name,
          description: req.body.description,
          category: req.body.category,
          owner: req.body.owner,
          date_insert: req.body.date_insert,
          date_due: req.body.date_due,
          date_cloture: req.body.date_cloture
        }
      )
      user.save(
        function (error, user) {
          console.log(user);
        }
      )

      res.render('index', { });
    }
  )

});


module.exports = router;

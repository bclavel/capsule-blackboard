var articleModel = require('../models/article');
var userModel = require('../models/users');
var orderModel = require('../models/order');

var dateFormat = require('./function');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {});
});


router.post('/addArticle', function(req, res, next) {
  console.log(req.body);

  var newArticle = new articleModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock,
    weight: req.body.weight,
    img: req.body.img,
  });

  newArticle.save(
    function(error, article) {
      console.log(article);
    }
  )

  res.render('index', {});
});

router.post('/addUser', function(req, res, next) {
  console.log(req.body);

  var newUser = new userModel({
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
    function(error, user) {
      console.log(user);
    }
  )

  res.render('index', {});
});

var articleList = []

router.get('/catalog', function(req, res, next) {
  articleModel.find(
    function(err, articles) {
      res.render('catalog', {
        articleList: articles,
      });
    }
  )
});

var messagesList = []

router.get('/messages', function(req, res, next) {
  userModel.findById('5cbf15233e02d52a840ad607',
    function(err, user) {
      res.render('messages', {
        messagesList: user,
        dateFormat
      });
    }
  )
});


router.post('/addMessage', function(req, res, next) {
  userModel.findOne({
      _id: '5cbf15233e02d52a840ad607'
    },
    function(err, user) {
      user.messages.push({
        title: req.body.title,
        content: req.body.content,
        date_exp: req.body.date_exp,
        read: req.body.read,
        sender: req.body.sender,
      })
      user.save(
        function(error, user) {
          console.log(user);
        }
      )
      res.render('index', {});
    }
  )
});

router.post('/addOrder', function(req, res, next) {

  var newOrder = new orderModel({
    total: req.body.total,
    shipping_cost: req.body.shipping_cost,
    insert_date: req.body.insert_date,
    status_payment: req.body.status_payment,
    date_payment: req.body.date_payment,
    date_shipment: req.body.date_shipment,
    status_shipment: req.body.status_shipment,
    delivery_address: req.body.delivery_address,
    delivery_city: req.body.delivery_city,
    delivery_zipcode: req.body.delivery_zipcode,
    user: req.body.user_id,
  });
  newOrder.save(
    function(error, order) {
      console.log('save ->', order);
    }
  )
  res.render('index', {});
});


router.get('/order', function(req, res, next) {
  orderModel.findById(req.query.id)
  .populate('user')
  .populate('articles')
  .exec (function (err, order) {
    console.log('order found ->', order);
    res.render('order', {
      order,
      dateFormat
    });
  })
});

router.post('/addArticleToOrder', function(req, res, next) {
  console.log('req.body ->', req.body);
  orderModel.findOne({
      _id: req.body.order_id
    },
    function(err, order) {
      console.log('order found ->', order);
      order.articles.push(req.body.article_id);
      order.save(
        function(error, order) {
          console.log('order save ->', order);
        }
      )
      res.render('index', {});
    })
});

var orderList = []
router.get('/orders-list', function(req, res, next) {
  orderModel.find(
    function (err, orders) {
      res.render('orders-list', {
        orderList: orders,
        dateFormat
      });
    }
  )
});

var taskList = []
router.get('/tasks', function(req, res, next) {
  userModel.findById('5cbf15233e02d52a840ad607',
    function(err, user) {
      res.render('tasks', {
        taskList: user,
        dateFormat
      });
    }
  )
});

router.post('/addTask', function(req, res, next) {
  userModel.findOne({
      _id: '5cbf15233e02d52a840ad607'
    },
    function(err, user) {
      user.tasks.push({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        owner: req.body.owner,
        date_insert: req.body.date_insert,
        date_due: req.body.date_due,
        date_cloture: req.body.date_cloture
      })
      user.save(
        function(error, user) {
          console.log(user);
        }
      )
      res.render('index', {});
    }
  )
});



router.get('/dataviz', async function(req, res, next) {

  //Le nombre d'utilisateurs inscrits par mois
  var userPerMonthReq = userModel.aggregate();
  userPerMonthReq.group({_id : {Year : {$year: '$date_insert'}, Month : {$month: '$date_insert'}}, countUsers : { $sum : 1}});
  userPerMonthReq.sort({_id : 1})
  var userPerMonth = await userPerMonthReq.exec(console.log('1'));

  // Le nombre d'utilisateurs inscrits par sexe
  var userPerGenderReq = userModel.aggregate();
  userPerGenderReq.group({_id : '$gender', countUserGender : {$sum : 1}})
  var userPerGender = await userPerGenderReq.exec(console.log('2'));

  // Le panier moyen des commandes payées par mois
  var avgOrderPerMonthReq = orderModel.aggregate();
  avgOrderPerMonthReq.group({_id : {
    Year : {$year: '$date_insert'},
    Month : {$month: '$date_insert'}
    },
    countOrder : {$sum : 1}})
  avgOrderPerMonthReq.sort({_id : 1})
  var avgOrderPerMonth = await avgOrderPerMonthReq.exec(console.log('3'));

  // Le nombre et le chiffre d'affaire des commandes payées et expédiées par jour
  var numberTotalOrderPerDayReq = orderModel.aggregate();
  numberTotalOrderPerDayReq.match({status_shipment : true, status_payment : 'valided'});
  numberTotalOrderPerDayReq.group({_id : {
    Year : {$year: '$date_insert'},
    Month : {$month: '$date_insert'},
    Day : {$dayOfMonth : '$date_insert'}
    },
    countOrder : {$sum : 1},
    countTotal : {$sum : '$total'}
  })
  numberTotalOrderPerDayReq.sort({_id : 1})
  var numberTotalOrderPerDay = await numberTotalOrderPerDayReq.exec(console.log('4'));

  var totalStock = 0
  // Le nombre total de commandes
  var totalArticle = articleModel.find()
  await totalArticle.exec(function (err, data) {
    for (var i = 0; i < data.length; i++) {
      totalStock += data[i].stock
    }
    console.log('5');
  })

  var unreadMessages = 0
  // Le nombre de messages non lus
  var getUser = userModel.findById('5cbf15233e02d52a840ad607')
  await getUser.exec(function (err, data) {
    var unreadMessages = 0
    for (var i = 0; i < data.messages.length; i++) {
      if (data.messages[i].read == false) {
        unreadMessages++
      }
    }
    console.log('6');
  })

  var openTasks = 0
  // Le nombre de tâches non cloturées
  var getUser = userModel.findById('5cbf15233e02d52a840ad607')
  await getUser.exec(function (err, data) {
    var openTasks = 0
    for (var i = 0; i < data.tasks.length; i++) {
      if (!data.tasks[i].date_cloture) {
        openTasks++
      }
    }
    console.log('7');
  })

    res.render('chart', {
      userPerMonth,
      userPerGender,
      avgOrderPerMonth,
      numberTotalOrderPerDay,
      totalStock,
      unreadMessages,
      openTasks,
    });
  })

module.exports = router;

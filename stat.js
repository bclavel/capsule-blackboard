var mongoose = require('mongoose');
var userModel = require('./models/users');
var orderModel = require('./models/order');
var articleModel = require('./models/article');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb://admin:azerty1@ds247410.mlab.com:47410/blackboardsandbox',
    options,
    function(err) {
     console.log(err);
    }
);


//Le nombre d'utilisateurs inscrits par mois
var userPerMonth = userModel.aggregate();
userPerMonth.group({_id : {Year : {$year: '$date_insert'}, Month : {$month: '$date_insert'}}, countUsers : { $sum : 1}});
userPerMonth.sort({_id : 1})
userPerMonth.exec(function (err, data) {
  // console.log(data);
})

// Le nombre d'utilisateurs inscrits par sexe
var userPerGender = userModel.aggregate();
userPerGender.group({_id : '$gender', countUserGender : {$sum : 1}})
userPerGender.exec(function (err, data) {
  // console.log(data);
})

// Le panier moyen des commandes payées par mois
var avgOrderPerMonth = orderModel.aggregate();
avgOrderPerMonth.group({_id : {
  Year : {$year: '$date_insert'},
  Month : {$month: '$date_insert'}
  },
  countOrder : {$sum : 1}})
avgOrderPerMonth.sort({_id : 1})
avgOrderPerMonth.exec(function (err, data) {
  // console.log(data);
})

// Le nombre et le chiffre d'affaire des commandes payées et expédiées par jour
var numberTotalOrderPerDay = orderModel.aggregate();
numberTotalOrderPerDay.match({status_shipment : true, status_payment : 'valided'});
numberTotalOrderPerDay.group({_id : {
  Year : {$year: '$date_insert'},
  Month : {$month: '$date_insert'},
  Day : {$dayOfMonth : '$date_insert'}
  },
  countOrder : {$sum : 1},
  countTotal : {$sum : '$total'}
})
numberTotalOrderPerDay.sort({_id : 1})
numberTotalOrderPerDay.exec(function (err, data) {
  // console.log(data);
})

// Toutes les commandes
var totalOrder = orderModel.find()
totalOrder.exec(function (err, data) {
  // console.log(data);
})

// Tous les users
var totalUsers = userModel.find()
totalUsers.exec(function (err, data) {
  // console.log(data);
})


// Le nombre total de commandes
var totalArticle = articleModel.find()
totalArticle.exec(function (err, data) {
  var totalStock = 0
  for (var i = 0; i < data.length; i++) {
    totalStock += data[i].stock
  }
  // console.log(totalStock);
})


// Le nombre de messages non lus
var getUser = userModel.findById('5c52e856abc36cf9293b2175')
getUser.exec(function (err, data) {
  var unreadMessages = 0
  for (var i = 0; i < data.messages.length; i++) {
    if (data.messages[i].read == false) {
      unreadMessages++
    }
  }
  // console.log(unreadMessages);
})

// Le nombre de tâches non cloturées
var getUser = userModel.findById('5c52e856abc36cf9293b2175')
getUser.exec(function (err, data) {
  var openTasks = 0
  for (var i = 0; i < data.tasks.length; i++) {
    if (!data.tasks[i].date_cloture) {
      openTasks++
    }
  }
  // console.log(openTasks);
})

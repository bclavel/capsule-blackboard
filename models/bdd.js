var mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true
}
mongoose.connect('mongodb+srv://benoit:benoit@newt-0267k.mongodb.net/blackboard?retryWrites=true',
    options,
    function(err) {
     console.log(err);
    }
);

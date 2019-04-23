var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  owner: String,
  date_insert: Date,
  date_due: Date,
  date_cloture: Date
});

var messageSchema = mongoose.Schema({
  title : String,
  content: String,
  date_exp: Date,
  read: Boolean,
  sender: String,
});

// Création du schéma de données city
var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  country: String,
  age: Number,
  status: String,
  gender: String,
  date_insert: Date,
  tasks: [taskSchema],
  messages: [messageSchema]
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('users', userSchema);

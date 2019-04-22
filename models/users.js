var mongoose = require('mongoose');

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
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('users', userSchema);

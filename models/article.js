var mongoose = require('mongoose');

// Création du schéma de données article
var articleSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  weight: Number,
  img: String,
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('articles', articleSchema);

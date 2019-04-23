var mongoose = require('mongoose');

// Création du schéma de données article
var messageSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  title : String,
  content: String,
  date_exp: Date,
  read: Boolean,
  sender: String,
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('messages', messageSchema);

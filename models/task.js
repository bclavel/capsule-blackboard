var mongoose = require('mongoose');

// Création du schéma de données article
var taskSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: String,
  description: String,
  category: String,
  owner: String,
  date_insert: Date,
  date_due: Date,
  date_cloture: Date,
});

// Export pour utilisation dans les routes (collection + schéma)
module.exports = mongoose.model('tasks', taskSchema);

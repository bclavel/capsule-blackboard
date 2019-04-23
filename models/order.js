// var mongoose = require('mongoose');
//
// // Création du schéma de données city
// var orderSchema = mongoose.Schema({
//   total: Number,
//   shipping_cost: Number,
//   insert_date: Date,
//   status_payement: String,
//   date_payement: Date,
//   status_shipment: Boolean,
//   delivery_address: String,
//   delivery_country: String,
//   delivery_zipcode: String,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
//   articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'articles' }]
// });
//
// // Export pour utilisation dans les routes (collection + schéma)
// module.exports = mongoose.model('orders', orderSchema);

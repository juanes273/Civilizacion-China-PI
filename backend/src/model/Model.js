const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const Model = mongoose.model('Model', userSchema);

module.exports = Model;

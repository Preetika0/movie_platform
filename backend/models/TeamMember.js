const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: String,
  role: String,
  bio: String,
  photo: String
});

module.exports = mongoose.model('TeamMember', teamSchema);

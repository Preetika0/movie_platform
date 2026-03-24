const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const showtimeSchema = new Schema({
  time: String,
  price: Number,
  seats: { type: Map, of: Boolean, default: {} }
});

const movieSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  genre: [String],
  poster: String,
  releaseDate: Date,
  showtimes: [showtimeSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Movie', movieSchema);

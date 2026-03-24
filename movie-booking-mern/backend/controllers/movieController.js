const Movie = require('../models/Movie');

exports.getAll = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Not found' });
    res.json(movie);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.json(movie);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.updateShowtimeSeats = async (req, res) => {
  try {
    const { movieId, time, updatedSeats } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    const show = movie.showtimes.find(s => s.time === time);
    if (!show) return res.status(404).json({ message: 'Showtime not found' });
    for (const [k,v] of Object.entries(updatedSeats)) {
      show.seats.set(k, v);
    }
    await movie.save();
    res.json({ success: true, movie });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const Booking = require('../models/Booking');
const Movie = require('../models/Movie');

exports.createBooking = async (req, res) => {
  try {
    const { movieId, showtime, seats, customerName, customerEmail } = req.body;
    const movie = await Movie.findById(movieId);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    const show = movie.showtimes.find(s => s.time === showtime);
    if (!show) return res.status(404).json({ message: 'Showtime not found' });

    for (const seat of seats) {
      if (show.seats.get(seat) === false) {
        return res.status(400).json({ message: `Seat ${seat} already booked` });
      }
    }

    for (const seat of seats) {
      show.seats.set(seat, false);
    }
    await movie.save();

    const priceEach = show.price || 100;
    const total = priceEach * seats.length;
    const booking = new Booking({
      movieId, movieTitle: movie.title, showtime, seats, totalPrice: total, customerName, customerEmail
    });
    await booking.save();
    res.json(booking);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

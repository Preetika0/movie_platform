const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const movieRoutes = require('./routes/movies');
const bookingRoutes = require('./routes/bookings');
const feedbackRoutes = require('./routes/feedbacks');
const teamRoutes = require('./routes/team');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/movies', movieRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/team', teamRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Mongo connected');
    app.listen(PORT, ()=> console.log('Server running on port', PORT));
  })
  .catch(err => console.error(err));

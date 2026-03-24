const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/bookingController');

router.post('/', ctrl.createBooking);
router.get('/', ctrl.getBookings);

module.exports = router;

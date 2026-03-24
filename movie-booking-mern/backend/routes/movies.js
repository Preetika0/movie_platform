const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/movieController');

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.post('/update-seats', ctrl.updateShowtimeSeats);

module.exports = router;

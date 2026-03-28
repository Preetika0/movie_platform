const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/feedbackController');

router.post('/', ctrl.createFeedback);
router.get('/', ctrl.getAll);

module.exports = router;

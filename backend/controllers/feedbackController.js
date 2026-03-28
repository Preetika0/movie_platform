const Feedback = require('../models/Feedback');

exports.createFeedback = async (req, res) => {
  try {
    const fb = new Feedback(req.body);
    await fb.save();
    res.json(fb);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAll = async (req, res) => {
  try {
    const fbs = await Feedback.find().sort({ createdAt: -1 });
    res.json(fbs);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

const TeamMember = require('../models/TeamMember');

exports.getAll = async (req, res) => {
  try {
    const t = await TeamMember.find();
    res.json(t);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.create = async (req, res) => {
  try {
    const m = new TeamMember(req.body);
    await m.save();
    res.json(m);
  } catch (err) { res.status(500).json({ error: err.message }); }
};

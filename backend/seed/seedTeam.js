const mongoose = require('mongoose');
require('dotenv').config();
const TeamMember = require('../models/TeamMember');

const team = [
  { name: 'kp preetika setty', role: 'Developer', bio: 'Front-end developer' },
  { name: 'k srujana', role: 'Developer', bio: 'Back-end developer' },
  { name: 'k prashanthi', role: 'Designer', bio: 'UI/UX designer' }
];

async function seed(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movie_booking');
  await TeamMember.deleteMany({});
  for (const t of team) await new TeamMember(t).save();
  console.log('Seeded team');
  mongoose.disconnect();
}
seed();

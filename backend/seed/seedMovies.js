const mongoose = require('mongoose');
require('dotenv').config();
const Movie = require('../models/Movie');

// Seed list now includes the movies you requested. Posters point to /pic/<filename>.jpg
// Please copy the JPG files into frontend/public/pic/ with the exact filenames:
// Jurassic_World.jpg, The_Great_Flood.jpg, Lokah.jpg, Die_My_Love.jpg, A_House_Of_Dynamite.jpg, predators_badlands.jpg
const movies = [
  { title: "Jurassic World", description: "Dinosaur action and adventure.", duration: 125, genre:["Action","Adventure"], poster: "/pic/Jurassic_World.jpg", releaseDate: new Date("2023-06-01"), showtimes:[{time:"10:30 AM", price:220},{time:"02:00 PM", price:250},{time:"07:30 PM", price:300}] },
  { title: "The Great Flood", description: "Epic drama of survival.", duration:140, genre:["Drama"], poster: "/pic/The_Great_Flood.jpg", releaseDate:new Date("2024-04-15"), showtimes:[{time:"11:00 AM", price:180},{time:"05:00 PM", price:210}] },
  { title: "Lokah", description: "A spiritual journey.", duration:110, genre:["Drama","Indie"], poster: "/pic/Lokah.jpg", releaseDate:new Date("2024-09-03"), showtimes:[{time:"01:00 PM", price:150},{time:"06:00 PM", price:190}] },
  { title: "Die My Love", description: "Thrilling romantic suspense.", duration:132, genre:["Thriller","Romance"], poster: "/pic/Die_My_Love.jpg", releaseDate:new Date("2025-02-21"), showtimes:[{time:"12:30 PM", price:170},{time:"08:00 PM", price:220}] },
  { title: "A House Of Dynamite", description: "High-voltage family drama.", duration:148, genre:["Action","Drama"], poster: "/pic/A_House_Of_Dynamite.jpg", releaseDate:new Date("2025-07-10"), showtimes:[{time:"03:00 PM", price:200},{time:"09:30 PM", price:250}] },
  { title: "Predators: Badlands", description: "Survival horror in the badlands.", duration:95, genre:["Horror","Action"], poster: "/pic/predators_badlands.jpg", releaseDate:new Date("2025-01-05"), showtimes:[{time:"04:00 PM", price:160}] }
];

async function seed(){
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/movie_booking');
  await Movie.deleteMany({});
  for (const m of movies){
    m.showtimes = m.showtimes.map(s => {
      const seats = {};
      const rows = ['A','B','C','D'];
      for (const r of rows){
        for (let i=1;i<=8;i++) seats[`${r}${i}`] = true;
      }
      return {...s, seats};
    });
    await new Movie(m).save();
  }
  console.log('Seeded movies');
  mongoose.disconnect();
}
seed();

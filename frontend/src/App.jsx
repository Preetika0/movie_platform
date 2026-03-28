import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Movies from './components/Movies';
import MovieDetails from './components/MovieDetails';
import Orders from './components/Orders';
import Feedback from './components/Feedback';
import Team from './components/Team';

export default function App(){
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/movies" element={<Movies/>}/>
          <Route path="/movies/:id" element={<MovieDetails/>}/>
          <Route path="/orders" element={<Orders/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/team" element={<Team/>}/>
        </Routes>
      </main>
    </>
  );
}

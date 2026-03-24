import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <div>
      <div className="home-hero">
        <div className="hero-overlay">
          <h1>Welcome to Movie Booking</h1>
          <p>Pick a movie, choose time & seats</p>
          <p style={{color:'#ffffffff'}}>select seats and confirm your booking.</p>
          <Link to="/movies"><button>Browse Movies</button></Link>
          
        </div>
      </div>
    </div>
  );
}

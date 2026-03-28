import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){
  return (
    <nav>
      <div style={{display:'flex',gap:16,alignItems:'center'}}>
        <div className="brand">MovieBooking</div>
        <Link to="/">Home</Link>
        <Link to="/movies">Movies</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/team">Team</Link>
      </div>
    </nav>
  );
}

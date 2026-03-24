import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import SeatSelector from './SeatSelector';

export default function MovieDetails(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedShow, setSelectedShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customer, setCustomer] = useState({name:'', email:''});
  const [confirmation, setConfirmation] = useState(null);

  useEffect(()=> { API.get(`/movies/${id}`).then(res=> setMovie(res.data)).catch(()=>{}); }, [id]);

  const handleBook = async () => {
    if(!selectedShow || selectedSeats.length===0) return alert('Select showtime & seats');
    if(!customer.name || !customer.email) return alert('Enter your name and email');
    const payload = { movieId: movie._id, movieTitle: movie.title, showtime: selectedShow.time, seats: selectedSeats, totalPrice: selectedSeats.length * selectedShow.price, customerName: customer.name, customerEmail: customer.email };
    try {
      const res = await API.post('/bookings', payload);
      setConfirmation(res.data);
      setSelectedSeats([]);
      setCustomer({name:'', email:''});
    } catch (err) {
      alert(err.response?.data?.message || 'Booking failed');
    }
  };

  if(!movie) return <div style={{padding:'40px', textAlign:'center'}}><p>Loading...</p></div>;
  
  return (
    <div style={{maxWidth:'1100px', margin:'20px auto', padding:'20px'}}>
      <div style={{display:'flex', gap:30, alignItems:'flex-start', marginBottom:30}}>
        <div style={{flex:'0 0 auto'}}>
          <img src={movie.poster} alt={movie.title} style={{width:240, height:360, borderRadius:8, objectFit:'cover', boxShadow:'0 4px 12px rgba(0,0,0,0.15)'}}/>
        </div>
        <div style={{flex:1}}>
          <h1 style={{margin:'0 0 12px 0'}}>{movie.title}</h1>
          <div style={{display:'flex', gap:16, marginBottom:16, fontSize:'14px', color:'#666'}}>
            <span>⏱️ {movie.duration} min</span>
            <span>📅 {new Date(movie.releaseDate).toLocaleDateString()}</span>
            <span>🎬 {movie.genre?.join(', ')}</span>
          </div>
          <p style={{color:'#555', lineHeight:'1.6'}}>{movie.description}</p>
          
          <div style={{marginTop:20, marginBottom:20}}>
            <h3 style={{marginBottom:12}}>Select Showtime</h3>
            <div style={{display:'flex', gap:10, flexWrap:'wrap'}}>
              {movie.showtimes.map((s,idx)=> {
                const isSelected = selectedShow === s;
                return (
                  <button 
                    key={idx} 
                    onClick={()=> { setSelectedShow(s); setSelectedSeats([]); }}
                    style={{
                      border: isSelected ? '2px solid #1e90ff' : '1px solid #ddd',
                      background: isSelected ? '#1e90ff' : '#f5f5f5',
                      color: isSelected ? '#fff' : '#222',
                      padding: '10px 16px',
                      fontSize: '14px'
                    }}
                  >
                    {s.time} <br/> ₹{s.price}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {selectedShow && (
        <div style={{background:'#f9f9f9', padding:24, borderRadius:8}}>
          <h3>🎭 Select Seats for {selectedShow.time}</h3>
          <SeatSelector show={selectedShow} onChange={setSelectedSeats} />
          
          {selectedSeats.length > 0 && (
            <div style={{marginTop:20, padding:16, background:'#fff', borderRadius:8, border:'1px solid #ddd'}}>
              <p style={{margin:'0 0 12px 0'}}><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
              <p style={{margin:'0 0 12px 0'}}><strong>Price per seat:</strong> ₹{selectedShow.price}</p>
              <p style={{margin:'0 0 12px 0', fontSize:'18px'}}><strong>Total: ₹{selectedSeats.length * selectedShow.price}</strong></p>
            </div>
          )}

          <div style={{marginTop:20, maxWidth:400}}>
            <h3>Your Details</h3>
            <input 
              placeholder="Full Name" 
              value={customer.name} 
              onChange={e=>setCustomer({...customer,name:e.target.value})}
              style={{marginTop:12}}
            />
            <input 
              type="email"
              placeholder="Email Address" 
              value={customer.email} 
              onChange={e=>setCustomer({...customer,email:e.target.value})}
              style={{marginTop:12}}
            />
            <button onClick={handleBook} style={{marginTop:16, width:'100%', padding:'12px', fontSize:'16px', fontWeight:'600'}}>
              ✓ Confirm Booking
            </button>
          </div>
        </div>
      )}

      {confirmation && (
        <div style={{marginTop:20, padding:24, border:'2px solid #4caf50', borderRadius:8, background:'#f1f8f5'}}>
          <h2 style={{color:'#2e7d32', margin:'0 0 12px 0'}}>✓ Booking Confirmed!</h2>
          <h3 style={{color:'#1976d2', margin:'0 0 16px 0'}}>Thank you for booking! 🎉</h3>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:16}}>
            <div>
              <p><strong>Booking ID:</strong></p>
              <p style={{background:'#fff', padding:8, borderRadius:4, fontSize:'14px', fontFamily:'monospace'}}>{confirmation._id}</p>
            </div>
            <div>
              <p><strong>Movie:</strong></p>
              <p>{confirmation.movieTitle}</p>
            </div>
            <div>
              <p><strong>Showtime:</strong></p>
              <p>{confirmation.showtime}</p>
            </div>
            <div>
              <p><strong>Seats:</strong></p>
              <p>{confirmation.seats.join(', ')}</p>
            </div>
            <div>
              <p><strong>Total Cost:</strong></p>
              <p style={{fontSize:'18px', fontWeight:'600', color:'#2e7d32'}}>₹{confirmation.totalPrice}</p>
            </div>
            <div>
              <p><strong>Confirmation Email:</strong></p>
              <p>{confirmation.customerEmail}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

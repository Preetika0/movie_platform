import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function Movies(){
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(()=> { 
    API.get('/movies')
      .then(res=> {
        setMovies(res.data);
        setLoading(false);
      })
      .catch(err=> {
        console.error('Error fetching movies:', err);
        setLoading(false);
      }); 
  },[]);

  if(loading) return <div style={{padding:'40px', textAlign:'center'}}><p>Loading movies...</p></div>;
  
  return (
    <div style={{maxWidth:'1200px', margin:'0 auto', padding:'24px 16px'}}>
      <div style={{marginBottom:32}}>
        <h1 style={{margin:'0 0 8px 0'}}>🎬 Now Showing</h1>
        <p style={{margin:0, color:'#666'}}>Book your tickets now!</p>
      </div>

      {movies.length === 0 ? (
        <div style={{textAlign:'center', padding:'60px 20px', background:'#f5f5f5', borderRadius:8}}>
          <p style={{fontSize:'18px', color:'#999'}}>No movies available right now</p>
        </div>
      ) : (
        <div className="grid">
          {movies.map(m => (
            <div key={m._id} className="card" style={{overflow:'hidden', transition:'transform 0.2s, box-shadow 0.2s', cursor:'pointer'}} onMouseEnter={e => {e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'}} onMouseLeave={e => {e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 1px 6px rgba(0,0,0,0.04)'}}>
              <div style={{position:'relative', overflow:'hidden'}}>
                <img src={m.poster} alt={m.title} style={{width:'100%', height:300, objectFit:'cover', borderRadius:'6px 6px 0 0'}}/>
                <div style={{position:'absolute', top:8, right:8, background:'rgba(0,0,0,0.8)', color:'#fff', padding:'4px 8px', borderRadius:4, fontSize:'12px', fontWeight:'600'}}>
                  {m.genre?.[0] || 'Movie'}
                </div>
              </div>
              <div style={{padding:12}}>
                <h3 style={{margin:'0 0 8px 0', fontSize:'16px'}}>{m.title}</h3>
                <p style={{color:'#666', fontSize:'13px', lineHeight:'1.4', marginBottom:8}}>{m.description?.slice(0,80)}...</p>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'12px', color:'#999', marginBottom:12}}>
                  <span>⏱️ {m.duration} min</span>
                  <span>📅 {m.showtimes?.length} shows</span>
                </div>
                <Link to={`/movies/${m._id}`}>
                  <button style={{width:'100%', padding:'10px', fontSize:'14px', fontWeight:'600'}}>
                    🎫 Book Tickets
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

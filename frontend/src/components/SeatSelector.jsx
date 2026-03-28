import React, { useEffect, useState } from 'react';

export default function SeatSelector({ show, onChange }) {
  const [localSeats, setLocalSeats] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(()=> {
    setLocalSeats(show.seats || {});
    setSelected([]);
    onChange([]);
  }, [show]);

  useEffect(()=> onChange(selected), [selected]);

  const toggleSeat = (seat) => {
    if(localSeats[seat] === false) return;
    if(selected.includes(seat)) setSelected(selected.filter(s=>s!==seat));
    else setSelected([...selected, seat]);
  };

  // build rows
  const rows = {};
  Object.keys(localSeats).forEach(k => {
    const r = k[0];
    if(!rows[r]) rows[r]=[];
    rows[r].push(k);
  });
  Object.keys(rows).forEach(r => rows[r].sort((a,b)=> parseInt(a.slice(1))-parseInt(b.slice(1))));

  const sortedRows = Object.keys(rows).sort();
  const totalSeats = Object.keys(localSeats).length;
  const bookedSeats = Object.keys(localSeats).filter(k => localSeats[k] === false).length;
  const availableSeats = totalSeats - bookedSeats;

  return (
    <div className="card">
      <div style={{marginBottom:16, padding:'12px', background:'#f5f5f5', borderRadius:'6px'}}>
        <p style={{margin:'4px 0'}}><strong>Screen</strong></p>
        <p style={{margin:'4px 0', fontSize:'12px', color:'#666'}}>👇 Seats Below 👇</p>
      </div>
      
      <div className="seat-container">
        {sortedRows.map(row => (
          <div key={row} className="seat-row">
            <strong style={{fontSize:'14px'}}>{row}</strong>
            <div className="seats-grid">
              {rows[row].map(seat => {
                const available = localSeats[seat] !== false;
                const isSelected = selected.includes(seat);
                const cls = "seat" + (available? (isSelected? " selected":"") : " booked");
                return (
                  <button 
                    key={seat} 
                    className={cls} 
                    onClick={()=>toggleSeat(seat)} 
                    disabled={!available}
                    title={available ? (isSelected ? 'Selected' : 'Available') : 'Booked'}
                  >
                    {seat.slice(1)}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{marginTop:16, padding:'12px', background:'#f5f5f5', borderRadius:'6px', display:'flex', gap:'20px', fontSize:'14px'}}>
        <div>
          <span style={{display:'inline-block', width:'20px', height:'20px', background:'#f0f0f0', border:'2px solid #ddd', borderRadius:'3px', marginRight:'6px'}}></span>
          Available ({availableSeats})
        </div>
        <div>
          <span style={{display:'inline-block', width:'20px', height:'20px', background:'#333', border:'2px solid #222', borderRadius:'3px', marginRight:'6px'}}></span>
          Booked ({bookedSeats})
        </div>
        <div>
          <span style={{display:'inline-block', width:'20px', height:'20px', background:'#4caf50', border:'2px solid #2e7d32', borderRadius:'3px', marginRight:'6px'}}></span>
          Selected ({selected.length})
        </div>
      </div>
    </div>
  );
}

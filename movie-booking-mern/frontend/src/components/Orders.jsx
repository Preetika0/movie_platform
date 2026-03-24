import React, {useEffect, useState} from 'react';
import API from '../api/api';

export default function Orders(){
  const [orders, setOrders] = useState([]);
  useEffect(()=> { API.get('/bookings').then(res=> setOrders(res.data)).catch(()=>{}); },[]);
  return (
    <div>
      <h2>All Bookings</h2>
      <div className="card">
        <table style={{width:'100%'}}>
          <thead><tr><th>Movie</th><th>Show</th><th>Seats</th><th>Name</th><th>Total</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o._id}>
                <td>{o.movieTitle}</td>
                <td>{o.showtime}</td>
                <td>{o.seats.join(', ')}</td>
                <td>{o.customerName}</td>
                <td>₹{o.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, {useState, useEffect} from 'react';
import API from '../api/api';

export default function Feedback(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({name:'', email:'', rating:5, message:''});

  useEffect(()=> { API.get('/feedbacks').then(res=> setList(res.data)).catch(()=>{}); },[]);

  const submit = async (e) => {
    e.preventDefault();
    await API.post('/feedbacks', form).catch(()=>{});
    setForm({name:'', email:'', rating:5, message:''});
    const res = await API.get('/feedbacks').catch(()=>({data:[]})); setList(res.data || []);
  };

  return (
    <div>
      <h2>Feedback</h2>
      <div className="card" style={{maxWidth:600}}>
        <form onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/>
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
          <select value={form.rating} onChange={e=>setForm({...form, rating: e.target.value})}>
            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})}/>
          <button type="submit">Send</button>
        </form>
      </div>

      <h3>All feedback</h3>
      <div className="grid">
        {list.map(f=> <div key={f._id} className="card"><strong>{f.name}</strong> ({f.rating})<p>{f.message}</p></div>)}
      </div>
    </div>
  );
}

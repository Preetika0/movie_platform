import React, {useEffect, useState} from 'react';
import API from '../api/api';

export default function Team(){
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> { 
    API.get('/team')
      .then(res=> {
        setTeam(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching team:', err);
        setLoading(false);
      }); 
  },[]);

  if(loading) return <div style={{padding:'40px', textAlign:'center'}}><p>Loading team...</p></div>;

  return (
    <div style={{maxWidth:'1200px', margin:'0 auto', padding:'24px 16px'}}>
      <div style={{marginBottom:32}}>
        <h1 style={{margin:'0 0 8px 0'}}>Our Team</h1>
        <p style={{margin:0, color:'#666'}}>Meet the developers behind this project</p>
      </div>

      {team.length === 0 ? (
        <div style={{textAlign:'center', padding:'60px 20px', background:'#f5f5f5', borderRadius:8}}>
          <p style={{fontSize:'18px', color:'#999'}}>No team members yet</p>
        </div>
      ) : (
        <div className="grid">
          {team.map(t=> (
            <div key={t._id} className="card" style={{overflow:'hidden', transition:'transform 0.2s, box-shadow 0.2s'}} onMouseEnter={e => {e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 16px rgba(0,0,0,0.12)'}} onMouseLeave={e => {e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 1px 6px rgba(0,0,0,0.04)'}}>
              <div style={{textAlign:'center', padding:20}}>
                <h3 style={{margin:'0 0 8px 0', fontSize:'18px', textTransform:'capitalize'}}>{t.name}</h3>
                <p style={{margin:'0 0 6px 0', color:'#1e90ff', fontWeight:'600'}}>{t.role}</p>
                <p style={{margin:0, color:'#666', fontSize:'14px'}}>{t.bio}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

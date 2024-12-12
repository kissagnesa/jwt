import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

export const App=() =>{
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [token, setToken]=useState('');
  const[data, setData]=useState('');

  const adatKeres=async()=>{
    try{
      const valasz=await axios.get(
        'https://jwt.sulla.hu/termekek',
        { headers: {Authorization:`Bearer ${token}`}});
        setData(valasz.data);
    }
    catch(error){
      console.log('Hiba az adatlekésében: ', error)
    }
  }

const loginKezelo=async()=>{
  try{
    const valasz=await axios.post(
      'https://jwt.sulla.hu/login', {username, password});
      setToken(valasz.data.token);
  }
  catch(error){
    console.log('Hiba: ', error)
  };
  
}

  return (
    <div>
      <h2>JWT bejelentkezés</h2>
      Felhasználónév:
      <input type="text" vaule={username} onChange={(e)=>setUsername(e.target.value)}/>
      Jelszó:
      <input type="password" vaule={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={loginKezelo} className='btn btn-primary'>Bejelentkezés</button>
      {token && (
        <div>
          <h2>Védett végpont</h2>
          <button onClick={adatKeres} className='btn btn-primary'>Adatok kérése</button>
          {data &&(
            <ul>
              {data.map((item)=>(
                <li key={item.id}>ID: {item.id} - {item.name} - {item.price}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}


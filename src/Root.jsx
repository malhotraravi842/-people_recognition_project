import React, { useState, useEffect,Component } from 'react'
import {cyan} from '@mui/material/colors';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function Root() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')
  const apiFetch = (data) => {
     localStorage.setItem("indexed_db", JSON.stringify(data));
  
    const d = JSON.parse(localStorage.getItem("indexed_db"));
    console.log(d);
    
  }
  

  const getPerson = async () => {
    const response = await fetch(url)
    const data = await response.json()
    apiFetch(data);
    const person = data.results[0]
    const { phone, email } = person
    const { large: image } = person.picture
    const {
      login: { password },
    } = person
    const { first, last } = person.name
    const {
      dob: { age },
    } = person
    const {
      street: { number, name },
    } = person.location
    const newPerson = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    
    
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)


  }
  const deleteItem =()=> {
   
    localStorage.removeItem( "data");
  }
   
  useEffect(() => {
    getPerson()
  }, [])
  
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }
   
 
  

  
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
        <Card sx={{ maxWidth: 3450 ,bgcolor: cyan[600] }}>
        
      <CardMedia>
       
        <img
            src={(person && person.image) || defaultImage}
            alt="random user"
            className="user-img"
            height="340"
            border-radius="25"
            margin-top="10"
          />
          </CardMedia>
          <CardContent>
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
            <button className="btn" type="button">
            Delete 
          </button>
          </div>
         
          <button className="btn" type="button" onClick={deleteItem}>
            {loading ? 'loading...' : 'random user'}
          </button>
          <div>
         
          </div>
          </CardContent>
      </Card>
        </div>
      </div>
     
    </main>
  )
}

export default Root
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [book,setbook]=useState({
    book_id:"",
    book_title:"",
    book_description:"",
    cover:null
  })  

  const navigate = useNavigate()

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/books',book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
  
const handleChange = (e) => {
  setbook(prev => ({ ...prev, [e.target.name]: e.target.value }));
}
console.log(book);
  return (
    <>
    <div className="form">
      <h1>Add New Books</h1>
      <input type="text" onChange={handleChange} placeholder='Id ' name='book_id'/>
      <input type="text" onChange={handleChange} placeholder='Title' name='book_title'/>
      <input type="text" onChange={handleChange} placeholder='Description' name='book_description' />
      <input type="text" onChange={handleChange} placeholder='Book Cover' name='book_description'/>
    </div>
    <button onClick={handleClick}>Add</button>
  </>
  )
}

export default Add;
// Import necessary libraries and styles
import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link ,useNavigate } from 'react-router-dom';

import './addroom.css'; // Import the CSS file
const token =localStorage.getItem("tkn");
const AddRoomPage = () => {
  const { id} = useParams();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    room_number: '',
    type: '',
    cap: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddRoom = () => {
    axios.post(`http://localhost:5000/api/supervising_system/room?building_id=${id}`, roomData,{

    headers: {
      token:  token
  }
    })
      .then(response => {
        console.log(response.data.message);
        navigate(`/building`); // Redirect the user to the building page after adding the room
      })
      .catch(error => console.error('Error adding room:', error));
  };

  return (
    <div className="add-room-container">
      <h2>إضافة غرفة جديدة</h2>
      
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <label htmlFor="room_number">رقم الغرفة:</label>
        <input type="text" id="room_number" name="room_number" value={roomData.room_number} onChange={handleInputChange} required />

        <label htmlFor="type">النوع:</label>
        <input type="text" id="type" name="type" value={roomData.type} onChange={handleInputChange} required />

        <label htmlFor="cap">السعة:</label>
        <input type="text" id="cap" name="cap" value={roomData.cap} onChange={handleInputChange} required />

        <button type="button" onClick={handleAddRoom}>إضافة الغرفة</button>
        <div className="cancel-button">
          <Link to="/building">الغاء</Link>
        </div>
      </form>
    </div>
  );
};

export default AddRoomPage;

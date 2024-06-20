// Import necessary libraries and styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

import './updateroom.css'; // Import the CSS file
const token =localStorage.getItem("tkn");
const UpdateRoomPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState({
    room_number: '',
    type: '',
    cap: '',
    status: '',
  });

  useEffect(() => {
    // Retrieve room details based on room ID
    axios.get(`http://localhost:5000/api/supervising_system/rooms/?room_id=${id}`,{

    headers: {
      token:  token
  }
    })
      .then(response => {
        setRoomData(response.data.room);
      })
      .catch(error => console.error('Error retrieving room details:', error));
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateRoom = () => {
    axios.put(`http://localhost:5000/api/supervising_system/rooms?id=${id}`, roomData,{

    headers: {
      token:  token
  }
    })
      .then(response => {
        console.log(response.data.message);
        navigate('/building'); // التوجيه إلى صفحة الإدارة بعد حفظ البيانات
      })
      .catch(error => console.error('Error updating room:', error));
  };

  return (
    <div className="update-room-container">
      <h2>تحديث بيانات الغرفة</h2>
      <form onSubmit={(e) => { e.preventDefault(); }}>
        <label htmlFor="room_number">رقم الغرفة:</label>
        <input type="text" id="room_number" name="room_number" value={roomData.room_number} onChange={handleInputChange} required />

        <label htmlFor="type">النوع:</label>
        <input type="text" id="type" name="type" value={roomData.type} onChange={handleInputChange} required />

        <label htmlFor="cap">السعة:</label>
        <input type="text" id="cap" name="cap" value={roomData.cap} onChange={handleInputChange} required />

        <label htmlFor="status">الحالة:</label>
        <input type="text" id="status" name="status" value={roomData.status} onChange={handleInputChange} required />

        <button onClick={handleUpdateRoom}>حفظ التغييرات</button>

        <div className="cancel-button">
          <Link to="/building">الغاء</Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateRoomPage;

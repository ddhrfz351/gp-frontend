import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './managebuilding.css';

const token = localStorage.getItem("tkn");

const BuildingPage = () => {
  const [maleBuildings, setMaleBuildings] = useState([]);
  const [femaleBuildings, setFemaleBuildings] = useState([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [roomsInBuilding, setRoomsInBuilding] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isRoomSelected, setIsRoomSelected] = useState(false);
  const [buildingName, setBuildingName] = useState('');
  const [buildingGender, setBuildingGender] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/supervising_system/building/male', {
      headers: {
        token: token
      }
    })
      .then(response => setMaleBuildings(response.data.buildings))
      .catch(error => console.error('Error retrieving male buildings:', error));

    axios.get('http://localhost:5000/api/supervising_system/building/female', {
      headers: {
        token: token
      }
    })
      .then(response => setFemaleBuildings(response.data.buildings))
      .catch(error => console.error('Error retrieving female buildings:', error));
  }, []);

  const handleBuildingSelect = (buildingId, gender) => {
    setSelectedBuildingId(buildingId);
    axios.get(`http://localhost:5000/api/supervising_system/room/?building_id=${buildingId}`, {
      headers: {
        token: token
      }
    })
      .then(response => {
        setSelectedBuilding({ id: buildingId, gender, name: response.data.buildingName });
        setRoomsInBuilding(response.data.rooms);
        setSelectedRoom(null);
        setIsRoomSelected(false);
      })
      .catch(error => console.error('Error retrieving rooms:', error));
  };

  const addBuilding = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/supervising_system/building',
        {
          name: buildingName,
          gender: buildingGender,
        },
        {
          headers: {
            token: token
          }
        }
      );

      console.log(response.data.message);

      if (buildingGender === 'ذكر') {
        setMaleBuildings(prevBuildings => [...prevBuildings, { id: response.data.id, name: buildingName }]);
      } else if (buildingGender === 'انثي') {
        setFemaleBuildings(prevBuildings => [...prevBuildings, { id: response.data.id, name: buildingName }]);
      }

      // Clear the form fields
      setBuildingName('');
      setBuildingGender('');
    } catch (error) {
      console.error('Error adding building:', error);
    }
  };

  const handleRoomDetails = (roomId) => {
    axios.get(`http://localhost:5000/api/supervising_system/rooms/?room_id=${roomId}`, {
      headers: {
        token: token
      }
    })
      .then(response => {
        setSelectedRoom(response.data.room);
        setIsRoomSelected(true);
      })
      .catch(error => console.error('Error retrieving room details:', error));
  };

  return (
    <div className="building-page-container">
      <nav id="sidebar" className="col-md-2 col-lg-2 d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <div className='buildings'>
            <button className='adduni'>مباني الذكور</button>
            <ul>
              {maleBuildings.map(building => (
                <li key={building.id} onClick={() => handleBuildingSelect(building.id, 'male')}>
                  {building.name}
                </li>
              ))}
            </ul>

            <button className='adduni'>مباني الإناث</button>
            <ul>
              {femaleBuildings.map(building => (
                <li key={building.id} onClick={() => handleBuildingSelect(building.id, 'female')}>
                  {building.name}
                </li>
              ))}
            </ul>

            <div>
              <button className='adduni'>إضافة مبنى</button>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addBuilding();
                }}
              >
                <label htmlFor="buildingName">اسم المبنى:</label>
                <input
                  className='form-control'
                  type="text"
                  id="buildingName"
                  name="buildingName"
                  value={buildingName}
                  onChange={(e) => setBuildingName(e.target.value)}
                  required
                />

                <label htmlFor="buildingGender">نوع المبنى:</label>
                <select
                  className='form-control'
                  id="buildingGender"
                  name="buildingGender"
                  value={buildingGender}
                  onChange={(e) => setBuildingGender(e.target.value)}
                  required
                >
                  <option value="">اختر .</option>
                  <option value="ذكر">ذكور</option>
                  <option value="انثي">اناث</option>
                </select>

                <button type="submit" className='btn btn main-bg-color text-white'>إضافة</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="building-main-content">
        <Link to={`/addroom/${selectedBuildingId}`} className="btn btn main-bg-color text-white">
          إضافة غرفة جديدة
        </Link>

        {selectedBuilding && (
          <div>
            <h3>{selectedBuilding.gender === 'male' ? 'مبنى ذكر' : 'مبنى أنثى'}: {selectedBuilding.name}</h3>

            {roomsInBuilding.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>رقم الغرفة</th>
                    <th>تفاصيل</th>
                    <th>تعديل</th>
                  </tr>
                </thead>
                <tbody>
                  {roomsInBuilding.map(room => (
                    <tr key={room.id}>
                      <td>{room.room_number}</td>
                      <td>
                        <button className='btn btn main-bg-color text-white' onClick={() => handleRoomDetails(room.id)}>تفاصيل</button>
                      </td>
                      <td>
                        <Link
                          to={`/updateroom/${room.id}`}
                          className="btn btn main-bg-color text-white"
                        >
                          تعديل
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No rooms available in this building.</p>
            )}

            {isRoomSelected && (
              <div>
                <h4>تفاصيل الغرفة: {selectedRoom.room_number}</h4>
                <p>النوع: {selectedRoom.type}</p>
                <p>السعة: {selectedRoom.cap}</p>
                <p>الحالة: {selectedRoom.status}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildingPage;

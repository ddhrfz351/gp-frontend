import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import './report.css';

const Report = () => {
  const [userData, setUserData] = useState({});
  const [mealData, setMealData] = useState({});
  const [roomData, setRoomData] = useState({});
  const [universityId, setUniversityId] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [periodData, setPeriodData] = useState({});
  const [newUsersCount, setNewUsersCount] = useState(0);
  const [oldUsersCount, setOldUsersCount] = useState(0);
  const [availableRoomsCount, setAvailableRoomsCount] = useState(0);
  const [unavailableRoomsCount, setUnavailableRoomsCount] = useState(0);
  const [usersWithoutMealCount, setUsersWithoutMealCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:5000/api/report/Year');
        const mealsRes = await axios.get('http://localhost:5000/api/report/mealsofyear');
        const roomsRes = await axios.get(`http://localhost:5000/api/report/studentNunber?university_id=${universityId}`);

        setUserData(usersRes.data);
        setMealData(mealsRes.data);
        setRoomData(roomsRes.data);
      } catch (error) {
        console.error('An error occurred while fetching data:', error);
      }
    };

    fetchData();
  }, [universityId]);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      try {
        const newUsersRes = await axios.get(`http://localhost:5000/api/report/appReqestNew?year=${userData.year}`);
        setNewUsersCount(newUsersRes.data.NumberOfApplcatoins);

        const oldUsersRes = await axios.get(`http://localhost:5000/api/report/appReqestOld?year=${userData.year}`);
        setOldUsersCount(oldUsersRes.data.NumberOfApplcatoins);

        const availableRoomsRes = await axios.get('http://localhost:5000/api/report/NumberOfAvailbleRooms');
        setAvailableRoomsCount(availableRoomsRes.data.availbleRooms);

        const unavailableRoomsRes = await axios.get('http://localhost:5000/api/report/NumberOfUnavailbleRooms');
        setUnavailableRoomsCount(unavailableRoomsRes.data.availbleRooms);

        const usersWithoutMealRes = await axios.get(`http://localhost:5000/api/report/Day?day=${moment().format('YYYY-MM-DD')}`);
        setUsersWithoutMealCount(usersWithoutMealRes.data.userCount);
      } catch (error) {
        console.error('An error occurred while fetching additional data:', error);
      }
    };

    if (userData.year) {
      fetchAdditionalData();
    }
  }, [userData.year]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">لوحة التقارير</h1>
      <div className="form-group">
        <label>اختر الجامعة:</label>
        <select className="form-control" value={universityId} onChange={(e) => setUniversityId(e.target.value)}>
          <option value="1">جامعة حلوان</option>
          <option value="2">جامعة حلوان الأهلية</option>
          {/* Add other options as needed */}
        </select>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد المستخدمين الذين حصلوا على وجبات خلال السنة</h2>
              <p className="card-text">السنة: {userData.year}</p>
              <p className="card-text">عدد المستخدمين: {userData.userCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد الوجبات حسب السنة</h2>
              <p className="card-text">السنة: {mealData.year}</p>
              <p className="card-text">عدد الوجبات: {mealData.mealCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد الطلاب الذين يمتلكون غرف</h2>
              <p className="card-text">عدد الطلاب: {roomData.usersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد المستخدمين الجدد</h2>
              <p className="card-text">عدد المستخدمين الجدد: {newUsersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد المستخدمين القدامى</h2>
              <p className="card-text">عدد المستخدمين القدامى: {oldUsersCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد الغرف المتاحة</h2>
              <p className="card-text">عدد الغرف المتاحة: {availableRoomsCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">عدد الغرف غير المتاحة</h2>
              <p className="card-text">عدد الغرف غير المتاحة: {unavailableRoomsCount}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">      عدد المستخدمين اللي حصلوا علي وجبات خلال يوم </h2>
              <p className="card-text">عدد المستخدمين: {usersWithoutMealCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
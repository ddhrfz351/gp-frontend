import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const token = localStorage.getItem("tkn");
  const currentYear = new Date().getFullYear(); // العام الحالي

  const getAppointment = async (universityName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/GetAppointment?universityName=${selectedUniversity}`, {
        headers: {
          token: token
        }
      });
      console.log(response);
      setAppointments(response.data.appointments);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.errorMessage) {
        alert("حدث خطأ: " + error.response.data.errorMessage);
      } else {
        alert("حدث خطأ غير معروف");
      }
    }
  };

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

  const handleShowAppointments = () => {
    if (selectedUniversity) {
      getAppointment(selectedUniversity);
    }
  };

  return (
    <>
      <div className="container mt-5 mx-5 mb-2">
        <div >
          <FontAwesomeIcon icon={faHandPointLeft} className='icon' />
          <p className=' w-50 ' style={{ display: 'inline' }}>
            قم باختيار الجامعة لعرض المواعيد الخاصة بها لعام {currentYear-1}/{currentYear}
          </p>
        </div>
        <div className="d-flex">
          <select
            className="form-select w-50 mt-2"
            id="university"
            name="university"
            value={selectedUniversity}
            onChange={handleUniversityChange}
          >
            <option value="">اختر جامعة</option>
            <option value="حلوان">جامعة حلوان</option>
            <option value="حلوان الاهلية">جامعة حلوان الأهلية</option>
          </select>
          <button
            className='btn btn main-bg-color text-white mx-2'
            onClick={handleShowAppointments}
          >
            عرض المواعيد
          </button>
        </div>
        {appointments.length === 0 ? (
          <p className='remember'>  </p>
        ) : (
          <table className='table'>
            <thead>
              <tr>
                <th>تاريخ بدء التقديم</th>
                <th>تاريخ انتهاء التقديم</th>
                <th>الفئة</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.start_date}</td>
                  <td>{appointment.end_date}</td>
                  <td>{appointment.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';

const AdmissionStatusPage = () => {
  const [nationalId, setNationalId] = useState('');
  const [admissionStatus, setAdmissionStatus] = useState('');
  const [universityName, setUniversityName] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [error, setError] = useState('');

  const checkAdmissionStatus = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/student/', {
        params: {
          national_id: nationalId,
        },
      });

      const data = response.data;

      if (response.status === 200) {
        setAdmissionStatus(data.admissionStatus);
        setUniversityName(data.university_name);
        setName(data.name);
        setCollege(data.college);
        setError('');
      } else {
        setAdmissionStatus('');
        setUniversityName('');
        setName('');
        setCollege('');
        setError(data.error || 'حدث خطأ أثناء استرجاع حالة القبول.');
      }
    } catch (error) {
      setAdmissionStatus('');
      setUniversityName('');
      setName('');
      setCollege('');
      setError('حدث خطأ أثناء الاتصال بالخادم.');
    }
  };

  return (
    <div className="container mt-5 mx-5 mb-2">
      <FontAwesomeIcon icon={faHandPointLeft} className='icon' />
      <p>قم بإدخال الرقم القومي لعام 2023 2024</p>
      <div className='d-flex'>
        <input
          className='form-control w-50 '
          type="text"
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <button
         className='btn btn main-bg-color text-white mx-2' 
         onClick={checkAdmissionStatus}
         type='button'
        >استعلام</button>
      </div>

      {admissionStatus && (
        <div className="mt-4">
          <h6>البيانات:</h6>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <td>الحالة:</td>
                <td>{admissionStatus}</td>
              </tr>
              <tr>
                <td>اسم الجامعة:</td>
                <td>{universityName}</td>
              </tr>
              <tr>
                <td>الاسم:</td>
                <td>{name}</td>
              </tr>
              <tr>
                <td>اسم الكلية:</td>
                <td>{college}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AdmissionStatusPage;

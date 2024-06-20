import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css';

export default function HousingFeesPage() {
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [housingFees, setHousingFees] = useState([]);
  const [error, setError] = useState('');
  const currentYear = new Date().getFullYear(); // العام الحالي

  const getHousingFees = async (universityName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/HousingFee?universityName=${universityName}`);
      console.log(response);
      setHousingFees(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching housing fees:', error);
      setError('حدث خطأ أثناء جلب المصاريف.');
    }
  };

  const handleUniversityChange = (event) => {
    setSelectedUniversity(event.target.value);
  };

  const handleShowHousingFees = () => {
    if (selectedUniversity) {
      getHousingFees(selectedUniversity);
    }
  };

  return (
    <>
      <div className="container mt-5 mx-5 mb-2">
        <div >
          <FontAwesomeIcon icon={faHandPointLeft} className='icon' />
          <p className=' w-50 ' style={{ display: 'inline' }}>
            قم باختيار الجامعة لعرض المصاريف السكنية الخاصة بها للعام الدراسي {currentYear-1}/{currentYear}
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
            <option value="حلوان ">جامعة حلوان</option>
            <option value="حلوان الاهلية">جامعة حلوان الأهلية</option>
          </select>
          <button
            className='btn btn main-bg-color text-white mx-2'
            onClick={handleShowHousingFees}
          >
            عرض المصاريف
          </button>
        </div>
        {error && (
          <div className="alert alert-danger mt-3">
            {error}
          </div>
        )}
        {housingFees.length > 0 ? (
          <table className='table mt-3'>
            <thead>
              <tr>
                <th>نوع السكن</th>
                <th>المصاريف</th>
                <th>التغذية</th>
               
              </tr>
            </thead>
            <tbody>
              {housingFees.map((fee, index) => (
                <tr key={index}>
                  <td>{fee.housing_type}</td>
                  <td>{fee.fees}</td>
                  <td>{fee.feeding}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='remember mt-3'>لا توجد مصاريف مسجلة لهذه الجامعة.</p>
        )}
      </div>
    </>
  );
}

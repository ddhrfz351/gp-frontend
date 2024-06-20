import React, { useState } from 'react';
import './instruction.css';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function InstructionPage() {
  const [selectedOption, setSelectedOption] = useState('');
  const [guidelines, setGuidelines] = useState('');
  const [responseDetails, setResponseDetails] = useState(null);
  const [error, setError] = useState('');
  const [currentAcademicYear, setCurrentAcademicYear] = useState(new Date().getFullYear()); // Get current year

  const handleButtonClick = async () => {
    try {
      if (!selectedOption) {
        setError('يجب تقديم اسم الجامعة.');
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/student/guidelines?name=${selectedOption}`);
      console.log(response); // Log the entire response to the console
      setResponseDetails(response.data);
      setGuidelines(response.data.guidelines);
      setError('');
    } catch (error) {
      console.error('Error fetching guidelines:', error);
      setResponseDetails(error.response); // Log the error response to the console
      setError('حدث خطأ أثناء جلب التعليمات.');
      // Handle error as needed
    }
  };

  return (
    <>
      <div className="container mt-5 mx-5 mb-2">
        {/* Other elements */}
        <FontAwesomeIcon icon={faHandPointLeft} className='icon' />
        <p >قم باختيار الجامعه لعرض التعليمات الخاصه بها للعام الدراسي {currentAcademicYear - 1}/{currentAcademicYear}</p>

        <div className="list">
          <select
            className='form-control w-50 '
            value={selectedOption}
            onChange={(e) => {
              const selectedOption = e.target.value;
              setSelectedOption(selectedOption);
            }}
          >
            <option value="">اختر الجامعه</option>
            <option value="حلوان">حلوان</option>
            <option value="حلوان الاهلية">حلوان الاهلية</option>
            {/* Add other universities as needed */}
          </select>

          <button onClick={handleButtonClick} className='btn btn main-bg-color text-white mx-2'>
            عرض
          </button>
        </div>

        {error && <div className='error'>{error}</div>}

        <div className="row">
          <div className='contentofuni col'>
            {/* Display guidelines here */}
            <h3>التعليمات:</h3>
            <pre className='text-break'>{guidelines && guidelines.guidelines}</pre>
          </div>
        </div>

        {/* Display response details in the UI */}
        {responseDetails && (
          <div className='response-details'>
            {/* <h3>Response Details:</h3>
            <pre>{JSON.stringify(responseDetails, null, 2)}</pre> */}
          </div>
        )}
      </div>
    </>
  );
}

export default InstructionPage;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './guidepage.css';  // Uncomment this line if you have a CSS file

export default function Guidelines_hu() {
  const location = useLocation();
  const [universityName, setUniversityName] = useState('حلوان'); // Default university name
  const [guidelines, setGuidelines] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const token = localStorage.getItem("tkn");

  useEffect(() => {
    fetchGuidelines();
  }, [universityName]);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/guidelines/?name=${universityName}`, {
        headers: {
          token: token
        }
      });

      const data = response.data.guidelines;
      if (typeof data === 'object' && data !== null) {
        setGuidelines(data.guidelines || ''); // Extract the guidelines property if it's an object
      } else {
        setGuidelines(data || ''); // Otherwise, treat data as a string
      }
    } catch (error) {
      console.log("Error fetching guidelines:", error);
    }
  };

  const handleEditClick = (selectedUniversity) => {
    setIsFormVisible(true);
    setUniversityName(selectedUniversity);
    setIsEditing(true); // Set editing mode to true when user clicks edit button
  };

  const handleSaveClick = async () => {
    try {
      await axios.post(`http://localhost:5000/api/admin/guidelines?universityName=${universityName}`, { guidelines }, {
        headers: {
          token: token,
          'Content-Type': 'application/json' // Add Content-Type header
        }
      });

      fetchGuidelines();
      setIsFormVisible(false);
      setIsEditing(false); // Set editing mode back to false after save
      console.log("تم حفظ الإرشادات بنجاح");

    } catch (error) {
      console.log("حدث خطأ أثناء حفظ الإرشادات:", error);
    }
  };

  const handleUniversityChange = (selectedUniversity) => {
    setUniversityName(selectedUniversity);
  };

  const handleGuidelinesChange = (e) => {
    setGuidelines(e.target.value);
  };

  return (
    <div className='main-container clearfix mb-5'>
      <nav id="sidebar" className="col-md-3 col-lg-2 col-sm-4 d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
          <h3 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-2 ">
            اختر الجامعه
          </h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button className="adduni" onClick={() => handleUniversityChange('حلوان')}>
                حلوان
              </button>
            </li>
            <li className="nav-item">
              <button className="adduni" onClick={() => handleUniversityChange('حلوان الاهلية')}>
                حلوان الأهلية
              </button>
              {/* يمكنك إضافة المزيد من الجامعات حسب الحاجة */}
            </li>
          </ul>
        </div>
      </nav>

      <div className='body-hu w-75 '>
        <h3>إرشادات التقديم لجامعة {universityName}</h3>
        <pre className="pre">{guidelines}</pre>

        {!isEditing && ( // Display textarea and save button only if not in editing mode
          <button className="btn btn main-bg-color text-white" onClick={() => handleEditClick(universityName)}>تعديل الإرشادات</button>
        )}

        {isFormVisible && (
          <div>
            <textarea
              className="form-control"
              value={guidelines}
              onChange={handleGuidelinesChange}
              placeholder="إرشادات التقديم"
            />
            <button className="btn btn main-bg-color text-white" onClick={handleSaveClick}>حفظ</button>
          </div>
        )}
      </div>
    </div>
  );
}

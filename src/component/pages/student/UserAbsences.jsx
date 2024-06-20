import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './userabsence.css'; // استيراد ملف التنسيقات

const UserAbsencesPage = () => {
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const token = localStorage.getItem('tkn');
        if (!token) {
          setError('Token not found. Please log in.');
          return;
        }
        
        const response = await axios.get('http://localhost:5000/api/student/Absence', {
          headers: {
            token: token
          }
        });
        setAbsences(response.data.data.absences);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user absences:', error);
        setError(error.response ? error.response.data.message : 'Error fetching user absences. Please try again later.');
        setLoading(false);
      }
    };

    fetchAbsences();
  }, []);

  return (
    <div className="user-absences-container">
      <h1>الجزاءات</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <table className="absences-table">
          <thead>
            <tr>
              <th>رقم الجزاء</th>
              <th>السبب</th>
              <th>النوع</th>
            </tr>
          </thead>
          <tbody>
            {absences.map(absence => (
              <tr key={absence.id}>
                <td>{absence.id}</td>
                <td>{absence.absence_reason}</td>
                <td>{absence.absence_type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserAbsencesPage;

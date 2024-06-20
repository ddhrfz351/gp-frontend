import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem("tkn");

export default function Meals() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(''); // حالة لإدارة الخطأ
  const id = ''; // Ensure this ID is set appropriately

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/meals/?id=${id}`, {
        headers: {
          token: token
        }
      });
      if (Array.isArray(response.data.users)) {
        setUsers(response.data.users);
        setError(''); // إعادة تعيين الخطأ إذا تم الجلب بنجاح
      } else {
        setError('تنسيق بيانات الطلاب غير صالح');
      }
    } catch (error) {
      setError(`حدث خطأ في جلب البيانات: ${error.message}`);
    }
  };

  const handleDelivery = async (userId) => {
    try {
      await axios.post("http://localhost:5000/api/meals", {
        user_id: userId 
      }, {
        headers: {
          token: token
        }
      });
      // Update the state to remove the user who received the meal
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      setError(''); // إعادة تعيين الخطأ إذا تم التحديث بنجاح
    } catch (error) {
      setError(`حدث خطأ في تحديث البيانات: ${error.message}`);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h1>تسلم الوجبات ليوم {getCurrentDate()}</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* عرض رسالة الخطأ إذا كانت موجودة */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="ابحث بالاسم"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table className="tableA table table-striped">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>حالة الاستلام</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(filteredUsers) && filteredUsers.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => handleDelivery(student.id)} 
                >
                  تم التسليم
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

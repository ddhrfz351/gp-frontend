import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import "./penalty.css";

const token = localStorage.getItem("tkn");

const Penalty = () => {
  const [penalties, setPenalties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchPenalties();
  }, []);

  const fetchPenalties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/retribution", {
        headers: {
          token: token
        }
      });
      setPenalties(response.data.penalties);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/retribution?id=${id}`, {
        headers: {
          token: token
        }
      });
      setPenalties(prevPenalties => prevPenalties.filter(penalty => penalty.id !== id));
      console.log('Penalty deleted successfully');
    } catch (error) {
      console.error('Error deleting penalty:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPenalties = penalties.filter((penalty) =>
    penalty.name.includes(searchQuery)
  );

  return (
    <div className='container mt-5'>
      <h3 className='mb-3'>الجزاءات</h3>

      <div className="search-container mb-2">
        <input
          type="text"
          className="form-control"
          placeholder="ابحث بالاسم"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>رقم الجزاء</th>
            <th>رقم المستخدم</th>
            <th>الاسم</th>
            <th>الجزاء</th>
            <th>السبب</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredPenalties.map((penalty) => (
            <tr key={penalty.id}>
              <td>{penalty.id}</td>
              <td>{penalty.user_id}</td>
              <td>{penalty.name}</td>
              <td>{penalty.absence_type}</td>
              <td>{penalty.absence_reason}</td>
              <td>{new Date(penalty.absence_date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(penalty.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Penalty;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';

const token = localStorage.getItem("tkn");

const ManagePenalties = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/housing/UsersHaveRooms", {
        headers: {
          token: token
        }
      });
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.includes(searchQuery)
  );

  return (
    <div className='container mt-5'>
      <h3 className='mb-2'>إدارة الجزاءات</h3>

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
            <th>الرقم</th>
            <th>الاسم</th>
            <th>البريد الإلكتروني</th>
            <th>الرقم الوطني</th>
            <th> رقم الغرفه</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.national_id}</td>
              <td>{user.room_id}</td>
              <td>
                <Link
                  to={`/add-penalty/${user.id}/${user.name}`}
                  className="btn btn main-bg-color text-white"
                >
                  إضافة جزاء جديد +
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ManagePenalties;
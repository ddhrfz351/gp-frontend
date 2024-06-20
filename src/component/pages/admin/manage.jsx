import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import axios from "axios";

const token = localStorage.getItem("tkn");

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("0");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsersByRole();
  }, [selectedRole, searchQuery]);

  const fetchUsersByRole = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/admin/get/${selectedRole}`,
        {
          headers: {
            token: token,
          },
        }
      );
      let filteredUsers = response.data.users;
  
      if (searchQuery) {
        filteredUsers = filteredUsers.filter((user) =>
          user.national_id.includes(searchQuery)
        );
      }
  
      setUsers(filteredUsers);
    } catch (error) {
      console.error("Error fetching users by role:", error);
    }
  };

  const blockUser = async (nationalId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/block/${nationalId}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      fetchUsersByRole();
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (nationalId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/unblock/${nationalId}`,
        {},
        {
          headers: {
            token: token,
          },
        }
      );
      fetchUsersByRole();
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container">
      <div className="manage-movies p-5">
        <div className="header d-flex justify-content-between mb-5">
          <h3 className="text-center">إدارة المستخدمين</h3>
          <Link
            to={"/adduser"}
            className="btn btn main-bg-color text-white"
          >
            إضافة مستخدم جديد +
          </Link>
        </div>

        <label htmlFor="roleSelect">اختر الدور:</label>
        <select
          className="form-control mb-2 w-25"
          id="roleSelect"
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
        >
          <option value="0">طالب</option>
          <option value="1">موظف</option>
          <option value="2">ادمن</option>
          <option value="3">موظف المطعم</option>
        </select>

        <div className="search-container mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث بالرقم القومي"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        <div className="row">
          <div className="col table-responsive">
            <Table className="table table-striped" responsive="sm">
              <thead>
                <tr>
                  <th>الرقم</th>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>الرقم القومي</th>
                  <th>محظور</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.national_id}</td>
                    <td>{user.blocked ? "نعم" : "لا"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => blockUser(user.national_id)}
                      >
                        حظر
                      </button>

                      <button
                        className="btn btn-sm btn-success mx-2"
                        onClick={() => unblockUser(user.national_id)}
                      >
                        رفع الحظر
                      </button>

                      <Link
                        to={{
                          pathname: `/updateuser/${user.national_id}`,
                          state: { user }
                        }}
                        className="btn btn main-bg-color text-white"
                      >
                        تعديل
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;

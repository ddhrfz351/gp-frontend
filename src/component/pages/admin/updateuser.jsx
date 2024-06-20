import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const token = localStorage.getItem("tkn");

const UpdateUserPage = () => {
  const { national_id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // استخدم useNavigate للتنقل بدلاً من useHistory
  const [user, setUser] = useState({
    national_id: '',
    password: '',
    name: '',
    role: '',
    err: '',
    success: null,
  });
  const [selectedRole, setSelectedRole] = useState('');

  useEffect(() => {
    if (location.state && location.state.user) {
      setUser(location.state.user);
      setSelectedRole(location.state.user.role); // تعيين الدور المحدد من بيانات المستخدم
    } else {
      // إذا لم تتم إعادة توجيه بيانات المستخدم من خلال العنوان، فاجلبها من الواجهة البرمجية
      fetchUserDetails();
    }
  }, [location.state]);

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/get/${national_id}`, {
        headers: {
          token: token,
        },
      });
      setUser(response.data.user);
      setSelectedRole(response.data.user.role);
    } catch (error) {
      console.error('خطأ في جلب تفاصيل المستخدم:', error);
      setUser({ ...user, err: 'حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا!' });
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/admin/update/${national_id}`,
        { ...user, role: selectedRole },
        {
          headers: {
            token: token,
          },
        }
      );

      setUser({
        ...user,
        success: 'تم تحديث المستخدم بنجاح!',
        err: null,
      });

      // إعادة التوجيه إلى صفحة الإدارة بعد التحديث
      navigate('/manage');
    } catch (error) {
      setUser({
        ...user,
        success: null,
        err: 'حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا!',
      });
    }
  };

  return (
    <div className="container mt-4">
      <h3>تحديث المستخدم</h3>

      {user.err && (
        <Alert variant="danger" className="p-2">
          {user.err}
        </Alert>
      )}

      {user.success && (
        <Alert variant="success" className="p-2">
          {user.success}
        </Alert>
      )}

      <Form onSubmit={updateUser}>
        <Form.Group className="mb-3">
          <Form.Control
            value={user.national_id}
            onChange={(e) => setUser({ ...user, national_id: e.target.value })}
            type="text"
            placeholder=" الرقم القومي"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="كلمة المرور"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            placeholder="اسم المستخدم"
          />
        </Form.Group>

        <label htmlFor="roleSelect">اختر الدور:</label>
        <select
          className="form-control mb-2 w-25"
          id="roleSelect"
          onChange={(e) => setSelectedRole(e.target.value)}
          value={selectedRole}
        >
          <option value="0">طالب</option>
          <option value="1">موظف</option>
        </select>

        <Button className="btn btn main-bg-color text-white" variant="info" type="submit">
          تحديث المستخدم
        </Button>
      </Form>
    </div>
  );
};

export default UpdateUserPage;

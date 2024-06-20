import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

const token = localStorage.getItem("tkn");

const AddUserPage = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
    role: 'كطال', // قيمة افتراضية للدور
    national_id: '',
    err: '',
    success: null,
  });

  const addUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/admin/', user, {
        headers: {
          token: token
        }
      });

      setUser({
        email: '',
        password: '',
        name: '',
        role: 'كطال', // إعادة تعيين قيمة الدور بعد الإرسال
        national_id: '',
        err: null,
        success: 'تم إنشاء المستخدم بنجاح!',
      });
      window.location.href = '/manage';
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setUser({
          ...user,
          success: null,
          err: error.response.data.error,
        });
      } else {
        setUser({
          ...user,
          success: null,
          err: 'حدث خطأ ما، يرجى المحاولة مرة أخرى لاحقًا!',
        });
      }
    }
  };

  return (
    <div className="container mt-4">
      <h3>إضافة مستخدم جديد</h3>


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

      <Form onSubmit={addUser}>

        <Form.Group className="mb-3">
          <Form.Control
            className='w-50'
            value={user.national_id}
            onChange={(e) => setUser({ ...user, national_id: e.target.value })}
            type="text"
            required
            placeholder="الرقم القومي"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            className='w-50'
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            required
            placeholder="بريد المستخدم"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            className='w-50'
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            required
            placeholder="كلمة المرور"
          />
        </Form.Group>

        <Form.Group className="mb-3 ">
          <Form.Control
            value={user.name}
            className='w-50'
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            type="text"
            required
            placeholder="اسم المستخدم"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <h4>:اختر الدور</h4>
          <Form.Control
            className='w-50'
            as="select"
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            required
          >
            <option value="0">طالب</option>
            <option value="1">موظف</option>
            <option value="2">ادمن</option>
            <option value="3">موظف المطعم</option>
          </Form.Control>
        </Form.Group>


        <Button className="btn btn main-bg-color text-white " variant="info" type="submit">
          إضافة مستخدم جديد
        </Button>
      </Form>
    </div>
  );
};

export default AddUserPage;
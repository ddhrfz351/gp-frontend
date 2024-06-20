import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
const token =localStorage.getItem("tkn");
const BlockUserPage = () => {
  const [nationalId, setNationalId] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState(null);

  const blockUser = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/block/${nationalId}`,{

      headers: {
        token:  token
    }
      });
      
      setNationalId('');
      setErr('');
      setSuccess('User Blocked Successfully!');
    } catch (error) {
      setSuccess(null);
      setErr('Something went wrong, please try again later!');
    }
  };

  return (
    <div className="container mt-4">
      <h1>Block User</h1>

      {err && (
        <Alert variant="danger" className="p-2">
          {err}
        </Alert>
      )}

      {success && (
        <Alert variant="success" className="p-2">
          {success}
        </Alert>
      )}

      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
            type="text"
            required
            placeholder="User National ID"
          />
        </Form.Group>

        <Button className="btn btn-dark w-100" variant="danger" onClick={blockUser}>
          Block User
        </Button>
      </Form>
    </div>
  );
};

export default BlockUserPage;

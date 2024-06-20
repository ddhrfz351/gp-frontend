import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("tkn");
    const userRole = localStorage.getItem("role");

    if (!isLoggedIn || !userRole) {
      navigate('/signin');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AuthenticatedRoute;

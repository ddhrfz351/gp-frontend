// Inside AppointmentA.js
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AppointmentA.css';
import Navbar from '../Navbar/Navbar';


export default function AppointmentA() {
  return (
    <>
    <Navbar/>
      <div className='f-bar'>
        <div className='adduni'><h3>اختر الجامعة</h3></div>
      </div>
      <div className='sidebar'>
        {/* Pass universityName as a query parameter */}
        <Link to='/Appointment_hu?universityName=حلوان'>
          <a href="/Appointment_hu"><i className="fa-solid fa-building-columns"></i> جامعة حلوان</a>
        </Link>
        {/* Pass a different universityName for the second university */}
        <Link to='/Appointment_hu?universityName=حلوان الاهلية'>
          <a href="/Appointment_hu"><i className="fa-solid fa-building-un"></i> جامعة حلوان الأهلية</a>
        </Link>
        
      </div>

      <Outlet />
    </>
  );
}

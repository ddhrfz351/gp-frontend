import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from "../../../images/logo 3 copy.png";

export default function Navbar() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Check local storage for token and role
    const storedToken = localStorage.getItem("tkn");
    const storedRole = localStorage.getItem("role");

    if (storedToken !== null) {
      setToken(storedToken);
    }

    if (storedRole !== null) {
      setRole(storedRole);
    }
  }, []);

  const logout = () => {
    // Clear local storage
    localStorage.removeItem("tkn");
    localStorage.removeItem("role");

    
     window.location.href = "/signin";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar main-bg-color bg-main-bg-color">
      <div className="container">
        <button className="navbar-toggler gold" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse gold" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Conditionally render links based on token and user role */}
            {token !== null && role !== null && role === '0' && (
              <>
              
              <li className="nav-item">
                  <Link className="nav-link" to="/StudentProfile">  بيان حاله</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/EditJoinRequest">تعديل طلب الالتحاق</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/appointment">مواعيد التقدم</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/JoinRequest">تقديم طلب الالتحاق</Link>
                </li>
               
                <li className="nav-item">
                  <Link className="nav-link" to="/student/enquiry">الاستعلام عن القبول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/instruction">الارشادات</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/student/fees">المصاريف</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/student/userabsences">الجزاءات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/complanint">الشكوى</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/student/chatbot"> تواصل معنا</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>تسجيل الخروج</button>
                </li>
              </>
            )}
            {token !== null && role !== null && role === '1' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/requests">قبول الطلبات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Penalty">عرض الجزاءات </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/managepenalty">اداره الجزاءات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/housing">التسكين</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cities"> البلاد</Link>
                </li>
              
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>تسجيل الخروج</button>
                </li>
              </>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/appointment">مواعيد التقدم</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/JoinRequest">تقديم طلب الالتحاق</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/signin">تسجيل الدخول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/enquiry">الاستعلام عن القبول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/instruction">الارشادات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/student/fees">المصاريف</Link>
                </li> 
                
         
                <li className="nav-item">
                  <Link className="nav-link" to="/student/chatbot"> تواصل معنا</Link>
                </li>
              </>
            )}
            {/* Role 2 links */}
            {token !== null && role !== null && role === '2' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage">اداره المستخدمين</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/requests">قبول الطلبات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Appointment_hu">اداره  مواعيد</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/Penalty">عرض الجزاءات </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/managepenalty">اداره الجزاءات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Guidelines_hu">اداره الارشادات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/housingFees">اداره المصاريف</Link>
                </li>
              
                <li className="nav-item">
                  <Link className="nav-link" to="/housing">التسكين</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/building">المباني</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/complanints">الشكوى</Link>
                </li> 
                <li className="nav-item">
                  <Link className="nav-link" to="/report">التقارير</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cities"> البلاد</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>تسجيل الخروج</button>
                </li>
              </>
            )}
            {token !== null && role !== null && role === '3' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/meals">الوجبات</Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={logout}>تسجيل الخروج</button>
                </li>
              </>
            )}
          </ul>
          <Link className='navbar-brands' to='/'>
            <img src={logoImage} alt="" className='w-100 logo' />
          </Link>
        </div>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import './Requests.css';

export default function Requests() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [university, setUniversity] = useState('حلوان');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const token = localStorage.getItem('tkn');

  useEffect(() => {
    fetchData();
  }, [university, searchQuery]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/employee?name=${searchQuery}&university_name=${university}`,
        {
          headers: {
            token: token,
          },
        }
      );

      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
        setFilteredData(response.data.data);
      } else {
        console.error('تنسيق البيانات غير صحيح.');
        setError('تنسيق البيانات غير صحيح.');
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('حدث خطأ أثناء جلب البيانات.');
      setLoading(false);
    }
  };

  const handleStudentClick = (student) => {
    if (expandedRowId === student.id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(student.id);
    }
    setSelectedStudent(student);
  };

  const handleAccept = async () => {
    if (selectedStudent) {
      try {
        await axios.post(
          `http://localhost:5000/api/employee?id=${selectedStudent.id}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );
        fetchData();
      } catch (error) {
        console.error('حدث خطأ أثناء قبول الطالب.', error);
      }
    }
  };

  const handleReject = async () => {
    if (selectedStudent) {
      try {
        await axios.post(
          `http://localhost:5000/api/employee/reject?id=${selectedStudent.id}`,
          {},
          {
            headers: {
              token: token,
            },
          }
        );
        fetchData();
      } catch (error) {
        console.error('حدث خطأ أثناء رفض الطالب.', error);
      }
    }
  };

  const handleUniversityChange = (selectedUniversity) => {
    setUniversity(selectedUniversity);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.name.includes(searchQuery)
    );
    setFilteredData(filteredResults);
  }, [searchQuery, data]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  const getUniversityName = (universityId) => {
    const universityNames = {
      1: "جامعة حلوان",
      2: "الجامعة الأهلية"
    };
    return universityNames[universityId] || "جامعة غير معروفة";
  };

  const isNotEmpty = (value) => {
    return value !== null && value !== '';
  };

  return (
    <div>
      <nav
        id="sidebar"
        className="col-md-3 col-lg-2 col-sm-4 d-md-block bg-light sidebar"
      >
        <div className="sidebar-sticky">
          <h3 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-2">
            اختر الجامعة
          </h3>
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
                className="adduni"
                onClick={() => handleUniversityChange('حلوان')}
              >
                حلوان
              </button>
            </li>
            <li className="nav-item">
              <button
                className="adduni"
                onClick={() => handleUniversityChange('حلوان الاهلية')}
              >
                حلوان الأهلية
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="main-content clearfix pt-5">
        <h3>طلبات الالتحاق</h3>
        <div className="search-container mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="ابحث بالاسم"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        {loading && <p>جاري التحميل...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <table border="1" cellPadding="6" className="tableA">
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr
                      onClick={() => handleStudentClick(item)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                    </tr>
                    {expandedRowId === item.id && (
                      <tr>
                        <td colSpan="2">
                        <div className="custom-columns">
                          {isNotEmpty(selectedStudent.name) && <p className="mb-3"><span className="bold-label">اسم الطالب:</span> {selectedStudent.name}</p>}
                            {isNotEmpty(selectedStudent.student_type) && <p className="mb-3"><span className="bold-label">نوع الطالب:</span> {selectedStudent.student_type}</p>}
                            {isNotEmpty(selectedStudent.student_id) && <p className="mb-3"><span className="bold-label">رقم الطالب:</span> {selectedStudent.student_id}</p>}
                            {isNotEmpty(selectedStudent.university_id) && <p className="mb-3"><span className="bold-label">الجامعة:</span> {getUniversityName(selectedStudent.university_id)}</p>}
                            {isNotEmpty(selectedStudent.nationality) && <p className="mb-3"><span className="bold-label">الجنسية:</span> {selectedStudent.nationality}</p>}
                            {isNotEmpty(selectedStudent.national_id) && <p className="mb-3"><span className="bold-label">الرقم القومي:</span> {selectedStudent.national_id}</p>}
                            {isNotEmpty(selectedStudent.date_of_birth) && <p className="mb-3"><span className="bold-label">تاريخ الميلاد:</span> {formatDate(selectedStudent.date_of_birth)}</p>}
                            {selectedStudent.place_of_birth && (
                              <p className="mb-3">
                                <span className="bold-label">مكان الميلاد:</span> {selectedStudent.place_of_birth}
                              </p>
                            )}

                            {isNotEmpty(selectedStudent.gender) && <p className="mb-3"><span className="bold-label">النوع:</span> {selectedStudent.gender}</p>}
                            {isNotEmpty(selectedStudent.religion) && <p className="mb-3"><span className="bold-label">الديانة:</span> {selectedStudent.religion}</p>}
                            {isNotEmpty(selectedStudent.residence_address) && <p className="mb-3"><span className="bold-label">العنوان:</span> {selectedStudent.residence_address}</p>}
                            {isNotEmpty(selectedStudent.detailed_address) && <p className="mb-3"><span className="bold-label">العنوان بالتفصيل:</span> {selectedStudent.detailed_address}</p>}
                            {isNotEmpty(selectedStudent.email) && <p className="mb-3"><span className="bold-label">البريد الإلكتروني:</span> {selectedStudent.email}</p>}
                            {isNotEmpty(selectedStudent.mobile_number) && <p className="mb-3"><span className="bold-label">التليفون:</span> {selectedStudent.mobile_number}</p>}
                            {isNotEmpty(selectedStudent.father_national_id) && <p className="mb-3"><span className="bold-label">الرقم القومي للأب:</span> {selectedStudent.father_national_id}</p>}
                            {isNotEmpty(selectedStudent.father_name) && <p className="mb-3"><span className="bold-label">اسم الأب:</span> {selectedStudent.father_name}</p>}
                            {isNotEmpty(selectedStudent.father_occupation) && <p className="mb-3"><span className="bold-label">وظيفة الأب:</span> {selectedStudent.father_occupation}</p>}
                            {isNotEmpty(selectedStudent.father_phone_number) && <p className="mb-3"><span className="bold-label">تليفون الأب:</span> {selectedStudent.father_phone_number}</p>}
                            {isNotEmpty(selectedStudent.guardian_name) && <p className="mb-3"><span className="bold-label">اسم ولي الأمر:</span> {selectedStudent.guardian_name}</p>}
                            {isNotEmpty(selectedStudent.guardian_national_id) && <p className="mb-3"><span className="bold-label">الرقم القومي لولي الأمر:</span> {selectedStudent.guardian_national_id}</p>}
                            {isNotEmpty(selectedStudent.guardian_phone_number) && <p className="mb-3"><span className="bold-label">تليفون ولي الأمر:</span> {selectedStudent.guardian_phone_number}</p>}
                            {isNotEmpty(selectedStudent.parents_status) && <p className="mb-3"><span className="bold-label">حالة الوالدين:</span> {selectedStudent.parents_status}</p>}
                            {isNotEmpty(selectedStudent.college) && <p className="mb-3"><span className="bold-label">الكلية:</span> {selectedStudent.college}</p>}
                            {isNotEmpty(selectedStudent.level) && <p className="mb-3"><span className="bold-label">المستوى:</span> {selectedStudent.level}</p>}
                            {isNotEmpty(selectedStudent.previous_academic_year_gpa) && <p className="mb-3"><span className="bold-label">تقدير العام الماضي:</span> {selectedStudent.previous_academic_year_gpa}</p>}
                            {isNotEmpty(selectedStudent.status) && <p className="mb-3"><span className="bold-label">حالة الطلب:</span> {selectedStudent.status}</p>}
                            {isNotEmpty(selectedStudent.university_name) && <p className="mb-3"><span className="bold-label">اسم الجامعة:</span> {selectedStudent.university_name}</p>}
                            {isNotEmpty(selectedStudent.Housing_in_previous_years) && <p className="mb-3"><span className="bold-label">حالة السكن في السنوات الماضية:</span> {selectedStudent.Housing_in_previous_years}</p>}
                            {isNotEmpty(selectedStudent.housing_type) && <p className="mb-3"><span className="bold-label">نوع السكن:</span> {selectedStudent.housing_type}</p>}
                            {isNotEmpty(selectedStudent.family_abroad) && <p className="mb-3"><span className="bold-label">سكن العائلة بالخارج:</span> {selectedStudent.family_abroad}</p>}
                            {isNotEmpty(selectedStudent.special_needs) && <p className="mb-3"><span className="bold-label">حالات خاصة:</span> {selectedStudent.special_needs}</p>}
                            {isNotEmpty(selectedStudent.Secondary_Division) && <p className="mb-3"><span className="bold-label">نوع الثانوية:</span> {selectedStudent.Secondary_Division}</p>}
                            {isNotEmpty(selectedStudent.Total_grades_high_school) && <p className="mb-3"><span className="bold-label">مجموع الثانوية بالدرجات:</span> {selectedStudent.Total_grades_high_school}</p>}
                            {isNotEmpty(selectedStudent.Passport_number) && <p className="mb-3"><span className="bold-label">رقم جواز السفر:</span> {selectedStudent.Passport_number}</p>}
                            {isNotEmpty(selectedStudent.Passport_issuing_authority) && <p className="mb-3"><span className="bold-label">جهة صدور جواز السفر:</span> {selectedStudent.Passport_issuing_authority}</p>}
                          
                          </div>
                          <button
                            className="btn btn gold-bg-color"
                            onClick={handleAccept}
                          >
                            قبول
                          </button>
                          <button
                            className="btn btn-danger m-2"
                            onClick={handleReject}
                          >
                            رفض
                          </button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="2">لا توجد بيانات</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

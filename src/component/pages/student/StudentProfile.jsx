import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './StudentProfile.module.css'; // استيراد CSS Module

const token = localStorage.getItem("tkn");

export default function StudentProfile() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/student/getStudentData', {
          headers: {
            token: token
          }
        });
        setStudentData(response.data.studentData);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles['home-container']}>
      <h2 className={styles.header}>بيانات الطالب</h2>
      <div className={styles['info-container']}>
        {studentData && studentData.student_type && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>نوع الطالب:</strong> {studentData.student_type}</div>}
        
        {studentData && studentData.Total_grades_high_school && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>  مجموع الدرجات في المدرسة الثانوية:</strong> {studentData.Total_grades_high_school}</div>}{studentData && studentData.status && <div className={styles['info-item']}><strong className={styles['info-item-strong']}> حاله الطالب:</strong> {studentData.status}</div>}
        {studentData && studentData.nationality && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الجنسية:</strong> {studentData.nationality}</div>}
        {studentData && studentData.national_id && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الرقم القومي:</strong> {studentData.national_id}</div>}
        {studentData && studentData.name && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الاسم:</strong> {studentData.name}</div>}
        {studentData && studentData.date_of_birth && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>تاريخ الميلاد:</strong> {studentData.date_of_birth}</div>}
        {studentData && studentData.place_of_birth && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>مكان الميلاد:</strong> {studentData.place_of_birth}</div>}
        {studentData && studentData.gender && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>النوع:</strong> {studentData.gender}</div>}
        {studentData && studentData.religion && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الدين:</strong> {studentData.religion}</div>}
        {studentData && studentData.residence_address && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>عنوان السكن:</strong> {studentData.residence_address}</div>}
        {studentData && studentData.detailed_address && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>العنوان التفصيلي:</strong> {studentData.detailed_address}</div>}
        {studentData && studentData.email && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>البريد الإلكتروني:</strong> {studentData.email}</div>}
        {studentData && studentData.mobile_number && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>رقم الهاتف المحمول:</strong> {studentData.mobile_number}</div>}
        {studentData && studentData.father_name && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>اسم الأب:</strong> {studentData.father_name}</div>}
        {studentData && studentData.father_national_id && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الرقم القومي للأب:</strong> {studentData.father_national_id}</div>}
        {studentData && studentData.father_occupation && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>مهنة الأب:</strong> {studentData.father_occupation}</div>}
        {studentData && studentData.father_phone_number && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>رقم هاتف الأب:</strong> {studentData.father_phone_number}</div>}
        {studentData && studentData.guardian_name && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>اسم الوصي:</strong> {studentData.guardian_name}</div>}
        {studentData && studentData.guardian_national_id && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الرقم القومي للوصي:</strong> {studentData.guardian_national_id}</div>}
        {studentData && studentData.guardian_phone_number && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>رقم هاتف الوصي:</strong> {studentData.guardian_phone_number}</div>}
        {studentData && studentData.parents_status && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>حالة الوالدين:</strong> {studentData.parents_status}</div>}
        {studentData && studentData.college && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الكلية:</strong> {studentData.college}</div>}
        {studentData && studentData.level && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>المستوى:</strong> {studentData.level}</div>}
        {studentData && studentData.Secondary_Division && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>الشعبة الثانوية:</strong> {studentData.Secondary_Division}</div>}
        {studentData && studentData.previous_academic_year_gpa && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>المعدل الأكاديمي للسنة السابقة:</strong> {studentData.previous_academic_year_gpa}</div>}
        {studentData && studentData.university_name && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>اسم الجامعة:</strong> {studentData.university_name}</div>}
        {studentData && studentData.Housing_in_previous_years && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>السكن في السنوات السابقة:</strong> {studentData.Housing_in_previous_years}</div>}
        {studentData && studentData.housing_type && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>نوع السكن:</strong> {studentData.housing_type}</div>}

        {studentData && studentData.family_abroad && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>العائلة بالخارج:</strong> {studentData.family_abroad}</div>}
        {studentData && studentData.special_needs && <div className={styles['info-item']}><strong className={styles['info-item-strong']}>احتياجات خاصة:</strong> {studentData.special_needs}</div>}
      </div>
    </div>
  );
}

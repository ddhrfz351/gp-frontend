import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandPointLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap-rtl/dist/css/bootstrap-rtl.css';
import './guidepage.css'; // Uncomment this line if you have a CSS file

export default function HousingFeesPage() {
    const location = useLocation();
    const [selectedUniversity, setSelectedUniversity] = useState('حلوان'); // Default university name
    const [housingFees, setHousingFees] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode
    const [newHousingFee, setNewHousingFee] = useState({
        housingType: '',
        fees: '',
        feeding: ''
    });
    const token = localStorage.getItem("tkn");
    const currentYear = new Date().getFullYear(); // العام الحالي

    useEffect(() => {
        fetchHousingFees();
    }, [selectedUniversity]);

    const fetchHousingFees = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/HousingFee?universityName=${selectedUniversity}`, {
                headers: {
                    token: token
                }
            });
            setHousingFees(response.data);
        } catch (error) {
            console.log("Error fetching housing fees:", error);
        }
    };

    const handleUniversityChange = (selectedUniversity) => {
        setSelectedUniversity(selectedUniversity);
    };

    const handleEditClick = () => {
        setIsFormVisible(true);
        setIsEditing(true); // Set editing mode to true when user clicks edit button
    };

    const handleSaveClick = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/HousingFee`, {
                universityName: selectedUniversity,
                housingType: newHousingFee.housingType,
                fees: newHousingFee.fees,
                feeding: newHousingFee.feeding
            }, {
                headers: {
                    token: token,
                    'Content-Type': 'application/json' // Add Content-Type header
                }
            });

            fetchHousingFees();
            setIsFormVisible(false);
            setIsEditing(false); // Set editing mode back to false after save
            setNewHousingFee({
                housingType: '',
                fees: '',
                feeding: ''
            });
            console.log("تم حفظ المصاريف بنجاح");

        } catch (error) {
            console.log("حدث خطأ أثناء حفظ المصاريف:", error);
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/HousingFee?id=${id}`, {
                headers: {
                    token: token
                }
            });

            fetchHousingFees();
            console.log("تم حذف المصاريف بنجاح");

        } catch (error) {
            console.log("حدث خطأ أثناء حذف المصاريف:", error);
        }
    };

    const handleChange = (e) => {
        setNewHousingFee({
            ...newHousingFee,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className='main-container clearfix mb-5'>
            <nav id="sidebar" className="col-md-3 col-lg-2 col-sm-4 d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <h3 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-2">
                        اختر الجامعة
                    </h3>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <button className="adduni" onClick={() => handleUniversityChange('حلوان')}>
                                حلوان
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="adduni" onClick={() => handleUniversityChange('حلوان الاهلية')}>
                                حلوان الأهلية
                            </button>
                            {/* يمكنك إضافة المزيد من الجامعات حسب الحاجة */}
                        </li>
                    </ul>
                </div>
            </nav>

            <div className='body-hu w-75'>


                <h3>مصاريف السكن لجامعة {selectedUniversity}</h3>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>نوع السكن</th>
                            <th>المصاريف</th>
                            <th>التغذية</th>
                            <th>تاريخ الإنشاء</th>
                            <th>إجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {housingFees.map((fee, index) => (
                            <tr key={index}>
                                <td>{fee.housing_type}</td>
                                <td>{fee.fees}</td>
                                <td>{fee.feeding}</td>
                                <td>{new Date(fee.created_at).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDeleteClick(fee.id)}>حذف</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!isEditing && ( // Display textarea and save button only if not in editing mode
                    <button className="btn btn main-bg-color text-white" onClick={handleEditClick}>إضافة أو تعديل المصاريف</button>
                )}
{isFormVisible && (
    <div className='body-hu w-75'>
        <h3>مصاريف السكن لجامعة {selectedUniversity}</h3>
        <div className="mb-3">
            <label className="form-label">نوع السكن</label>
            <select
                className="form-select"
                name="housingType"
                value={newHousingFee.housingType}
                onChange={handleChange}
                required
            >
                <option value="">اختر نوع السكن</option>
                <option value="مميز">مميز</option>
                <option value="مميز برامج">مميز برامج</option>
                <option value="عادي">عادي</option>
                <option value="عادي برامج">عادي برامج</option>
                {/* يمكنك إضافة المزيد من خيارات أنواع السكن حسب الحاجة */}
            </select>
        </div>
        <div className="mb-3">
            <label className="form-label">المصاريف</label>
            <input
                type="text"
                className="form-control"
                name="fees"
                value={newHousingFee.fees}
                onChange={handleChange}
                required
            />
        </div>

        <div className="mb-3">
            <label className="form-label">التغذية</label>
            <select
                className="form-select"
                name="feeding"
                value={newHousingFee.feeding}
                onChange={handleChange}
                required
            >
                <option value="">اختر نوع التغذية</option>
                <option value="تغذية">تغذية</option>
                <option value="بدون تغذية">بدون تغذية</option>
            </select>
        </div>

        <button className="btn btn main-bg-color text-white" onClick={handleSaveClick}>حفظ</button>
    </div>
)}

            </div>
        </div>
    );
}


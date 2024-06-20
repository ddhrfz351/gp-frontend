import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom'; // إذا كنت تستخدم React Router

const token = localStorage.getItem('tkn');

// دالة لإضافة شكوى جديدة
const addComplaint = async (studentName, complaintText) => {
    try {
        const response = await axios.post('http://localhost:5000/api/Complaint/complaints', {
            studentName,
            complaintText
        }, {
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'حدث خطأ أثناء إضافة الشكوى');
    }
};

// دالة للحصول على شكوى بواسطة اسم الطالب
const getComplaintsByStudentName = async (studentName) => {
    try {
        const response = await axios.get('http://localhost:5000/api/Complaint/complaints/name', {
            params: {
                studentName
            },
            headers: {
                token: token
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.error || 'حدث خطأ أثناء الحصول على الشكاوى');
    }
};

// دالة لمتابعة الشكوى بواسطة اسم الطالب
const followComplaint = async (studentName) => {
    try {
        const response = await getComplaintsByStudentName(studentName);
        console.log(response);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

const ComplaintForm = () => {
    const [complaintText, setComplaintText] = useState('');
    const [message, setMessage] = useState('');
    const [operationType, setOperationType] = useState('add');
    const [complaints, setComplaints] = useState([]);

    // استخدم هذا الخط في حالة استخدام React Router للحصول على اسم الطالب من العنوان
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const studentName = queryParams.get('studentName') || ''; // احصل على اسم الطالب من العنوان

    // استخدم هذا الخط في حالة عدم استخدام React Router
    // const studentName = new URL(window.location.href).searchParams.get('studentName') || '';

    useEffect(() => {
        if (operationType === 'follow' && studentName) {
            handleFollow();
        }
    }, [operationType, studentName]);

    const handleFollow = async () => {
        try {
            const response = await followComplaint(studentName);
            setComplaints(response);
        } catch (error) {
            setMessage(error.message || 'حدث خطأ أثناء متابعة الشكوى');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (operationType === 'follow') {
                await handleFollow();
            } else {
                await addComplaint(studentName, complaintText);
                setMessage('تمت إضافة الشكوى بنجاح');
            }
            setComplaintText('');
        } catch (error) {
            setMessage(error.message || 'حدث خطأ أثناء تقديم الشكوى');
        }
    };

    return (
        <div className="container mt-5">
            <h1>تقديم شكوى</h1>
            <div className="mb-3">
                <label className="form-label">نوع العملية</label>
                <select
                    className="form-control"
                    value={operationType}
                    onChange={(e) => setOperationType(e.target.value)}
                >
                    <option value="add">إضافة شكوى جديدة</option>
                    <option value="follow">متابعة شكوى سابقة</option>
                </select>
            </div>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
                {operationType === 'follow' && complaints.length > 0 && (
                    <div className="mb-3">
                        <h3>الشكاوى المرتبطة بـ {studentName}</h3>
                        <ul>
                            {complaints.map(complaint => (
                                <li key={complaint.id}>
                                     <p >{complaint.id}</p>
                                    <p><strong>نص الشكوى:</strong> {complaint.complaint_text}</p>
                                    <p>
                                        <strong>المراجعة:</strong> {complaint.reviewed === 1 ? 'تمت المراجعة' : 'لم تتم المراجعة'}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {operationType === 'add' && (
                    <div className="mb-3">
                        <label className="form-label">نص الشكوى</label>
                        <textarea
                            className="form-control"
                            value={complaintText}
                            onChange={(e) => setComplaintText(e.target.value)}
                            required
                        ></textarea>
                    </div>
                )}

                <button type="submit" className="btn btn main-bg-color text-white">إرسال</button>
            </form>
        </div>
    );
};

export default ComplaintForm;

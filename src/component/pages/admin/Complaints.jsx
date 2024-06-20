import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const token = localStorage.getItem("tkn");

const ComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [message, setMessage] = useState('');
    const [filter, setFilter] = useState('all'); // Added filter state

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/Complaint/complaints', {
                headers: { token }
            });
            setComplaints(response.data);
        } catch (error) {
            console.error('Error fetching complaints:', error.message);
        }
    };

    const handleReviewUpdate = async (id) => {
        try {
            const response = await axios.put(
                'http://localhost:5000/api/Complaint/complaints/reviewed',
                {},
                {
                    headers: { token },
                    params: { id }
                }
            );
            setMessage(response.data.message);
            fetchComplaints(); // Refresh the complaints list
        } catch (error) {
            setMessage(error.response.data.error || 'حدث خطأ أثناء تحديث حالة المراجعة');
        }
    };

    const deleteComplaint = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/Complaint/complaints?id=${id}`, {
                headers: { token }
            });
            setMessage(response.data.message);
            fetchComplaints(); // Refresh the complaints list
        } catch (error) {
            setMessage(error.response.data.error || 'حدث خطأ أثناء حذف الشكوى');
        }
    };

    // Filter complaints based on the selected filter
    const filteredComplaints = complaints.filter(complaint => {
        if (filter === 'reviewed') return complaint.reviewed;
        if (filter === 'unreviewed') return !complaint.reviewed;
        return true;
    });

    return (
        <div className="container mt-5">
            <h1 className="mb-4">شكاوى الطلاب</h1>
            {message && <div className="alert alert-info">{message}</div>}

            <div className="mb-4">
                <select 
                    className="form-select" 
                    value={filter} 
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">كل الشكاوى</option>
                    <option value="reviewed">تمت المراجعة</option>
                    <option value="unreviewed">لم تتم المراجعة</option>
                </select>
            </div>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>الرقم</th>
                        <th>اسم الطالب</th>
                        <th>نص الشكوى</th>
                        <th>تاريخ التقديم</th>
                        <th>حالة المراجعة</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredComplaints.map((complaint) => (
                        <tr key={complaint.id}>
                            <td>{complaint.id}</td>
                            <td>{complaint.student_name}</td>
                            <td>{complaint.complaint_text}</td>
                            <td>{new Date(complaint.created_at).toLocaleDateString('ar-EG')}</td>
                            <td>{complaint.reviewed ? 'تمت المراجعة' : 'لم تتم المراجعة'}</td>
                            <td>
                                {!complaint.reviewed ? (
                                    <button
                                        className="btn btn main-bg-color text-white"
                                        onClick={() => handleReviewUpdate(complaint.id)}
                                    >
                                        تحديث حالة المراجعة
                                    </button>
                                ) : (
                                    <>
                                        <span>تمت المراجعة</span>
                                        <button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteComplaint(complaint.id)}
                                        >
                                            حذف
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintsPage;

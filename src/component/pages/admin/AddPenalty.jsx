import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Addpenalty.css'; 

const token = localStorage.getItem("tkn");

const AddPenalty = () => {
    const { userId, userName } = useParams();
    const [user, setUser] = useState({});
    const [punish, setPunish] = useState('');
    const [reason, setReason] = useState('');
    const [isClosed, setIsClosed] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/admin/${userId}`,
                    {
                        headers: {
                            token: token
                        }
                    }
                );
                setUser(response.data.user);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        fetchUserDetails();
    }, [userId]);

    const handlePunishChange = (event) => {
        setPunish(event.target.value);
    };

    const handleReasonChange = (event) => {
        setReason(event.target.value);
    };

    const handleAddClick = () => {
        if (!punish || !reason) {
            console.error('Please fill in all fields.');
            return;
        }

        const data = {
            user_id: userId,
            adminName: userName,
            absence_type: punish,
            absence_reason: reason,
        };

        axios.post("http://localhost:5000/api/admin/retribution", data, {
            headers: {
                token: token
            }
        })
        .then(response => {
            console.log('Data added successfully:', response.data);
            navigate("/managepenalty");
        })
        .catch(error => {
            console.error('Error adding data:', error);
        });
    };

    const handleCloseClick = () => {
        setIsClosed(true);
    };

    return (
        <div className={`AddPenalty ${isClosed ? 'closed' : ''} container mt-5`}>
            <div className='second'>
                <label className='punish'>الجزاء</label>
                <input className='form-control w-25' type="text" value={punish} onChange={handlePunishChange} />
            </div>
            <div className='third'>
                <label className='reason'>السبب</label>
                <textarea className='form-control w-25' type="text" value={reason} onChange={handleReasonChange} />
            </div>
            <button className='btn btn main-bg-color text-white mt-3' onClick={handleAddClick}>إضافة</button>
        </div>
    );
};

export default AddPenalty;

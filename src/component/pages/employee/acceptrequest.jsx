// AdmissionRequestsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import AdmissionRequestBlock from "./AdmissionRequestBlock";
const token =localStorage.getItem("tkn");

const AdmissionRequestsPage = () => {
  const [admissionRequests, setAdmissionRequests] = useState([]);

  useEffect(() => {
    getAllAdmissionRequests();
  }, []);

  const getAllAdmissionRequests = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employee/",{

      headers: {
        token:  token
    }
      });
      setAdmissionRequests(response.data.data);
    } catch (error) {
      console.error("Error fetching admission requests:", error);
    }
  };

  const acceptAdmissionRequest = async (id) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/employee/${id}`,{

      headers: {
        token:  token
    }
      });
      console.log("Admission request accepted:", response.data.message);
      getAllAdmissionRequests();
    } catch (error) {
      console.error("Error accepting admission request:", error);
    }
  };

  return (
    <div className="manage-users p-5">
      <div className="header d-flex justify-content-between mb-5">
        <h1 className="text-center">طلبات الالتحاق:</h1>
      </div>

      <div className="admission-requests-container d-flex flex-wrap">
        {admissionRequests.map((request) => (
          <AdmissionRequestBlock
            key={request.id}
            request={request}
            onAccept={acceptAdmissionRequest}
          />
        ))}
      </div>
    </div>
  );
};

export default AdmissionRequestsPage;

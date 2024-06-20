import React from "react";
import './admissionblock.css';

const AdmissionRequestBlock = ({ request, onAccept }) => {
  return (
    <div className="admission-request-block">
      <div className="admission-request-header">
        <h3>ID: {request.id}</h3>
      </div>
      <div className="admission-request-body">
        <p><strong>الاسم:</strong> {request.name}</p>
        <p><strong>البريد الالكتروني :</strong> {request.email}</p>
        <p><strong>النوع:</strong> {request.gender}</p>
        <p><strong>الرقم القومي :</strong> {request.national_id}</p>
        <p><strong>الديانه:</strong> {request.religion}</p>
        <p><strong>الرقم القومي للاب :</strong> {request.father_national_id}</p>
        <p><strong>وظيفه الاب :</strong> {request.father_occupation}</p>
        <p><strong>رقم الاب:</strong> {request.father_phone_number}</p>
      </div>
      <div className="admission-request-footer">
        <button
          className="btn btn-sm btn-primary"
          onClick={() => onAccept(request.id)}
        >
          Accept
        </button>
        {/* Add other actions if needed */}
      </div>
    </div>
  );
};

export default AdmissionRequestBlock;

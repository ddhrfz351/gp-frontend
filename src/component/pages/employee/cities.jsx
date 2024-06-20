// App.js

import React, { useState } from 'react';
import './cities.css';
import { provinces } from '../../Data'; // افترض أن البيانات موجودة في ملف data.js

const App = () => {
  const [selectedProvince, setSelectedProvince] = useState('');

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
  };

  const filteredProvinces = selectedProvince
    ? provinces.filter(province => province["المحافظة"] === selectedProvince)
    : provinces;

  return (
    <div className="container">
      <h1>محافظات مصر والبلدان التابعة لها</h1>
      <div>
        <label htmlFor="province-select">اختر المحافظة:</label>
        <select id="province-select" onChange={handleProvinceChange}>
          <option value="">-- الكل --</option>
          {provinces.map((province, index) => (
            <option key={index} value={province["المحافظة"]}>
              {province["المحافظة"]}
            </option>
          ))}
        </select>
      </div>
      <table border="1" cellPadding="6" className="table">
        <thead>
          <tr>
            <th>المحافظة</th>
            <th>البلد</th>
            <th>مستبعدة</th>
          </tr>
        </thead>
        <tbody>
          {filteredProvinces.map((province, provinceIndex) => (
            <React.Fragment key={provinceIndex}>
              {province.البلدان.map((country, countryIndex) => (
                <tr key={countryIndex}>
                  {countryIndex === 0 && (
                    <td rowSpan={province.البلدان.length} className="province-cell">
                      {province.المحافظة}
                    </td>
                  )}
                  <td>{country.الاسم}</td>
                  <td>{country.مستبعدة ? 'مستبعدة' : 'غير مستبعدة'}</td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;

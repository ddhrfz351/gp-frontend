import React, { useState, Fragment } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { useFormik } from 'formik'
import {
  locations,
  nationalities,
  secondarySchoolBranches,
  egyptColleges,
  gpa,
  egyptUniversities,
} from "../../../Data";
import { FallingLines } from 'react-loader-spinner';
import { event } from 'jquery';
export default function New() {

  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
    passport_number: ""
  }


  const [errMsg, setErrMsg] = useState(null)
  const [successMsg, setSuccessMsg] = useState(null)
  const [isLouding, setisLouding] = useState(false)

  async function joinRequest(value) {
    setisLouding(true)
    console.log("sending to backend")



    try {
      const { data } = await axios.post("http://localhost:5000/api/student/new", formData, {

      }

      )
      console.log("hi", data)
      if (data.message === "تم بنجاح") {
        setSuccessMsg("تم ارسال طلب الالتحاق بنجاح")
        setTimeout(function () {
          Navigate('/signin')
        }, 1000)
      }
    }
    catch (error) {
      console.error('Error:', error);
      setErrMsg(error.response.data.message); // تخزين الخطأ في الحالة errMsg
    }


    setisLouding(false)

  }


  const formikObj = useFormik({
    initialValues: user,
    onSubmit: joinRequest,
    validate: function (value) {

      setErrMsg(null)

      const error = {}
      if (value.name.length < 4 || value.name.length > 10) {
        error.name = "Name must be at from 4 to 10 charcters"
      }
      if (value.email.includes("@" === false) || value.email.includes("." === false)) {
        error.email = 'Email Invalid'
      }
      if (value.passport_number.length < 13 && value.passport_number.length > 13) {
        error.passport_number = 'هذا الرقم غير صالح'
      }

      if (!value.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
        error.phone = "phone invalid"
      }
      if (value.password.length < 6 || value.password.length > 12) {
        error.password = "password must be at from 6 to 12 charcters"
      }
      if (value.confirm_password !== value.password) {
        error.confirm_password = "repassword and password doesn't match"
      }
      return error
    }
  })

  const [isEgyption, setisEgyption] = useState(true)
  //if is Egyption is true, don't send value nationality
  const [formData, setFormData] = useState({
    passport_number: '',
    issung_authority: '',
    nationality: "مصرى",
    national_id: '',
    student_id: '',
    name: '',
    date_of_birth: '',
    place_of_birth: '',
    gender: '',
    religion: '',
    residence: '',
    email: '',
    phone: '',
    mobile_number: '',
    detailed_address: '',
    father_name: '',
    father_occupation: '',
    father_phone: '',
    residence_address: '',
    guardian_national_id: '',
    guardian_relationship: '',
    guardian_phone: '',
    guardian_states: '',
    parents_status: "",
    college: '',
    Secondary_Division: "",
    special_needs: '',
    password: '',
    university_name: "",
    confirm_password: '',
    father_name: "", //An Egyption
    father_national_id: "", //An Egyption
    father_occupation: "", //An Egyption
    father_phone: "", //An Egyption
    guardian_name: "", //An Egyption
    guardian_relationship: "", //An Egyption
    guardian_national_id: "", //An Egyption
    guardian_phone: "", //An Egyption
    guardian_states: "", //An Egyption
    Total_grades_high_school: '',
    // الثانوية العامة من الخارج
    high_school_department_from_abroad: false, // An Egyption only
    // الاسرة بالخارج
    family_from_abroad: false, // An Egyption
    // ذوي الاحتياجات الخاصة
    special_needs: false, // An Egyption
    dormTypeWithoutFood: 0, // قيمة افتراضية
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  }
  const handleSubmit = (e) => {

    joinRequest(formData)
    e.preventDefault();
    if (isEgyption) {
      const { national_id, passport_number, issuingAuthority, ...rest } =
        formData;
      console.log(rest, "rest form data");
    } else {
      console.log(formData, "form data");
    }
    handleChangNationality(e);
  };
  const handleChangNationality = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };
  //if is Egyption remove nationality from dataForm
  return (
    <Fragment>
      {errMsg && (
        <div className="alert alert-danger mt-3" role="alert">
          {errMsg}
        </div>
      )}
      <form action="/submit" method='post'>
        <div className="container mb-5">
          <div className="row">
            <div className="d-flex mt-3 ">
              <div className="egyption ms-5">
                <input
                  type="radio"
                  name="nationality"
                  value='مصرى'
                  id="egyption"
                  className="color-primary"
                  onChange={(e) => { handleChange(e); setisEgyption(true) }}
                  checked={isEgyption}
                />
                <label htmlFor="egyption"



                >مصري</label>
              </div>
              <div className="noegyption">
                <input
                  type="radio"
                  value="وافد"
                  name="nationality"
                  id="noegyption"
                  onChange={(e) => { handleChange(e); setisEgyption(false) }}
                  checked={!isEgyption}
                />
                <label htmlFor="noegyption"

                >وافد</label>
              </div>
            </div>

            <Fragment>
              {/* hide the input if isEgyption is false */}
              {!isEgyption && (
                <Fragment>
                  <div className=" row mt-3">
                    <div className=" col  ">
                      <label htmlFor="passport_number"> رقم جواز السفر</label>

                      <input
                        type="number"
                        id="passport_number"
                        className="form-control w-50 "
                        name="passport_number"
                        value={formData.passport_number}
                        onChange={handleChange}
                        onBlur={formikObj.handleBlur}
                      />
                      {formikObj.errors.passport_number && formikObj.touched.passport_number ? <div className="alert alert-danger">{formikObj.errors.passport_number}</div> : ""}
                    </div>
                  </div>
                  <div className=" col  ">
                    <label htmlFor="issung_authority">جهة صدوره</label>
                    <input
                      type="text"
                      id="issung_authority"
                      className="form-control w-50  "
                      name="issung_authority"
                      value={formData.issung_authority}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col">
                    <label htmlFor="nationalitySelect" className="form-label">
                      الجنسيه
                    </label>
                    <select
                      id="nationalitySelect"
                      name="nationality"
                      className="form-select"
                      onChange={handleChange}
                    >
                      {nationalities.map((nationalityItem, index) => (
                        <option key={index} value={nationalityItem}>
                          {nationalityItem}
                        </option>
                      ))}
                    </select>
                  </div>
                </Fragment>
              )}
              {
                // show the input if isEgyption is true
              }
              {isEgyption && (
                <div className=" row mt-3">
                  <div className=" col  ">
                    <label htmlFor="national_id">الرقم القومي</label>
                    <input
                      type="text"
                      id="national_id"
                      name="national_id"
                      className="form-control w-50   "
                      value={formData.national_id}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col ">
                    <label htmlFor="student_id">كود الطالب</label>
                    <input
                      type="text"
                      id="student_id"
                      name="student_id"
                      className="form-control w-50   "
                      value={formData.student_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}
              <div className=" ">
                <label htmlFor="name"> الاسم</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control  w-50  "
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="row mt-3">
                <div className="col  ">
                  <label htmlFor="date_of_birth"> تاريخ الميلاد</label>
                  <input
                    type="date"
                    name="date_of_birth"
                    id="date_of_birth"
                    className="form-control w-50 "
                    value={formData.date_of_birth}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label for="place_of_birth" className="form-label">
                    محل الميلاد :
                  </label>
                  <select
                    id="place_of_birth"
                    className="form-select"
                    name="place_of_birth"
                    value={formData.place_of_birth}
                    onChange={handleChange}
                  >
                    {locations.map((location) => (
                      <option value={location} key={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="row mt-3">

                <div className="col ">
                  <select
                    className="form-control w-50"
                    name="gender"
                    onChange={handleChange}
                    value={formData.gender}
                  >
                    <option>النوع</option>
                    <option>ذكر</option>
                    <option>انثي</option>
                  </select>
                </div>
                <div className="col">
                  <select
                    className="form-control  w-50"
                    name="religion"
                    onChange={handleChange}
                    value={formData.religion}
                  >
                    <option>الديانه</option>
                    <option>مسلم</option>
                    <option>مسيحي</option>
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label for="residence_address" className="form-label">
                    محل الاقامه :
                  </label>
                  <select
                    id="residence_address"
                    className="form-select"
                    name="residence_address"
                    onChange={handleChange}
                    value={formData.residence_address}
                  >
                    {locations.map((location) => (
                      <option value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="detailed_address " className="mt-3">
                    العنوان بالتفصيل
                  </label>
                  <input
                    type="text"
                    id="detailed_address"
                    name="detailed_address"
                    value={formData.detailed_address}
                    onChange={handleChange}
                    className="form-control w-50"
                  />
                </div>
                <div>
                  <label htmlFor="mail " className="mt-3">
                    {" "}
                    البريد الالكتروني
                  </label>
                  <input
                    type="text"
                    id="mail"
                    className="form-control w-50"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="number">التليفون</label>
                  <input
                    type="number"
                    id="number"
                    className="form-control w-50"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="mobile_number">الموبيل</label>
                  <input
                    type="number"
                    id="mobile_number"
                    className="form-control w-50"
                    name="mobile_number"
                    value={formData.mobile_number}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {
                // show the input if isEgyption is true
              }
              {isEgyption && (
                <Fragment>
                  <div className="d-flex justify-content-start align-items-center gap-5 w-100">
                    <div className="col">
                      <label htmlFor="nameD " className="mt-3">
                        {" "}
                        اسم الاب{" "}
                      </label>
                      <input
                        type="text"
                        id="nameD"
                        className="form-control"
                        name="father_name"
                        value={formData.father_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="num " className="mt-3 ">
                        {" "}
                        الرقم القومي للاب{" "}
                      </label>
                      <input
                        type="number"
                        id="num"
                        className="form-control w-50"
                        name="father_national_id"
                        value={formData.father_national_id}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="job">وظيفة الاب</label>
                      <input
                        type="text"
                        id="job"
                        className="form-control w-50 "
                        name="father_occupation"
                        value={formData.father_occupation}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="num">تليفون الاب</label>
                      <input
                        type="number"
                        id="num"
                        className="form-control w-50"
                        name="father_phone"
                        value={formData.father_phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="name">اسم ولي الامر </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control w-50"
                        name="guardian_name"
                        value={formData.guardian_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="rel">صلة ولي الامر</label>
                      <input
                        type="text"
                        id="rel"
                        className="form-control w-50"
                        name="guardian_relationship"
                        value={formData.guardian_relationship}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <label htmlFor="num"> الرقم القومي لولى الامر </label>
                      <input
                        type="text"
                        id="num"
                        className="form-control w-50"
                        name="guardian_national_id"
                        value={formData.guardian_national_id}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col">
                      <label htmlFor="num"> تلفون ولى الامر</label>
                      <input
                        type="text"
                        id="num"
                        className="form-control w-50"
                        name="guardian_phone"
                        value={formData.guardian_phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <label htmlFor="state " className="mt-3 ">
                    {" "}
                    حاله تخص الوالدين{" "}
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="form-control w-50"
                    name="parents_status"
                    value={formData.parents_status}
                    onChange={handleChange}
                  />
                </Fragment>
              )}
              <div className="row ">
                <div className="col">
                  <label htmlFor="university" className="mt-3">
                    الجامعه
                  </label>
                  <select
                    id="university"
                    className="form-control w-75"
                    name="university_name"
                    onChange={handleChange}
                    value={formData.university_name}
                  >
                    <option >اختر الجامعه</option>
                    {egyptUniversities.map((university) => (
                      <option value={university.name}>{university.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="college" className="mt-3">
                    الكليه
                  </label>
                  <select
                    className="form-control w-75"
                    id="college"
                    name="college"
                    onChange={handleChange}
                    value={formData.college.name}
                  >
                    <option value="">اختر الكليه</option>
                    {egyptColleges.map((college) => (
                      <option value={college.name}>{college.name}</option>
                    ))}
                  </select>
                </div>
                <div className="col">
                  <label htmlFor="level" className="mt-3">
                    الفرقه
                  </label>
                  <select
                    id="level"
                    className="form-control w-75"
                    name="level"
                    onChange={handleChange}
                    value={formData.level}
                  >
                    <option value={formData.level}>الفرقه</option>
                    <option value="level1">الفرقه الاولى</option>
                    <option value="level2">الفرقه الثانية</option>
                    <option value="level3">الفرقه الثالثة</option>
                    <option value="level4">الفرقه الرابعة</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="branch">شعبة الثانوية العامة</label>
                  <select
                    id="branch"
                    className="form-control w-50"
                    name="Secondary_Division"
                    onChange={handleChange}
                    value={formData.Secondary_Division}
                  >
                    <option value="">اختر الشعبه</option>
                    {secondarySchoolBranches.map((branch) => (
                      <option value={branch}>{branch}</option>
                    ))}
                  </select>
                </div>
                {
                  // show the input if isEgyption is true
                  isEgyption && (
                    <div className="col d-flex align-items-center gap-3">
                      <label htmlFor="meal">الثانوية العامة من الخارج </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="meal"
                        name="high_school_department_from_abroad"
                        onChange={() =>
                          setFormData({
                            ...formData,
                            high_school_department_from_abroad:
                              !formData.high_school_department_from_abroad,
                          })
                        }
                      ></input>
                    </div>
                  )
                }
              </div>

              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="percent"> مجموع الثانويه العامه</label>
                  <input
                    type="text"
                    className="form-control w-50"
                    name="totalHighSchoolScore"
                    value={formData.totalHighSchoolScore}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="percent"> نسبة الثانويه العامه</label>
                  <input
                    type="text"
                    className="form-control w-50"
                    name="highSchoolGPA"
                    value={formData.highSchoolGPA}
                    onChange={handleChange}
                  />
                </div>
              </div>


              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="skan">نوع السكن</label>
                  <select
                    id="skan"
                    className="form-control w-50"
                    name="dormType"
                    onChange={handleChange}
                  >
                    <option value="">اختر النوع</option>
                    <option value="type1"> مميز</option>
                    <option value="type2"> عادي</option>

                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="col d-flex align-items-center gap-3">
                  <label htmlFor="dormTypeWithoutFood"> تغذيه </label>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="dormTypeWithoutFood"
                    name="dormTypeWithoutFood"
                    onChange={() =>
                      setFormData({
                        ...formData,
                        dormTypeWithoutFood: !formData.dormTypeWithoutFood ? 1 : 0, // إعادة تعيين القيمة بناءً على قيمتها الحالية
                      })
                    }
                    checked={formData.dormTypeWithoutFood === 1} // تحقق مما إذا كانت القيمة 1 لتحديد الخانة في حالة الحاجة
                  />

                </div>
              </div>
              <div className="row mt-3">
                {
                  // show the input if isEgyption is true
                }

                {isEgyption && (
                  <Fragment>
                    <div className="col d-flex align-items-center gap-3">
                      <label htmlFor="fam"> الاسره بالخارج </label>
                      <input
                        classname="form-check-input"
                        type="checkbox"
                        id="fam"
                        name="family_from_abroad"
                        onChange={() =>
                          setFormData({
                            ...formData,
                            familyFromAbroad: !formData.family_from_abroad,
                          })
                        }
                      ></input>
                    </div>
                    <div className="col d-flex align-items-center gap-3">
                      <label htmlFor="special"> ذوي الاحتياجات الخاصه </label>
                      <input
                        classname="form-check-input"
                        type="checkbox"
                        id="special"
                        name="special_needs"
                        onChange={() =>
                          setFormData({
                            ...formData,
                            specialNeeds: !formData.special_needs,
                          })
                        }
                      ></input>
                    </div>
                  </Fragment>
                )}
              </div>
              <div className="row mt-3">
                <div className="col">
                  <label htmlFor="pass"> كلمة المرور</label>
                  <input
                    type="password"
                    id="pass"
                    className="form-control w-50"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div className="col">
                  <label htmlFor="confirmPassword"> تاكيد كلمة المرور </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control w-50"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="d-flex mt-3">
                <input
                  classname="form-check-input"
                  type="checkbox"
                  id="meal"
                ></input>
                <label htmlFor="meal">
                  أقر بأن البيانات (محل الإقامة - التقدير - الفرقة/الكلية) صحيحة
                  طبقاً للأوراق الرسمية على أن أقدم هذه الأوراق عند حضوري
                  للمدينة في حالة القبول وإذا ثبت أي خطأ في البيانات يتم تحويلي
                  للشئون القانونية وفصلي نهائياً من المدينة
                </label>
              </div>

              <div className="d-flex justify-content-center align-items-center ">
                <button
                  className="btn btn main-bg-color white mb-5 mt-3 "
                  onClick={(e) => handleSubmit(e)}
                >
                  تسجيل طلب الالتحاق
                </button>
              </div>


            </Fragment>
          </div>
        </div>
      </form>
    </Fragment>
  );

};















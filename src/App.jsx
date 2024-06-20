import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AuthenticatedRoute from './component/AuthenticatedRoute';
import Layout from './component/pages/Layout/Layout';
import Home from './component/pages/Home/Home';
import Signin from './component/pages/Signin/Signin';
import AppointmentA from './component/pages/Appointment/AppointmentA/AppointmentA';
import Appointment_hu from './component/pages/Appointment/Appointment_hu/Appointment_hu';
import Requests from './component/pages/employee/Requests';
import Penalty from './component/pages/admin/Penalty';
import AddPenalty from './component/pages/admin/AddPenalty';
import ManagePenalties from './component/pages/admin/managepenalty';
import Guidelines_hu from './component/pages/admin/Guidelines_hu';
import AddUserPage from './component/pages/admin/adduser';
import UpdateUserPage from './component/pages/admin/updateuser';
import BlockUserPage from './component/pages/admin/blockuser';
import ManageUsers from './component/pages/admin/manage';
import AdmissionRequestsPage from './component/pages/employee/acceptrequest';
import Appointment from './component/pages/student/Appointment/Appointment';
import EditJoinRequest from './component/pages/student/EditJoinRequest/EditJoinRequest';
import Instruction from './component/pages/student/Instruction/Instruction';
import JoinRequest from './component/pages/student/JoinRequest/JoinRequest';
import Old from './component/pages/student/Old/Old';
import Enquiry from './component/pages/student/Enquiry/Enquiry';
import New from './component/pages/student/New/New';
import EditNew from './component/pages/student/EditNew/EditNew';
import EditOld from './component/pages/student/EditOld/EditOld';
import HousingPage from './component/pages/admin/housing';
import Managehousing from './component/pages/admin/housing';
import Managebuilding from './component/pages/admin/managebuilding';
import ResetPasswordPage from './component/pages/Signin/ResetPassword';
import UpdateRoomPage from './component/pages/admin/updateroom';
import AddRoomPage from './component/pages/admin/addroom';
import ChatBot from './component/chatbot/chatbot';
import Meals from './cooker/meals';
import Report from './component/pages/admin/report';
import Cities from './component/pages/employee/cities';
import Main from './component/pages/Home/main';
import UserAbsencesPage from './component/pages/student/UserAbsences';
import StudentProfile from './component/pages/student/StudentProfile';
import Complanint from './component/pages/student/complaint';
import Complanints from './component/pages/admin/Complaints';
import Fees from './component/pages/student/fees';
import HousingFees from './component/pages/admin/HousingFees';

const routes = [
  {
    path: "/student",
    element: <Layout />,
    children: [
      { path: "signin", element: <Signin /> },
      { path: "ResetPassword", element: <ResetPasswordPage /> },
      { path: "enquiry", element: <Enquiry /> },
      { path: "complanint", element: <Complanint /> },
      { path: "appointment", element: <Appointment /> },
      { path: "main", element: <Main /> },
      { path: "chatbot", element: <ChatBot /> },
      { path: "userabsences", element: <UserAbsencesPage /> },
      { path: "instruction", element: <Instruction /> },
      { path: "fees", element: <Fees /> },
      {
        path: "joinrequest",
        element: <JoinRequest />,
        children: [
          { path: "old", element: <Old /> },
          { path: "new", element: <New /> }
        ]
      }
    ]
  },
  {
    path: "/",
    element: <AuthenticatedRoute><Layout /></AuthenticatedRoute>,
    children: [
      { path: "", element: <Home /> },
      { path: "signin", element: <Signin /> },
      { path: "StudentProfile", element: <StudentProfile /> },
      { path: "updateroom/:id", element: <UpdateRoomPage /> },
      { path: "adduser", element: <AddUserPage /> },
      { path: "updateuser/:national_id", element: <UpdateUserPage /> },
      { path: "meals", element: <Meals /> },
      { path: "cities", element: <Cities /> },
      { path: "requests", element: <Requests /> },
      { path: "blockuser", element: <BlockUserPage /> },
     
      { path: "housingFees", element: <HousingFees /> },
      { path: "AppointmentA", element: <AppointmentA /> },
      { path: "Appointment_hu", element: <Appointment_hu /> },
      { path: "Penalty", element: <Penalty /> },
      { path: "add-penalty/:userId/:userName", element: <AddPenalty /> },
      { path: "managepenalty", element: <ManagePenalties /> },
      { path: "manage", element: <ManageUsers /> },
      { path: "acceptrequest", element: <AdmissionRequestsPage /> },
      { path: "housing", element: <Managehousing /> },
      { path: "building", element: <Managebuilding /> },
      { path: "report", element: <Report /> },
      { path: "complanints", element: <Complanints /> },
      { path: "addroom/:id", element: <AddRoomPage /> },
      { path: "Guidelines_hu", element: <Guidelines_hu /> },
      {
        path: "editjoinrequest",
        element: <EditJoinRequest />,
        children: [
          { path: 'editNew', element: <EditNew /> },
          { path: 'editOld', element: <EditOld /> }
        ]
      },
      {
        path: "joinrequest",
        element: <JoinRequest />,
        children: [
          { path: "old", element: <Old /> },
          { path: "new", element: <New /> }
        ]
      }
    ]
  }
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout'; // Import từ thư mục Layout
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Doctor from '../pages/Doctor';
import DoctorDetail from '../pages/DoctorDetail';
import Prescription from '../pages/Prescription';
import CreateDoctor from '../components/doctorComponent/createDoctor';
import UpdateInfo from '../components/doctorComponent/updateInfo';
import MedicalHistory from '../pages/MedicalHistory';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route element={<Layout />}>  {/* Không cần path="/" ở đây */}
        <Route index element={<Home />} />
        <Route path="doctor/*" element={<Doctor />} />
        <Route path="doctorDetail/:name" element={<DoctorDetail />} />
        <Route path="prescription" element={<Prescription />} />
        <Route path="createDoctor" element={<CreateDoctor />} />
        <Route path="updateInfo" element={<UpdateInfo />} />
        <Route path="medical-history" element={<MedicalHistory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;

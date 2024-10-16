import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/user_pages/Home";
import Team from "./pages/user_pages/TeamOfExpert";
import Register from "./pages/user_pages/Register";
import Login from "./pages/user_pages/Login";
import BookingPage from "./pages/user_pages/Booking";
import DoctorDetail from "./pages/user_pages/DoctorDetail";
import CreateDoctor from "./components/doctorComponent/createDoctor";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Team />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/doctor/*" element={<DoctorDetail />} />
        <Route path="/createDoctor" element={<CreateDoctor/>}></Route>
      </Routes>
    </Router>
  );
};

export default App;

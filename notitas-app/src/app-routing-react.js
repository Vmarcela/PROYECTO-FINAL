import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login/login-react";
import Register from "./pages/register/register-react";
import Home from './pages/home/home-react';

function AppRoutingReact() {
  return (
    <Router>
      <Routes>
        {/* Ruta de redirección */}
        {/* <Route path="/" element={<Navigate to="/home" />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default AppRoutingReact;

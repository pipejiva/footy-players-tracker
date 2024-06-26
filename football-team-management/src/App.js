import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Login from "./pages/Login";
import PlayersPage from "./pages/Players";
import Register from "./pages/Register";
import Topbar from "./components/topbar";
import { AuthProvider } from "./context/AuthContext";
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Topbar />
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/players" element={<PlayersPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

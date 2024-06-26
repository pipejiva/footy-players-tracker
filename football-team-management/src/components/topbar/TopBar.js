import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Topbar = () => {
  const { isAuthenticated, handleLogout } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  return (
    <div className="topbar">
      <nav className="navbar">
        <ul className="navbar-nav">
          {!isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/players" className="nav-link">
                  Players
                </Link>
              </li>
              <li className="nav-item">
                <button onClick={logout} className="nav-link logout-btn">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Topbar;

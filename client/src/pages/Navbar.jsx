import React, { useContext, useEffect, useMemo } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import store from "../context/context";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  const navigate = useNavigate();

  const { setSelectedUsers } = useContext(store);

  const loggedUserName =
    user?.name.charAt(0).toUpperCase() + user?.name.slice(1);
  const getFirstLetter = user?.name?.split("")[0].toUpperCase();

  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  //logout api
  const handleLogout = async () => {
    try {
      const logoutRes = await axios.get(
        `${import.meta.env.VITE_API_URL}/app/api/logout`,
        { withCredentials: true }
      );

      if (logoutRes?.status == 200) {
        toast.success(logoutRes?.data?.message);
        localStorage.removeItem("loggedUser");
        navigate("/");
        setSelectedUsers(null);
      }
    } catch (err) {
            toast.error(err?.response?.data?.error || "Logout Failed");
    }
  };

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item ">
          <div className="nav-link cursor-pointer" data-widget="pushmenu">
            <i className="fas fa-bars" />
          </div>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        {/* Navbar Search */}
        <li className="nav-item">
          <div className="agent" onClick={togglePopup}>
            <div className="agentN">
              <p className="agentNM">
                <b>{getFirstLetter}</b>
              </p>
            </div>
            <p className="agentNM2">{loggedUserName}</p>
          </div>

          {isOpen && (
            <div className="popup-bottom" style={{ position: "absolute" }}>
              <div className="popup-content">
                <p className="pop" onClick={() => handleLogout()}>
                  logout
                </p>
              </div>
            </div>
          )}
        </li>
      </ul>
      <Toaster />
    </nav>
  );
};

export default Navbar;

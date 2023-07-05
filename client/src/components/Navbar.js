import React, { useState } from "react";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";

const Navbar = () => {
  const { toggleSidebar, logoutUser, user } = useAppContext();
//   console.log(user.name);

  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            type="button"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logoutUser}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;

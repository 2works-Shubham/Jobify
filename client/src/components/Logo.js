import logo from "../assets/images/logo.svg";
import React from "react";

const Logo = (props) => {
  return (
    <nav>
      <img src={logo} alt="jobify" className="logo" />
    </nav>
  );
};

export default Logo;

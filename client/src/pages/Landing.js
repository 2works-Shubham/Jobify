import React from "react";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo, MainLogo } from "../components/index.js";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <Logo className="logo" />
      <div className="container page">
        <div className="info">
          <h1>
            Job <span> Tracking </span>App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
            ducimus illum aut velit sit totam blanditiis saepe aperiam obcaecati
            reprehenderit, quae dolores commodi eos alias vel! Saepe at sed
            odio!
          </p>
          <Link to="/register" className="btn btn-hero">Login/Registration</Link>
        </div>
        <MainLogo />
      </div>
    </Wrapper>
  );
};

export default Landing;

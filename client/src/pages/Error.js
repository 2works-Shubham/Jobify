import React from "react";
import Wrapper from "../assets/wrappers/ErrorPage.js";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/images/not-found.svg";

const Error = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={notFoundImg} alt="not found" />
        <h3>Ohh! Page Not Found</h3>
        <p>We can't seem to find the page you're looking for</p>
        <Link to="/">Back To Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;

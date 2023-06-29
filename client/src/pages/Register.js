import React, { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage.js";
import { FormRow, Logo, Alert } from "../components/index.js";
import { useAppContext } from "../context/appContext.js";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: false,
};

const Register = () => {
  const [values, setValues] = useState(initialState);
  const {  showAlert, displayAlert } = useAppContext();   //isLoading,

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    const { name, email, password, isMember } = values;

    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        {/* form-logo */}
        <Logo />

        {/* form-title */}
        <h3> {values.isMember ? "Login" : "Register"} </h3>

        {showAlert && <Alert />}

        {/* Name input */}
        {!values.isMember && (
          <FormRow
            labelText="Name"
            id="nameId"
            type="text"
            value={values.name}
            name="name"
            handleChange={handleChange}
          />
        )}

        {/* Email input */}
        <FormRow
          labelText="Email"
          id="emailId"
          type="email"
          value={values.email}
          name="email"
          handleChange={handleChange}
        />

        {/* Password input */}
        <FormRow
          labelText="Password"
          id="passwordId"
          type="password"
          value={values.password}
          name="password"
          handleChange={handleChange}
        />

        {/* Submit Button */}
        <button type="submit" className="btn btn-block">
          submit
        </button>

        <p>
          {values.isMember ? "Not a member yet?" : "already a member?"}
          <button type="button" className="member-btn" onClick={toggleMember}>
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

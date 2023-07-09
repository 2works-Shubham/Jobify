import React, { useState } from "react";
import Wrapper from "../../assets/wrappers/DashboardFormPage.js";
import { useAppContext } from "../../context/appContext.js";
import { FormRow, Alert } from "../../components/index.js";

const Profile = () => {
  const { user, updateUser, showAlert, displayAlert, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [lastname, setLastname] = useState(user?.lastname);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !name || !lastname || !location) {
      displayAlert();
      return;
    }

    updateUser({ name, email, lastname, location });
  };

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            labelText="name"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastname"
            value={lastname}
            handleChange={(e) => setLastname(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={(e) => setLocation(e.target.value)}
          />
          <button className="btn bt-block" type="submit" disabled={isLoading}>
            {isLoading?'Please wait...' : 'Save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;

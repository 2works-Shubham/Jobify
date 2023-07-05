// import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

    
const ProtectedRoute = ({ children }) => {
  // const navigate = useNavigate();

  const { user } = useAppContext();
  // user value is not fetched values 
  
  if (!user) {
    return <Navigate to='/landing'/>
  }
  return children;
};

export default ProtectedRoute;

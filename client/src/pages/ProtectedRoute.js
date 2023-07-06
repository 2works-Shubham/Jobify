import React from "react";
import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();
  // user value is not fetched values
  if (!user) {
    return <Navigate to="/register" />
  }
  return children;
};

export default ProtectedRoute;

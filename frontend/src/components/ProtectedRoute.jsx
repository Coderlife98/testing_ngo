import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/authSlice"; // Redux se user ko fetch karna
const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  console.log("Protected Route - User:", user);
  console.log("Token value in protected route", token);

  // Agar user login nahi hai, toh login page pe redirect karo
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  // Agar user login hai, toh jo bhi page wrap kiya hai, usse dikhayenge (children)
  return children;
};

export default ProtectedRoute;

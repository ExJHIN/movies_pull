import { Navigate } from "react-router-dom";
import React from "react";

export const ProtectedRoute = ({ logIn, component: Component,  ...props}) => {
  // console.log(logIn);
  return (
    logIn ? <Component {...props} /> : <Navigate to="/" replace/>
  );
};

import React, { useState, useContext } from "react";
import { LoginForm } from './component/LoginForm'
import { Redirect } from "react-router-dom";
import { AuthProvider } from "../../contexts/AuthProvider";

const Login = (props) => {
  return (
    <AuthProvider>
      <h3> Sign in </h3>
      <LoginForm {...props}/>
    </AuthProvider>
  );
}

export default Login;

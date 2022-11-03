import React from "react";
import LoginForm from "../components/login/LoginForm";

import classes from "./Login.module.css";
const Login = () => {
  return (
    <div className={classes.cover}>
      <LoginForm></LoginForm>
    </div>
  );
};

export default Login;

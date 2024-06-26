import React from "react";
import { useParams } from "react-router-dom";
import useComponents from "../components";

const Login = () => {
  const { type } = useParams();
  const { Login } = useComponents();

  return (
    <div>
      <Login />
    </div>
  );
};

export default Login;

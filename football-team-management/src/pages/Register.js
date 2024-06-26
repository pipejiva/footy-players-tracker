import React from "react";
import { useParams } from "react-router-dom";
import useComponents from "../components";

const Register = () => {
  const { type } = useParams();
  const { Register } = useComponents();

  return (
    <div>
      <Register />
    </div>
  );
};

export default Register;

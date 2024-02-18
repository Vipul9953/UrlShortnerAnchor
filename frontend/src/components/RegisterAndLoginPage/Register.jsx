
import {  Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Register.css";
import { registerUser } from "../../Actions/User";


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

   

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password));
  };

  useEffect(() => {
    if (error) {
        alert(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error]);
  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
         Anchors
        </Typography>
 

        <input
          type="text"
          value={name}
          placeholder="Name"
          className="registerInputs"
          required
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="registerInputs"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="registerInputs"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Already Sign Up? Login Now</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Register;
import "./Login.css";
import { Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/User";
import React, { useEffect, useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const { error, message } = useSelector((state) => state.user);

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log(message);
    await dispatch(loginUser(email, password));
    console.log(message);
  };

  useEffect(() => {
    if (error) {
     console.log(error);
      alert(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [ error, dispatch, message]);

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Anchors
        </Typography>

        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Link to="/forgot/password">
          <Typography>Forgot Password?</Typography>
        </Link>

        <Button type="submit">Login</Button>

        <Link to="/register">
          <Typography>New User?</Typography>
        </Link>
      </form>
    </div>
  );
};

export default Login;

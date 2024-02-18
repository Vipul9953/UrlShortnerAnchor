import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { resetPassword } from "../../Actions/User";
import "./ResetPassword.css";
const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const dispatch = useDispatch();
  const params = useParams();
  const { error, loading, message } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, newPassword));
  };

  useEffect(() => {
    if (error) {   
      alert(error);
      dispatch({ type: "clearErrors" });
    }

    if (message) {
      alert(message);
      dispatch({ type: "clearMessage" });
    }
  }, [error, dispatch, message]);

  return (
    <div className="resetPassword">
      <form className="resetPasswordForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Anchors
        </Typography>

        <input
          type="password"
          placeholder="New Password"
          required
          className="updatePasswordInputs"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Link to="/">
          <Typography>Login</Typography>
        </Link>
        <Typography>Or</Typography>

        <Link to="/forgot/password">
          <Typography>Request Another Token!</Typography>
        </Link>

        <Button disabled={loading} type="submit">
          Reset Password
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
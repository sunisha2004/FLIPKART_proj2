import React, { useState } from "react";
import axios from "axios";
import "./ResetPass.scss";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const navigate=useNavigate()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem("email");

    if (!email) {
      alert("Email not found. Please verify your email first.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
        let pass=password
        let cpass=confirmPassword
      const res = await axios.put("http://localhost:3001/api/updatePassword", {
          pass,
          cpass,
          email,
      });

      if (res.status === 201) {
        alert(res.data.msg);
        localStorage.removeItem("email")
        navigate('/login')
      } else {
        alert("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.msg) {
        alert(error.response.data.msg);
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="reset-password">
      <div className="reset-password-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              required
              placeholder="Enter new password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              placeholder="Confirm new password"
            />
          </div>
          <button type="submit" className="btn-reset">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

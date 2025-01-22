import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    pass: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      console.log(formData);

      const res = await axios.post("http://localhost:3002/api/login", formData);

      if (res.status === 201) {
        localStorage.setItem("token", res.data.token); 
        alert("Successfully logged in!");
        navigate("/"); 
      }
    } catch (error) {
      console.error(error);

      setError(error.response?.data?.msg || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        {error && <p className="error-message">{error}</p>} 

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              name="pass"
              placeholder="Password"
              value={formData.pass}
              onChange={handleChange}
              required
            />
          </div>
          <div className="forgot-link">
            <Link to="/verifyEmail">Forgot password?</Link>
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="signup-link">
          <p>
            New to Flipkart? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

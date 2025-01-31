import React, { useState } from 'react';
import axios from 'axios';
import './Register.scss';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: localStorage.getItem('email'),
    phone: '',
    accType: '',
    pwd: '',
    cpwd: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.accType === '') {
      setError('Please select a valid account type.');
      return;
    }

    if (formData.pwd !== formData.cpwd) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3002/api/adduser', {
        username: formData.name,
        email: formData.email,
        phone: formData.phone,
        accType: formData.accType,
        pwd: formData.pwd,
        cpwd: formData.cpwd
      });

      if (response.status === 201) {
        setSuccess('Registration successful!');
        setError('');
        navigate('/login');
      }
    } catch (err) {
      setError(err.response?.data?.msg || 'Something went wrong. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Account Type</label>
            <select
              name="accType"
              value={formData.accType}
              onChange={handleChange}
              required
            >
              <option value="">Select Account type</option>
              <option value="Buyer">Buyer</option>
              <option value="Seller">Seller</option>
            </select>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="pwd"
              value={formData.pwd}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="cpwd"
              value={formData.cpwd}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
        <p className="login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;

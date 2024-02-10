import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if both username and password are filled
    if (formData.username && formData.password) {
      // Perform any necessary form validation or data processing here
      // ...

      // Redirect to the dashboard route
      navigate('/addBooks');
    } else {
      // Display an error or alert indicating that both fields are required
      alert('Both username and password are required');
    }
  };

  return (
    <div>
      <div className="login-form">
        <h2>Register </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <p className="registration-info">
           Register to Bookwise to add new Books. 
          </p>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

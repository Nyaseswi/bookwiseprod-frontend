import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [emailError, setEmailError] = useState('');


  const handleInputChange = (event) => {
    const { name, value } = event.target;

     // Perform additional validation for email field
    if (name === 'email' && !value.includes('@')) {
      // If "@" is not present in the entered value, set an error message or handle it as you wish
      // For demonstration purposes, I'm setting a state variable to hold the error message
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError(''); // Clear any previous error message
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if both email and password are filled
    if (formData.email.trim() && formData.password.trim() && !emailError) {
      // Perform any necessary form validation or data processing here
      // ...
      try {
        const response = await fetch('https://walrus-app-dnd4q.ondigitalocean.app/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          // Redirect to the dashboard route
           navigate('/addBooks');
        }else {
          // Handle error response from the server
          const errorData = await response.json();
          alert(errorData.message); // Assuming your API returns an error message
        } 
    }catch (error) {
      // Handle network errors
      console.error('Error:', error);
      alert('An error occurred while registering. Please try again later.');
    }

    } else {
      // Display an error or alert indicating that both fields are required
      alert('Both email and password are required');
    }
  };

  
  return (
    <div>
      <div className="login-form">
        <h2>Register </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={emailError ? 'error-input': ''}
          />
          {emailError && <p className="error">{emailError}</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={emailError ? 'error-input': ''}
          />

          <p className="registration-info">
           Register to Bookwise to add new Books. 
          </p>


          <button type="submit" disabled={emailError}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Register;

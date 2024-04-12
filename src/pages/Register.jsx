import React, { useContext, useState, useEffect } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode'; // Change the import statement
import { AuthContext } from '../App';


const Register = () => {
  const navigate = useNavigate();
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext); // State to track login status
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
  });

  const [emailError, setEmailError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email' && !value.includes('@')) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const storeTokenInLocalStorage = (token) => {
    localStorage.setItem('token', token);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (formData.email.trim() && formData.password.trim() && !emailError) {
      try {
        const { data } = await axios.post(
          'https://bookwse.online/api/users/register',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (data.message === 'User added successfully') {
          let userRole; // Get the role from the decoded token
          console.log("====> jwt token ====>"+data.token);

          if(data.token) {
            console.log("======================== token found ready to decode ===================================")
            const decodedToken = jwtDecode(data.token); // Decode the token
            userRole = decodedToken.role;
            storeTokenInLocalStorage(data.token);
            setIsAuthenticated(true); // Update login status
            console.log("userrole ==>", userRole);

          }else if (!data.token){
            toast.error("invalid user")
          }

          toast.success('User registered successfully. You can now add books.');

          if (userRole === "reader"){
            navigate("/books")
          }else if (userRole === "author"){
            navigate("/addBooks")
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setIsAuthenticated(true); // Update login status
            toast.error(error.response.data.error + ". Please login");
            // Reset form data when navigating back to register screen
            setFormData({ email: '', password: '', role: '' });
            navigate('/register');
          }
        } else {
          alert('An error occurred while registering. Please try again later.');
        }
      }
    } else {
      alert('Both email and password are required');
    }
  };
  
  const handleLoginClick = async (event) => {
    event.preventDefault();
  
    if (formData.email.trim() && formData.password.trim() && formData.role && !emailError) {
      try {
        const { data } = await axios.post(
          'https://bookwse.online/api/users/login',
          formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (data.message === 'Login successful') {

          let userRole; // Get the role from the decoded token

          if(data.token) {
            const decodedToken = jwtDecode(data.token); // Decode the token
            userRole = decodedToken.role;
            setIsAuthenticated(true); // Update login status

            console.log("userrole ==>", userRole);
            storeTokenInLocalStorage(data.token);


            console.log("========= in register setloggedin  ====== ", setIsAuthenticated);
            console.log("========= in register loggedin  ====== ", isAuthenticated);

          }else if (!data.token){
            toast.error("invalid user")
          }

          toast.success('User logged in.');

          if (userRole === "reader"){
            navigate("/books")
          }else if (userRole === "author"){
            navigate("/addBooks")
          }
          
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 400) {
            setIsAuthenticated(true); // Update login status

            toast.error(error.response.data.error + ". Please enter valid details");
            // Reset form data when navigating back to register screen
            setFormData({ email: '', password: '',role: '' });
            navigate('/register');
          }
        } else {
          alert('An error occurred while registering. Please try again later.');
        }
      }
    } else {
      alert('Both email and password are required');
    }  
};

  useEffect(() => {
    // Reset form data when component mounts
    setFormData({ email: '', password: '', role: '' });

    console.log("========= in register loggedin useeffect  ====== ", isAuthenticated);

  }, [isAuthenticated]);

  return (
    <div className="background-container login-container" >
      <div className="login-form">
        <h2 style={{ fontWeight: 'bold'}}>
        Register 
        </h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" style={{fontWeight:'bold', color: 'black'}} >Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={emailError ? 'error-input' : ''}
          />
          {emailError && <p className="error">{emailError}</p>}

          <label htmlFor="password" style={{fontWeight:'bold', color: 'black'}}>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className={emailError ? 'error-input' : ''}
          />
           <label htmlFor="role" style={{ fontWeight: 'bold', color: 'black' }}>Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
            style={{width: '100%'}}
          >
            <option value="">Select Role</option>
            <option value="author">Author</option>
            <option value="reader">Reader</option>
          </select>
          
          <p className="registration-info" style={{ fontWeight: 'bold', fontSize: '18px' }}>
            Register to Bookwise to add new Books.
          </p>
      
       <div className="button-container align-center">
        <button type="submit" disabled={emailError} style={{ marginRight: '10px' }}>
        Submit
      </button>
      <button type="button" onClick={handleLoginClick} style={{ marginLeft: '5px' }}>
        Login
      </button>
      </div>

        </form>
      </div>
    </div>
  );
};

export default Register;

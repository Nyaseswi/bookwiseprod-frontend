import React from 'react';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode as a named export

const Dashboard = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token); // Use jwtDecode function
  const { email, role } = decodedToken;

  // Extracting user name from email
  const userName = email.split('@')[0];

  return (
    <div className="bg-dark" style={{ minHeight: '90vh', backgroundImage: `url('https://shorturl.at/osBKM')`, height: '30vh', backgroundRepeat:'no-repeat' }}>
      <div className="d-flex justify-content-end align-items-end py-3">
        <div className='profileCard'>
          <p>
            Name: {userName}
          </p>
          <p>
            Email: {email}
          </p>
          <p>
            Role: {role}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

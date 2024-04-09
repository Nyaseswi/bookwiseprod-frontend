import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { jwtDecode } from 'jwt-decode'; // Change the import statement

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigateTo = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear token from local storage
    setIsAuthenticated(false); // Update authentication status
    navigateTo("/"); // Navigate to home page after logout
  };

  console.log("==== is isAuthenticated === ", isAuthenticated);
  const token = localStorage.getItem('token'); // Assuming your token is stored in localStorage
  let userRole = 'reader';
  if (token) {
    const decodedToken = jwtDecode(token);
    userRole = decodedToken.role;
  }


  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container">
      <Link className="navbar-brand text-light" to="/" style={{ fontWeight: 'bold', fontSize: '25px', fontFamily: 'Arial' }}>
          BookWise
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
<ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center">
  <li className="nav-item">
    <div className="input-group mr-3">
      {/* <input type="text" className="form-control" placeholder="Search for your favourite" /> */}
    </div>
  </li>
  <NavItem to="/books" label="Books" currentPath={location.pathname} isBold fontSize={16} />
  {isAuthenticated && userRole === "author" && (
    <NavItem to="/dashboard" label="Dashboard" currentPath={location.pathname} isBold fontSize={16} />

  )}
  {isAuthenticated && userRole === "author" && (
    <NavItem to="/addBooks" label="AddBook" currentPath={location.pathname} isBold fontSize={16} />

  )}  
  {isAuthenticated && (
    <li className="nav-item"> {/* Wrap the logout button in an <li> element */}
      <button className="nav-link btn btn-link text-light" onClick={handleLogout} 
      style={{fontWeight: 'bold', fontSize: '16px'}} >Logout</button>
    </li>
  )}
  {/* Other navigation items */}
</ul>
</div>

      </div>
    </nav>
  );
};

const NavItem = ({ to, label, currentPath, isBold, fontSize }) => {
  const isActive = to === currentPath;

  return (
    <li className="nav-item">
      <Link 
        className={`nav-link text-light ${isActive ? 'active' : ''}`} 
        to={to} 
        style={{ 
          fontWeight: isBold ? 'bold' : 'normal', 
          fontSize: fontSize ? `${fontSize}px` : 'inherit',
          fontFamily: 'Arial'
        }}
      >
        {label}
      </Link>
    </li>
  );
};


export default Navbar;

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
  
    <nav className="navbar navbar-expand-lg bg-light ">
      <div className="container" style={{borderBottom: "1px solid purple"}}>
        {/* <a className="navbar-brand" href="#">
          BookWise
        </a> */}
        <button className="navbar-brand" style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
  BookWise
</button>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Link className="nav-item nav-link active text-black" to='/'>
                Home
            </Link>
            <Link className="nav-item nav-link active text-black" to='/books'>
                Books 
            </Link>
            {/* <Link className="nav-item nav-link active text-black" to='/addBooks'>
                Add Books
            </Link> */}
            <Link className="nav-item nav-link active text-black" to='/register'>
                Register
            </Link>
            
           

          </ul>
          
        </div>
      </div>
      
    </nav>
  );
};

export default Navbar;

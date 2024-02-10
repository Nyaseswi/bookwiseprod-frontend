import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='Home-page bg-dark text-white container-fluid d-flex justify-content-center align-items-center'>
    <div className='row container'>
        <div className='col-lg-6 d-flex justify-content-center align-items-start flex-column' style={{height:'90vh'}}>
            <h2 style={{fontSize:"70px"}}>Book Store For You</h2>
            <p style={{color:"sliver"}}> checkout the books from here click on view... </p>
            <Link to='/books' className='viewBook my-3'>View Books</Link>
        
        </div>
        <div className='col-lg-6 d-flex justify-content-center align-items-end flex-column'style={{height:'90vh'}}> 
        <img className='img-fluid homeimg' 
        src='https://img.freepik.com/premium-vector/set-vector-detailed-flat-design-bookstore-facade-interior_260869-29.jpg?w=740'
        alt='book'
        >
        </img>
        </div>

    </div>
    </div>
      )}

export default Home;

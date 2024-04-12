import React, {useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import { AuthContext } from '../App';

const BooksSection = ({ data, userRole, onDelete }) => {
  return (
    <div className='d-flex justify-content-around align-items-center flex-wrap my-3 '>
      {data && Array.isArray(data) && data.length > 0 &&  
        data.map((item, index) => (
          <div
            key={index}
            className='card my-3'
            style={{
              width: '200px',
              height: '350px',
              border: '5px solid black',
              borderRadius: '20px',
            }}
          >
            <div>
              <img
                style={{
                  width: '200px',
                  height: '210px',
                  borderTopLeftRadius: '20px',
                  borderTopRightRadius: '20px',
                }}
                className='img-fluid'
                src={item.image}
                alt='/'
              />
            </div>
            <b>
              {item.author}{' '}
              {userRole === 'author' && (
                <FontAwesomeIcon
                  icon={faTrash}
                  className='fas fa-trash-alt'
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => onDelete(item._id)} 
                />
              )}
            </b>
            <h6 style={{ fontSize: '12px' }} className='px-2 m-1 text-sliver'>
              {item.name.slice(0, 20)}
            </h6>
            <b style={{ color: 'red' }} className='mb-2 px-2'>
              Rs.{item.price}
            </b>
            <p>{item.description.slice(0, 50)}</p>
          </div> 
        ))}
      {(!data || !Array.isArray(data) || data.length === 0) && (
        <div>No books available</div>
      )}
    </div>
  );
};

const BooksSectionWithUserRole = ({ data }) => {
  const navigate = useNavigate(); // Initialize navigate hook
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [booksData, setBooksData] = useState(data);
  const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext); // State to track login status


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUserRole(decoded.role);
      setIsAuthenticated(true); // Set isAuthenticated to true
      if (!data || data.length === 0) {
        fetchBooksData(); // Call fetchBooksData only if initial data is empty
      }
    }
  }, [data,isAuthenticated, setIsAuthenticated]);

  const fetchBooksData = async () => {
    try {
      const response = await fetch('https://bookwse.online/api/v1/getBooks');
      if (response.ok) {
        const data = await response.json();
        setBooksData(data); 
      } else {
        console.error('Failed to fetch books data');
      }
    } catch (error) {
      console.error('Error fetching books data:', error);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const confirmation = await toast.promise(
        new Promise((resolve, reject) => {
          toast.error(
            <div>
              <p>Are you sure you want to delete this book?</p>
              <button onClick={() => resolve(true)}>Yes</button>
              <button onClick={() => reject(false)}>No</button>
            </div>,
            { duration: 10000 }
          );
        }),
        {
          loading: 'Waiting for confirmation...',
        }
      );

      if (confirmation) {
        toast.dismiss();
        const response = await fetch(`https://bookwse.online/api/v1/deleteBook/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          toast.success('book deleted successfully.');
          navigate("/books")
          window.location.reload();
          setIsAuthenticated(true);
        } else {
          console.error('Failed to delete book');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      setLoading(false);
      toast.error('Please try again to delete the book');
    }
  };

  // useEffect(() => {
  // }, [isAuthenticated]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <BooksSection data={booksData} 
        userRole={userRole} onDelete={handleDelete} 
        />
      )}
    </>
  );
};

export default BooksSectionWithUserRole;

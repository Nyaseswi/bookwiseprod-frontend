// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import BooksSection from '../components/BooksSection';

// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('http://localhost:8085/api/v1/getBooks');
//         setBooks(response.data.books);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching books:', error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   useEffect(() => {
//     if (loading || books.length === 0) {
//       console.log("======= empty data ==========")
//       return;
//     }
  
//     if (searchQuery.trim() === '') {
//       setFilteredBooks(books);
//       return;
//     }
  
//     const filtered = books.filter(book => 
//       (book.name && book.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
//       (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()))
//     );

//     setFilteredBooks(filtered);
//   }, [searchQuery, books, loading]);

//   const handleSearchChange = event => {
//       const query = event.target.value;
//       console.log('Search query:', query); // Add this line for debugging

//     setSearchQuery(query);
//   };

//   return (
//     <div className="bg-dark" style={{ minHeight: '90vh' }}>
//       <div className="d-flex justify-content-center align-items-center py-3">
//         <h4 className="text-white">Books Section</h4>
//       </div>
//       <div className="input-group mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search for your favorite"
//           value={searchQuery}
//           onChange={handleSearchChange}
//         />
//       </div>
//       {loading ? (
//         <div className="text-white">Loading...</div>
//       ) : (
//         filteredBooks.length > 0 ? (
//           <BooksSection data={filteredBooks} />
//         ) : (
//           <div className="text-white">No matching books found.</div>
//         )
//       )}
//     </div>
//   );
// };

// export default Books;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BooksSection from '../components/BooksSection';
import toast from "react-hot-toast";


const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        // if (!token) {
        //   throw new Error('JWT token not found');
        // }

        const response = await axios.get('http://15.206.91.234:8085/api/users/userDetails', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("==== response of get user =====", response)
        if (response.message === "User found") {

          toast.success('Welcome to bookwise!');

        // Proceed fetching books only if the user exists
        }
        fetchBooks();

      } catch (error) {
        // if(error.response.status === 400) {
          toast.error(error.response + ". Please login");
          console.error('User not found:', error);
          history('/register'); // Redirect to register screen if JWT token not found
        // }

      }
    };

    getProfile();
  }, [history]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://15.206.91.234:8085/api/v1/getBooks');
      setBooks(response.data.books);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    if (loading || books.length === 0) {
      console.log("======= empty data ==========")
      return;
    }
  
    if (searchQuery.trim() === '') {
      setFilteredBooks(books);
      return;
    }
  
    const filtered = books.filter(book => 
      (book.name && book.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.author && book.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    setFilteredBooks(filtered);
  }, [searchQuery, books, loading]);

  const handleSearchChange = event => {
      const query = event.target.value;
      console.log('Search query:', query); // Add this line for debugging

    setSearchQuery(query);
  };

  return (
    <div className="bg-dark" style={{ minHeight: '90vh' }}>
      <div className="d-flex justify-content-center align-items-center py-3">
        <h4 className="text-white">Books Section</h4>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for your favorite"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <div className="text-white">  Loading...</div>
      ) : (
        filteredBooks.length > 0 ? (
          <BooksSection data={filteredBooks} />
        ) : (
          <div className="text-white">No matching books found.</div>
        )
      )}
    </div>
  );
};

export default Books;

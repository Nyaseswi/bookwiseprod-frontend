// Dashboard.js

import React from 'react';
import './Home.css';

const Dashboard = () => {
    const books = [
        { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
        { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' },
        { id: 3, title: '1984', author: 'George Orwell' },
        { id: 4, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling' },
        { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien' },
        { id: 6, title: 'The Catcher in the Rye', author: 'J.D. Salinger' },
        // Add more books as needed
      ];
    
      return (
        <div className="dashboard-container">
          <h1>Book Dashboard</h1>
          <p>Add more books as needed</p>
          <table className="book-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };
    
    export default Dashboard;
    
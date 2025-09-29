import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const MyBooks = ({ user, onLogout }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const response = await axios.get('/api/books/my-books');
      setBooks(response.data);
    } catch (error) {
      setMessage('Error fetching your books');
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (bookId, currentStatus) => {
    try {
      await axios.put(`/api/books/${bookId}`, {
        available: !currentStatus
      });
      setMessage('Book availability updated!');
      fetchMyBooks();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating book');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading">Loading your books...</div>;

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="container">
        <h1>My Books</h1>
        {message && <div className="alert alert-success">{message}</div>}
        
        <div className="books-grid">
          {books.map(book => (
            <div key={book._id} className="book-card">
              {book.image && (
                <img 
                  src={`http://localhost:5000/uploads/${book.image}`} 
                  alt={book.title}
                  className="book-image"
                />
              )}
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">by {book.author}</p>
              <span className="book-condition">Condition: {book.condition}</span>
              <div style={{ marginTop: '15px' }}>
                <span style={{ 
                  padding: '4px 8px', 
                  backgroundColor: book.available ? '#27ae60' : '#e74c3c',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '12px'
                }}>
                  {book.available ? 'Available' : 'Not Available'}
                </span>
              </div>
              <button 
                onClick={() => toggleAvailability(book._id, book.available)}
                className={`btn ${book.available ? 'btn-danger' : 'btn-success'}`}
                style={{ marginTop: '10px' }}
              >
                {book.available ? 'Mark as Unavailable' : 'Mark as Available'}
              </button>
            </div>
          ))}
        </div>
        
        {books.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>You haven't added any books yet</h3>
            <p>Start sharing your books with the community!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooks;
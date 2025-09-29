import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-brand">
          <Link to="/dashboard" className="nav-link">BookSwap</Link>
        </div>
        <div className="nav-links">
          <Link 
            to="/dashboard" 
            className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/books" 
            className={`nav-link ${location.pathname === '/books' ? 'active' : ''}`}
          >
            Browse Books
          </Link>
          <Link 
            to="/add-book" 
            className={`nav-link ${location.pathname === '/add-book' ? 'active' : ''}`}
          >
            Add Book
          </Link>
          <Link 
            to="/my-books" 
            className={`nav-link ${location.pathname === '/my-books' ? 'active' : ''}`}
          >
            My Books
          </Link>
          <Link 
            to="/requests" 
            className={`nav-link ${location.pathname === '/requests' ? 'active' : ''}`}
          >
            Requests
          </Link>
          <span style={{ color: 'white', margin: '0 10px' }}>Hello, {user?.username}</span>
          <button onClick={onLogout} className="btn btn-secondary">Logout</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const Dashboard = ({ user, onLogout }) => {
  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="container">
        <h1>Welcome to BookSwap, {user?.username}!</h1>
        <div style={{ marginTop: '30px' }}>
          <h2>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            <Link to="/books" className="nav-link" style={{ background: '#3498db', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '8px', textDecoration: 'none' }}>
              <h3>Browse Books</h3>
              <p>Discover books available for exchange</p>
            </Link>
            <Link to="/add-book" className="nav-link" style={{ background: '#27ae60', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '8px', textDecoration: 'none' }}>
              <h3>Add a Book</h3>
              <p>Share your books with the community</p>
            </Link>
            <Link to="/my-books" className="nav-link" style={{ background: '#e67e22', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '8px', textDecoration: 'none' }}>
              <h3>My Books</h3>
              <p>Manage your book collection</p>
            </Link>
            <Link to="/requests" className="nav-link" style={{ background: '#9b59b6', color: 'white', padding: '30px', textAlign: 'center', borderRadius: '8px', textDecoration: 'none' }}>
              <h3>Requests</h3>
              <p>View book exchange requests</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Dashboard from './components/Dashboard.jsx';
import BookList from './components/BookList.jsx';
import AddBook from './components/AddBook.jsx';
import MyBooks from './components/MyBooks.jsx';
import Requests from './components/Requests.jsx';
import './App.css';

axios.defaults.baseURL = 'https://bookswap-marketplace-5ly6.onrender.com';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  }, [token]);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token);
    setUser(user);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!token ? <Login onLogin={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/register" 
            element={!token ? <Register onLogin={login} /> : <Navigate to="/dashboard" />} 
          />
          <Route 
            path="/dashboard" 
            element={token ? <Dashboard user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/books" 
            element={token ? <BookList user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/add-book" 
            element={token ? <AddBook user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/my-books" 
            element={token ? <MyBooks user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/requests" 
            element={token ? <Requests user={user} onLogout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/" 
            element={<Navigate to={token ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
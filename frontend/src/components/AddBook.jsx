import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';

const AddBook = ({ user, onLogout }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    condition: 'Good'
  });
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('author', formData.author);
    submitData.append('condition', formData.condition);
    if (image) {
      submitData.append('image', image);
    }

    try {
      await axios.post('/api/books', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Book added successfully!');
      setFormData({ title: '', author: '', condition: 'Good' });
      setImage(null);
      document.getElementById('image').value = '';
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error adding book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="container">
        <div className="form-container">
          <h2>Add a New Book</h2>
          {message && (
            <div className={`alert ${message.includes('successfully') ? 'alert-success' : 'alert-error'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Author:</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Condition:</label>
              <select
                name="condition"
                value={formData.condition}
                onChange={handleChange}
                required
              >
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Very Good">Very Good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
              </select>
            </div>
            <div className="form-group">
              <label>Book Image:</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Adding Book...' : 'Add Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
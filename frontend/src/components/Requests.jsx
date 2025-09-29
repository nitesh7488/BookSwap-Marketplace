import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';

const Requests = ({ user, onLogout }) => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('received');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const [receivedResponse, sentResponse] = await Promise.all([
        axios.get('/api/requests/received'),
        axios.get('/api/requests/sent')
      ]);
      setReceivedRequests(receivedResponse.data);
      setSentRequests(sentResponse.data);
    } catch (error) {
      setMessage('Error fetching requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      await axios.put(`/api/requests/${requestId}`, {
        status: action
      });
      setMessage(`Request ${action} successfully!`);
      fetchRequests();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error updating request');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  if (loading) return <div className="loading">Loading requests...</div>;

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <div className="container">
        <h1>Book Requests</h1>
        {message && <div className="alert alert-success">{message}</div>}
        
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setActiveTab('received')}
            className={`btn ${activeTab === 'received' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ marginRight: '10px' }}
          >
            Received Requests ({receivedRequests.length})
          </button>
          <button 
            onClick={() => setActiveTab('sent')}
            className={`btn ${activeTab === 'sent' ? 'btn-primary' : 'btn-secondary'}`}
          >
            Sent Requests ({sentRequests.length})
          </button>
        </div>

        {activeTab === 'received' && (
          <div>
            <h2>Requests for Your Books</h2>
            <div className="requests-list">
              {receivedRequests.map(request => (
                <div key={request._id} className="request-card">
                  <h3>{request.book.title}</h3>
                  <p>by {request.book.author}</p>
                  <p>Requested by: {request.requester.username}</p>
                  {request.message && (
                    <p><strong>Message:</strong> {request.message}</p>
                  )}
                  <span className={`request-status status-${request.status}`}>
                    {request.status.toUpperCase()}
                  </span>
                  
                  {request.status === 'pending' && (
                    <div className="request-actions">
                      <button 
                        onClick={() => handleRequestAction(request._id, 'accepted')}
                        className="btn btn-success"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => handleRequestAction(request._id, 'declined')}
                        className="btn btn-danger"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {receivedRequests.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h3>No requests received yet</h3>
                <p>When someone requests your books, they'll appear here.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'sent' && (
          <div>
            <h2>Requests You've Sent</h2>
            <div className="requests-list">
              {sentRequests.map(request => (
                <div key={request._id} className="request-card">
                  <h3>{request.book.title}</h3>
                  <p>by {request.book.author}</p>
                  <p>Owner: {request.book.owner.username}</p>
                  {request.message && (
                    <p><strong>Your Message:</strong> {request.message}</p>
                  )}
                  <span className={`request-status status-${request.status}`}>
                    {request.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
            
            {sentRequests.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <h3>No requests sent yet</h3>
                <p>When you request books from others, they'll appear here.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Requests;
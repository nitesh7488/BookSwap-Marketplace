# BookSwap Marketplace

A full-stack web application for exchanging used books between users. Users can register, login, post books for exchange, browse available books, send requests, and manage incoming/outgoing requests.

## Features

### User Authentication
- User registration and login with JWT authentication
- Secure password hashing with bcrypt
- Protected routes for authenticated users

### Book Management
- Add books with title, author, condition, and image upload
- Browse available books posted by other users
- Manage personal book collection (mark as available/unavailable)
- Image upload support for book photos

### Book Exchange System
- Send book request messages to book owners
- Receive and manage incoming requests
- Accept or decline requests
- Automatic availability management when requests are accepted

### Dashboard
- Quick access to all main features
- User-friendly navigation

## Tech Stack

### Frontend
- React 18.2.0
- React Router DOM 6.15.0 for routing
- Axios for API calls
- Vite for build tool and development server
- CSS for styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- Multer for file uploads
- bcryptjs for password hashing
- CORS for cross-origin requests

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bookswap-marketplace
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:

Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/bookswap
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
```

5. Ensure MongoDB is running on your system.

## Usage

1. Start the backend server:
```bash
cd backend
npm start
```
The backend will run on http://localhost:5000

2. Start the frontend development server:
```bash
cd frontend
npm start
```
The frontend will run on http://localhost:5173

3. Open your browser and navigate to http://localhost:5173

4. Register a new account or login with existing credentials

5. Start adding books, browsing, and making requests!

## API Endpoints

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### Books
- `POST /api/books` - Add a new book (authenticated)
- `GET /api/books` - Get all available books
- `GET /api/books/my-books` - Get user's own books (authenticated)
- `PUT /api/books/:id` - Update book availability (authenticated)

### Requests
- `POST /api/requests` - Send a book request (authenticated)
- `GET /api/requests/received` - Get received requests (authenticated)
- `GET /api/requests/sent` - Get sent requests (authenticated)
- `PUT /api/requests/:id` - Update request status (authenticated)

## Database Schema

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date
}
```

### Book
```javascript
{
  title: String (required),
  author: String (required),
  condition: String (required),
  image: String,
  owner: ObjectId (ref: User, required),
  available: Boolean (default: true),
  createdAt: Date
}
```

### BookRequest
```javascript
{
  book: ObjectId (ref: Book, required),
  requester: ObjectId (ref: User, required),
  status: String (enum: ['pending', 'accepted', 'declined'], default: 'pending'),
  message: String,
  createdAt: Date
}
```

## File Structure

```
bookswap-marketplace/
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── .env
│   └── uploads/ (for book images)
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── components/
│   │       ├── Login.jsx
│   │       ├── Register.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Header.jsx
│   │       ├── BookList.jsx
│   │       ├── AddBook.jsx
│   │       ├── MyBooks.jsx
│   │       └── Requests.jsx
│   └── public/ (static assets)
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React and Express.js
- Uses MongoDB for data persistence
- JWT for secure authentication
- Responsive design with CSS

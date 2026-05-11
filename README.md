# Blog Application

A full-stack blog application built with React and Node.js/Express with PostgreSQL.

## Features

- **Authentication**: User registration, login, and logout with JWT tokens (httpOnly cookies)
- **Posts**: Create, read, update, and delete blog posts with rich text editor
- **Categories**: Filter posts by category (Art, Science, Technology, Cinema, Design, Food)
- **Comments**: Add and delete comments on posts
- **Likes**: Like/unlike posts
- **Image Upload**: Upload images for blog posts
- **User Profiles**: View and update user profiles
- **Related Posts**: See related posts by category on the single post page

## Tech Stack

- **Frontend**: React 18, React Router v6, React Quill (rich text), Axios, SCSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Auth**: JWT + bcrypt with httpOnly cookies

## Prerequisites

- Node.js (v16+)
- PostgreSQL (v14+)

## Setup

### 1. Database Setup

```bash
# Create PostgreSQL user and database
sudo -u postgres psql -c "CREATE USER blog_user WITH PASSWORD 'blog_password';"
sudo -u postgres psql -c "CREATE DATABASE blog_db OWNER blog_user;"
```

### 2. Backend Setup

```bash
cd api
cp .env.example .env  # Edit .env with your database credentials and JWT secret
npm install
npm run init-db       # Creates all database tables
npm run dev           # Starts backend on port 8000
```

### 3. Frontend Setup

```bash
# From root directory
npm install
npm start             # Starts frontend on port 3000
```

The frontend proxies API requests to `http://localhost:8000`.

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Posts
- `GET /api/posts` - Get all posts (optional `?cat=category` filter)
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (authenticated)
- `PUT /api/posts/:id` - Update post (authenticated, owner only)
- `DELETE /api/posts/:id` - Delete post (authenticated, owner only)

### Comments
- `GET /api/comments/:postId` - Get comments for a post
- `POST /api/comments` - Add comment (authenticated)
- `DELETE /api/comments/:id` - Delete comment (authenticated, owner only)

### Likes
- `GET /api/likes/:postId` - Get likes for a post
- `POST /api/likes` - Toggle like (authenticated)

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile (authenticated, owner only)

### Upload
- `POST /api/upload` - Upload an image file

## Project Structure

```
blog/
├── api/                    # Backend
│   ├── controllers/        # Route handlers
│   │   ├── auth.js
│   │   ├── comments.js
│   │   ├── likes.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── routes/             # Express routes
│   │   ├── auth.js
│   │   ├── comments.js
│   │   ├── likes.js
│   │   ├── posts.js
│   │   └── users.js
│   ├── upload/             # Uploaded images
│   ├── db.js               # PostgreSQL connection pool
│   ├── index.js            # Express app entry point
│   ├── init-db.js          # Database table creation script
│   └── package.json
├── src/                    # Frontend (React)
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Menu.jsx
│   │   └── Navbar.jsx
│   ├── context/
│   │   └── authContext.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Single.jsx
│   │   └── Write.jsx
│   ├── styles.scss
│   └── App.js
└── package.json
```

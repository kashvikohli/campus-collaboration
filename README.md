# Real-Time Campus Collaboration and Communication Platform

Backend project using Node.js, Express, MongoDB/Mongoose, JWT and Socket.IO.

## Requirements
- Node.js 18+
- MongoDB local installation or MongoDB Atlas connection

## Setup
1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and configure `MONGO_URI` and `JWT_SECRET`.
3. Start in development: `npm run dev`
4. API base: `http://localhost:5000`

## Main features
- User registration and login with bcrypt password hashing
- JWT protected endpoints
- Create and list campus groups; add members
- Group messages stored in MongoDB
- Socket.IO group rooms, typing event and online/offline events
- MVC-style separation into models, controllers and routes

See `src/README_API.md` for endpoint examples.

This is a backend API; a separate frontend can connect to it.

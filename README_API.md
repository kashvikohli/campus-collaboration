# API Quick Reference

Base URL: `http://localhost:5000`

## Authentication
- `POST /api/auth/register` body: `{ "name": "A", "email": "a@example.com", "password": "secret123" }`
- `POST /api/auth/login` body: `{ "email": "a@example.com", "password": "secret123" }`
- `GET /api/auth/me` header: `Authorization: Bearer <token>`

## Groups (Bearer token required)
- `POST /api/groups` body: `{ "name": "Study Group", "description": "DBMS", "members": [] }`
- `GET /api/groups`
- `POST /api/groups/:id/members` body: `{ "userId": "<Mongo user id>" }`

## Messages (Bearer token required)
- `GET /api/messages/:groupId`
- `POST /api/messages/:groupId` body: `{ "text": "Hello team" }`

## Socket.IO
Connect with `auth: { token: "<JWT>" }`.
Events: `joinGroup(groupId)`, `typing(groupId)`, server events `newMessage`, `userTyping`, `userOnline`, `userOffline`.

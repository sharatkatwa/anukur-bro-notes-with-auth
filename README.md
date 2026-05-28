# Todo With Auth

A simple Node.js, Express, MongoDB todo/notes API with JWT-based authentication stored in cookies.

## Features

- Register a user with name and email
- Create a JWT after registration
- Store the JWT in a browser cookie
- Create, read, update, and delete notes
- Validate note titles, descriptions, and MongoDB note IDs
- Store users and notes in MongoDB using Mongoose

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token
- cookie-parser
- dotenv

## Project Structure

```txt
todo-with-auth/
|-- src/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- auth.controller.js
|   |   `-- note.controller.js
|   |-- models/
|   |   |-- note.model.js
|   |   `-- user.model.js
|   |-- routes/
|   |   |-- auth.routes.js
|   |   `-- note.routes.js
|   `-- app.js
|-- server.js
|-- package.json
`-- README.md
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment variables

Create a `.env` file in the project root:

```env
JWT_SECRET=your_secret_key_here
```

### 3. Start MongoDB

Make sure MongoDB is running locally. The project connects to:

```txt
mongodb://localhost:27017/notesAuth
```

### 4. Run the server

For development:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server runs on:

```txt
http://localhost:3000
```

## API Routes

Current routes are mounted under:

```txt
/api/notes
```

### Auth Routes

#### Register User

```http
POST /api/notes/register
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

Successful response:

```json
{
  "message": "user registered successfully",
  "user": {
    "_id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

This also sets a `token` cookie.

#### Login User

```http
POST /api/notes/login
```

Login route exists, but the controller logic is not implemented yet.

### Note Routes

#### Create Note

```http
POST /api/notes
```

Request body:

```json
{
  "title": "My first note",
  "description": "This is my first note description."
}
```

Validation rules:

- `title` is required
- `title` must be at least 3 characters long
- `description` is required
- `description` must be at least 10 characters long
- request must include a valid `token` cookie

#### Get Notes

```http
GET /api/notes
```

Returns notes for the user identified by the JWT cookie.

#### Update Note

```http
PATCH /api/notes/:id
```

Request body:

```json
{
  "description": "Updated note description."
}
```

Validation rules:

- `id` must be a valid MongoDB ObjectId
- `description` must be at least 10 characters long

#### Delete Note

```http
DELETE /api/notes/:id
```

Deletes a note by its MongoDB ObjectId.

## Available Scripts

```bash
npm start
```

Runs the server with Node.js.

```bash
npm run dev
```

Runs the server with Nodemon for development.

```bash
npm test
```

Test script is currently not configured.

## Notes

- The app uses JWT from cookies for authentication.
- MongoDB connection URL is currently written directly in `src/config/db.js`.
- The login controller is currently empty and can be implemented later.
- The create note controller currently calls `NoteModel.create()` without passing note data, so note creation logic may need to be completed.

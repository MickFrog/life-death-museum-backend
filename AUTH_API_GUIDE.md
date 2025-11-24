# Life Death Museum Backend - Authentication API

## Available Endpoints

### Authentication Routes

#### 1. Signup
- **URL:** `POST /auth/signup`
- **Description:** Register a new user
- **Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "your-password"
}
```
- **Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### 2. Login
- **URL:** `POST /auth/login`
- **Description:** Login with existing credentials
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "your-password"
}
```
- **Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "token": "jwt_token_here"
}
```

#### 3. Profile (Protected)
- **URL:** `GET /auth/profile`
- **Description:** Get user profile information
- **Headers:**
```
Authorization: Bearer jwt_token_here
```
- **Response:**
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "theme": {
    "floorColor": "#ffffff",
    "wallColor": "#ffffff",
    "weather": "sunny"
  },
  "invitation": "invitation_string",
  "objectIds": [],
  "modifiedObjectIds": [],
  "createdAt": "2024-01-01T00:00:00.000Z",
  "questionIndex": 2
}
```

#### 4. Verify Token
- **URL:** `GET /auth/verify`
- **Description:** Verify if JWT token is valid
- **Headers:**
```
Authorization: Bearer jwt_token_here
```
- **Response:**
```json
{
  "valid": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

## Authentication Features

### JWT (JSON Web Tokens)
- Include user ID, email, and name in payload
- Use Bearer token authentication for protected routes

### Passport.js Strategies
- **Local Strategy:** Username/password authentication for login
- **JWT Strategy:** Token-based authentication for protected routes

### Password Security
- Passwords are hashed using bcrypt with 10 salt rounds
- Passwords are never returned in API responses

### Error Handling
- Comprehensive error messages for authentication failures
- Proper HTTP status codes (400, 401, 409, 500)

## Testing with cURL

### Signup Example
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### Login Example
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "testpassword123"
  }'
```

### Access Protected Route
```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```


## Environment Setup

Make sure to set the following environment variables in your `.env` file:

```
PORT=3000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CORS_ORIGIN=*
```

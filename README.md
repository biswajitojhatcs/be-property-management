# API Documentation

## **Base URL:** `http://localhost:8080`

## Authentication

### 1. Register

**`POST /auth/register`**

**Request Body:**

```json
{
  "firstName": "Biswajit",
  "lastName": "Ojha",
  "email": "biswajit@email.com",
  "password": "mypassword",
  "role": "PROPERTY_OWNER"
}
```

**Success Status:** `201`

**Response:**

```json
{
  "message": "User registered successfully.",
  "data": {
    "id": 5,
    "firstName": "Biswajit",
    "lastName": "Ojha",
    "email": "biswajit@email.com",
    "role": "PROPERTY_OWNER"
  }
}
```

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

### 2. Login

**`POST /auth/login`**

**Request Body:**

```json
{
  "email": "biswajit@email.com",
  "password": "mypassword"
}
```

**Success Status:** `200`

**Response:**

```json
{
  "id": 5,
  "firstName": "Biswajit",
  "lastName": "Ojha",
  "email": "biswajit@email.com",
  "role": "PROPERTY_OWNER",
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NSwicm9sZSI6IlBST1BFUlRZX09XTkVSIiwiaWF0IjoxNzk1NzAyMzY4LCJleHAiOjE3OTU3MDk1Njh9.doCp16uouWSYIc5_LXGm2qi5k8Z9eeGh94H3S_FBrGM",
  "tokenType": "Bearer"
}
```

## Locations

### 1. State List

**`GET /locations/stateList`**

**Headers:**

```http
Authorization: Bearer <your_jwt_token>
```

**Success Status:** `200`

**Response:**

```json
[
  {
    "id": 1,
    "name": "Andaman and Nicobar Islands",
    "type": "Union Territory"
  },
  {
    "id": 26,
    "name": "Odisha",
    "type": "State"
  }
]
```

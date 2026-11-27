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

### 2. City List

**`GET /locations/cityList/:stateId`**

**Headers:**

```http
Authorization: Bearer <your_jwt_token>
```

**Success Status:** `200`

**Response:**

```json
[
  {
    "id": 100,
    "name": "Bhubaneswar",
    "stateId": 26
  },
  {
    "id": 380,
    "name": "Khordha",
    "stateId": 26
  }
]
```

## Properties

### 1. Create Property

**`POST /properties/create`**

**Headers:**

```http
Authorization: Bearer <your_jwt_token>
Content-Type: multipart/form-data
```

#### Form-Data Payload

| Field           | Value                              |
| :-------------- | :--------------------------------- |
| `title`         | `1BHK in Patia`                    |
| `description`   | `1 Bed room, 1 Hall and 1 Kitchen` |
| `stateId`       | 26                                 |
| `cityId`        | 100                                |
| `address`       | `Patia, Bhubaneswar`               |
| `price`         | 1000                               |
| `noOfBedrooms`  | 1                                  |
| `noOfBathrooms` | 1                                  |
| `plotSize`      | 1200                               |
| `rentType`      | `DAILY`                            |
| `propertyType`  | `INDEPENDENT_HOUSE_VILLA`          |
| `file`          | `picture.jpg`                      |

**Success Status:** `201`

**Response:**

```json
{
  "message": "Property added successfully.",
  "data": {
    "id": 2,
    "title": "1BHK in patia",
    "description": "1 Bed room, 1 Hall and 1 Kitchen",
    "stateId": 26,
    "cityId": 100,
    "address": "Patia, Bhubaneswar",
    "price": 1000,
    "noOfBedrooms": 1,
    "noOfBathrooms": 1,
    "plotSize": 1200,
    "imageUrl": "picture-33a37d21-cc30-4ab9-a0ba-c66eb11c5ae7.jpg",
    "rentType": "DAILY",
    "propertyType": "INDEPENDENT_HOUSE_VILLA",
    "status": "PENDING",
    "createdById": 5
  }
}
```

### 2. Property List

**`GET /properties/getAll`**

**Headers:**

```http
Authorization: Bearer <your_jwt_token>
```

**Success Status:** `200`

**Response:**

```json
[
  {
    "id": 2,
    "title": "1Bhk in patia",
    "description": "it's an independent house",
    "address": "Patia, Bhubaneswar",
    "price": 1000,
    "noOfBedrooms": 1,
    "noOfBathrooms": 2,
    "plotSize": 1000,
    "imageUrl": "picture-33a37d21-cc30-4ab9-a0ba-c66eb11c5ae7.jpg",
    "rentType": "DAILY",
    "propertyType": "INDEPENDENT_HOUSE_VILLA",
    "status": "PENDING",
    "createdById": 5,
    "createdBy": {
      "email": "biswajit@email.com",
      "firstName": "Biswajit",
      "lastName": "Ojha"
    },
    "state": {
      "id": 26,
      "name": "Odisha",
      "type": "State"
    },
    "city": {
      "id": 100,
      "name": "Bhubaneswar",
      "stateId": 26
    }
  }
]
```

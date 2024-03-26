# Task Management System API

## Features

- **Authentication**: JWT-based authentication for secure user access.
- **CRUD Operations**: Full support for Create, Read, Update, and Delete operations on tasks.
- **Authorization**: Users can only access and modify tasks they own, ensuring data privacy.
- **Express.js**: Utilizes Express.js for efficient routing and middleware.
- **Data Storage**: Supports MongoDB for data storage.
- **Error Handling**: Implements error handling middleware to gracefully manage errors.
- **Bonus Points**: Provides optional features like pagination, sorting, filtering, user roles, Docker containerization

## Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login with username and password to obtain a JWT token.
- `POST /api/auth/logout`: Logout the currently authenticated user.

### Task Management

- `GET /api/tasks`: Get all tasks for the authenticated user.
- `GET /api/tasks/:id`: Get a specific task by ID.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task by ID.
- `DELETE /api/tasks/:id`: Delete a task by ID.

## Technologies Used
- 
- **Express.js (Framework)**: For routing and middleware.
- **MongoDB**: For data storage, with support for Mongoose
- **Docker**: For containerizing the application (optional).

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your database (MongoDB) and configure the connection settings.
4. Run the application using `npm start`.

### Running with Docker

To run the application using Docker, follow these steps:

1. Install Docker on your machine if you haven't already.
2. Navigate to the root directory of the project.
3. Build and run the Docker image by running the following command in your terminal:
`docker-compose up --build`


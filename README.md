# api_course_todo

# Task and Type API

This API allows you to manage tasks and types. You can create, read, update, and delete tasks and types.

## Prerequisites

- Node.js
- npm
- MySQL

## Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    - Create a MySQL database.
    - Update the `.env` file with your database credentials:
        ```
        DB_NAME=<your-database-name>
        DB_USER=<your-database-username>
        DB_PASSWORD=<your-database-password>
        ```

## Running the API

1. Start the server:
    ```bash
    npm start
    ```

2. The API will be available at `http://localhost:3000`.

## API Endpoints

### Tasks

- **Create a Task**
    - **URL:** `/tasks`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "title": "Task Title",
            "description": "Task Description",
            "dueDate": "2023-12-31T23:59:59Z",
            "typeId": 1
        }
        ```
    - **Response:**
        ```json
        {
            "id": 1,
            "title": "Task Title",
            "description": "Task Description",
            "dueDate": "2023-12-31T23:59:59Z",
            "typeId": 1,
            "createdAt": "2023-01-01T00:00:00Z",
            "updatedAt": "2023-01-01T00:00:00Z"
        }
        ```

- **Get a Task by ID**
    - **URL:** `/tasks/:id`
    - **Method:** `GET`
    - **Response:**
        ```json
        {
            "id": 1,
            "title": "Task Title",
            "description": "Task Description",
            "dueDate": "2023-12-31T23:59:59Z",
            "typeId": 1,
            "createdAt": "2023-01-01T00:00:00Z",
            "updatedAt": "2023-01-01T00:00:00Z"
        }
        ```

- **Get All Tasks**
    - **URL:** `/tasks`
    - **Method:** `GET`
    - **Query Parameters:**
        - `limit` (optional) 50 by default
        - `offset` (optional) 0 by default
        - `isLate` (optional) false by default
        - `filters` (optional)
    - **Response:**
        ```json
        [
            {
                "id": 1,
                "title": "Task Title",
                "description": "Task Description",
                "dueDate": "2023-12-31T23:59:59Z",
                "typeId": 1,
                "createdAt": "2023-01-01T00:00:00Z",
                "updatedAt": "2023-01-01T00:00:00Z"
            }
        ]
        ```

- **Update a Task**
    - **URL:** `/tasks/:id`
    - **Method:** `PUT`
    - **Body:**
        ```json
        {
            "title": "Updated Task Title",
            "description": "Updated Task Description",
            "dueDate": "2024-01-01T00:00:00Z",
            "typeId": 2
        }
        ```
    - **Response:**
        ```json
        {
            "id": 1,
            "title": "Updated Task Title",
            "description": "Updated Task Description",
            "dueDate": "2024-01-01T00:00:00Z",
            "typeId": 2,
            "createdAt": "2023-01-01T00:00:00Z",
            "updatedAt": "2023-01-01T00:00:00Z"
        }
        ```

- **Delete a Task**
    - **URL:** `/tasks/:id`
    - **Method:** `DELETE`
    - **Response:**
        ```json
        {
            "message": "Task deleted successfully",
            "task": "taskObject"
        }
        ```

### Types

- **Create a Type**
    - **URL:** `/types`
    - **Method:** `POST`
    - **Body:**
        ```json
        {
            "name": "Type Name"
        }
        ```
    - **Response:**
        ```json
        {
            "id": 1,
            "name": "Type Name",
            "createdAt": "2023-01-01T00:00:00Z",
            "updatedAt": "2023-01-01T00:00:00Z"
        }
        ```

- **Get a Type by ID**
    - **URL:** `/types/:id`
    - **Method:** `GET`
    - **Response:**
        ```json
        {
            "id": 1,
            "name": "Type Name",
            "createdAt": "2023-01-01T00:00:00Z",
            "updatedAt": "2023-01-01T00:00:00Z"
        }
        ```

- **Get All Types**
    - **URL:** `/types`
    - **Method:** `GET`
    - **Response:**
        ```json
        [
            {
                "id": 1,
                "name": "Type Name",
                "createdAt": "2023-01-01T00:00:00Z",
                "updatedAt": "2023-01-01T00:00:00Z"
            }
        ]
        ```

- **Update a Type**
    - **URL:** `/types/:id`
    - **Method:** `PUT`
    - **Body:**
        ```json
        {
            "name": "Updated Type Name"
        }
        ```
    - **Response:**
        ```json
        {
            "id": 1,
            "name": "Updated Type Name",
            "createdAt": "2023-01-01T00:00:00Z",
            "updatedAt": "2023-01-01T00:00:00Z"
        }
        ```

- **Delete a Type**
    - **URL:** `/types/:id`
    - **Method:** `DELETE`
    - **Response:**
        ```json
        {
            "message": "Type deleted successfully",
            "type": "typeObject"
        }
        ```

## Error Handling

Errors are returned with appropriate HTTP status codes and error messages. Common errors include:

- `400 Bad Request`: Invalid input data.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server error.
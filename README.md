# Containerized Task Manager

A full-stack task management application built with Node.js, Express, PostgreSQL, and Docker. The application is fully containerized using Docker Compose and includes automated image builds and publishing through GitHub Actions.

## Features

* Create tasks
* View all tasks
* Update existing tasks
* Delete tasks
* PostgreSQL persistent storage
* Dockerized application stack
* Automatic database schema initialization
* Multi-container orchestration with Docker Compose
* CI/CD pipeline with GitHub Actions
* Docker Hub image publishing

---

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL 16

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub

### Frontend

* HTML
* CSS
* JavaScript

---

## Architecture

```text
┌─────────────────┐
│     Browser     │
└────────┬────────┘
         │ HTTP
         ▼
┌─────────────────┐
│ Node.js / API   │
│ Express Server  │
└────────┬────────┘
         │
         │ PostgreSQL Driver
         ▼
┌─────────────────┐
│   PostgreSQL    │
│    Database     │
└─────────────────┘
```

Both the application and database run in separate Docker containers and communicate through Docker Compose networking.

---

## Project Structure

```text
containerized-task-manager/
│
├── db/
│   └── init/
│       └── schema.sql
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── .github/
│   └── workflows/
│       └── docker.yml
│
├── app.js
├── db.js
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Running Locally with Docker

### Clone the Repository

```bash
git clone https://github.com/yourusername/containerized-task-manager.git
cd containerized-task-manager
```

### Build and Start Containers

```bash
docker compose up --build
```

Application:

```text
http://localhost:3000
```

---

## Stop Containers

```bash
docker compose down
```

Remove containers, network, and database volume:

```bash
docker compose down -v
```

---

## API Endpoints

### Get All Tasks

```http
GET /tasks
```

### Create Task

```http
POST /tasks
```

Example Body:

```json
{
  "title": "Learn Docker"
}
```

### Update Task

```http
PUT /tasks/:id
```

Example Body:

```json
{
  "title": "Learn Docker Compose"
}
```

### Delete Task

```http
DELETE /tasks/:id
```

---

## Database Initialization

The PostgreSQL container automatically executes SQL scripts placed inside:

```text
db/init/
```

Current schema:

```sql
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## CI/CD Pipeline

GitHub Actions automatically:

1. Builds the Docker image
2. Authenticates with Docker Hub
3. Pushes the latest image to Docker Hub

Triggered on:

* Push to main branch

Required GitHub Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

---

## Docker Image

Pull the latest image:

```bash
docker pull <your-dockerhub-username>/containerized-task-manager:latest
```

Run the image:

```bash
docker run -p 3000:3000 <your-dockerhub-username>/containerized-task-manager:latest
```

---

## Skills Demonstrated

* Containerization with Docker
* Multi-container applications with Docker Compose
* PostgreSQL database integration
* REST API development
* Environment variable management
* Persistent data storage using Docker volumes
* Container networking and service discovery
* CI/CD automation using GitHub Actions
* Docker Hub image publishing

---

## Future Improvements

* User authentication
* Task completion status
* Due dates and priorities
* Search and filtering
* Kubernetes deployment
* Cloud deployment on AWS, Azure, or GCP
* Automated testing pipeline

---

## Author

Renzo Takeda

GitHub: https://github.com/Vercii

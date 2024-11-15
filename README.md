# Contacts Microservice

## Overview
This is a NestJS-based microservice for managing contact requests. It provides a single API endpoint to save contact details into a PostgreSQL database and sends notifications using a Redis-backed messaging system.

---

## Features
1. **API Endpoint**:
   - `POST /contact-us`: Accepts user contact details and saves them to the database.
2. **Messaging**:
   - Uses Redis for message queuing.
   - Sends notifications via a `notify_user` message pattern.
3. **Documentation**:
   - Swagger documentation is available at `/api`.
4. **Logging**:
   - Extensible logging for integration into larger systems.

---

## Prerequisites
1. [Docker](https://www.docker.com/) and Docker Compose

---

## Installation & Running
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd contacts-microservice
   ```
2. Install dependencies
  ```bash
  npm install
  ```
3. Run the docker container
  ```bash
  docker-compose up --build
  ```

# Testing
1. ```npm run test ```
2. ```npm run test:e2e```
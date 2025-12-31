# Backend Developer Intern Assignment

This project implements a scalable REST API with authentication and role-based access using Django and DRF, along with a basic React frontend for testing the APIs.

## Features

### Backend
- User registration and login with JWT authentication
- Role-based access control (user/admin)
- CRUD operations for tasks
- API versioning (v1)
- Input validation and error handling
- Swagger documentation
- PostgreSQL database (configured, but using SQLite for demo)

### Frontend
- React app with routing
- User registration and login
- Protected dashboard
- Task CRUD interface
- Error/success messages

## Setup Instructions

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Apply migrations:
   ```
   python manage.py migrate
   ```

4. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

5. Run the server:
   ```
   python manage.py runserver
   ```

   The API will be available at http://localhost:8000

   - Swagger docs: http://localhost:8000/swagger/
   - Admin: http://localhost:8000/admin/

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

   The app will be available at http://localhost:5173

## API Endpoints

### Authentication
- POST /api/auth/register/ - Register a new user
- POST /api/auth/login/ - Login and get JWT tokens

### Tasks
- GET /api/tasks/ - List user's tasks (authenticated)
- POST /api/tasks/ - Create a new task
- GET /api/tasks/{id}/ - Get task details
- PUT /api/tasks/{id}/ - Update task
- DELETE /api/tasks/{id}/ - Delete task

## Security Features
- JWT token authentication
- Password hashing
- Role-based permissions
- CORS enabled for frontend

## Scalability Notes
- Modular app structure for easy extension
- RESTful API design
- Database relationships for efficient queries
- JWT for stateless authentication
- Potential for microservices architecture
- Caching can be added with Redis
- Load balancing support with multiple instances

## Technologies Used
- Backend: Django, Django REST Framework, Simple JWT, DRF-YASG
- Frontend: React, Axios, React Router
- Database: SQLite (configured for PostgreSQL)

## Testing
1. Register a new user or login with existing credentials
2. Access the dashboard to manage tasks
3. Use Swagger UI to test API endpoints directly

## Deployment
For production deployment:
- Use PostgreSQL database
- Set DEBUG=False
- Configure proper CORS origins
- Use environment variables for secrets
- Consider Docker for containerization
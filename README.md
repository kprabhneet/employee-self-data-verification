# Employee Self Data Verification

A full-stack web application for yearly employee data review. Employees verify and update their personal details, and HR reviews each submission and either approves it or marks it for correction.

## Features

- Add new employees
- Employees verify and submit their updated details
- HR approves submissions or marks them as needing correction
- Status dashboard showing counts for each stage
- Business rule: HR can only review a record after the employee has submitted it

## Verification Flow

```
PENDING  →  SUBMITTED  →  APPROVED
                      ↘  NEEDS_CORRECTION
```

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Backend  | Java 17, Spring Boot, Spring Web    |
| Database | Spring Data JPA, H2 (in-memory)     |
| Frontend | React (Vite), Bootstrap 5           |
| Build    | Maven, npm                          |

## REST API Endpoints

| Method | Endpoint                                   | Description                        |
|--------|--------------------------------------------|------------------------------------|
| GET    | `/api/employees`                           | Get all employees                  |
| POST   | `/api/employees`                           | Add a new employee (PENDING)       |
| PUT    | `/api/employees/{id}`                      | Employee submits details (SUBMITTED) |
| PUT    | `/api/employees/{id}/status?value=STATUS`  | HR sets APPROVED or NEEDS_CORRECTION |

## Project Structure

```
employee-verification-app
├── employee-verification   # Spring Boot backend
│   └── src/main/java/com/prabhneet/employeeverification
│       ├── Employee.java              # JPA entity
│       ├── EmployeeRepository.java    # Data access layer
│       └── EmployeeController.java    # REST controller
└── frontend                # React frontend
    └── src/App.jsx                    # Main UI
```

## How to Run

**Backend** (runs on http://localhost:8080)
```
cd employee-verification
./mvnw spring-boot:run
```

**Frontend** (runs on http://localhost:5173)
```
cd frontend
npm install
npm run dev
```

## Future Improvements

- Login with role-based access (HR and Employee) using Spring Security and JWT
- Persistent database such as MySQL or PostgreSQL
- Input validation and error handling
- Unit and integration tests
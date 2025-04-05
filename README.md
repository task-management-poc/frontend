# ⚛️ Task Management System – Frontend (React.js)

A responsive and user-friendly frontend built with **React.js** that allows users to view, create, update, and delete tasks. Integrated with JWT authentication to protect sensitive routes, this UI connects to a NestJS backend API and PostgreSQL database.

---

## Tech Stack

- **React.js** – Frontend framework
- **Axios** – For making HTTP requests to the backend API
- **Bootstrap** – UI framework for responsive styling
- **JWT Auth** – Secure authentication using JWT
- **React Router DOM** – For route management

---

##  Project Structure

frontend/ 
├── public/ 
├── src/ 
│ ├── components/ 
│ │ ├── TaskList.jsx 
│ │ ├── TaskForm.jsx 
│ │ ├── Login.jsx 
│ │ ├── Register.jsx 
│ │ └── Navbar.jsx 
│ ├── services/ 
│ │ └── api.js 
│ ├── App.js 
│ ├── index.js 
│ └── PrivateRoute.js 
├── .env 
├── package.json 
└── README.md


---

## 🚀 How to Setup & Run

### 1. Install Dependencies

```
npm install
```

### 2. Start the Development Server
```
npm start
```
Visit the frontend in your browser:

### 3. Features
- Public Access
1. View a list of all tasks

2. Sorting and filtering tasks by status or due date

- Authenticated Users
1. Register/Login via JWT

2. Create new tasks

3. Edit existing tasks

4. Delete tasks

5. Auto-redirect on auth state

### 3. Components Breakdown
1. TaskList.jsx
- Displays all tasks in a table/grid

- Supports sorting and filtering

- Publicly accessible

2. TaskForm.jsx
- Add/edit task form

- Protected via PrivateRoute

- Validates input fields

3. Login.jsx & Register.jsx
- Auth forms with error feedback

- Stores token in localStorage

- Redirect on successful login

4. Navbar.jsx
- Conditional rendering for login/logout

- Navigates to Home, Add Task, etc.


### 4. API Communication
Using Axios in services/api.js, configured to use:
```
Authorization: Bearer <token> for secure endpoints
```
Global error handling (401/500)


### 5. Authentication Flow
- Register → POST /users

- Login → POST /auth/login

- Store JWT token in localStorage

Append token to all secure requests via Axios

Logout clears token and redirects to login

Login and get redirected to tasks

Add or update tasks

Logout and lose access to protected routes

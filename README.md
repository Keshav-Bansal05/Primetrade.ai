# 🚀 **Primetrade.ai — Role-Based Task Manager**

A secure, scalable, and modern full-stack task management system with **JWT authentication** and **role-based access (USER vs ADMIN).**

---

## 🌟 Project Overview

This project was built as part of the **Primetrade.ai Backend Intern Assignment** and demonstrates real-world engineering practices:

✔ Secure authentication using **JWT**
✔ Password hashing with **bcrypt**
✔ **Role-Based Access Control (USER vs ADMIN)**
✔ RESTful APIs with versioning (`/api/v1`)
✔ Full **CRUD operations** on Tasks
✔ Modular backend architecture
✔ Modern **Vite + React** frontend with protected routes
✔ **Admin can assign tasks to any user via dropdown**
✔ API documentation using **Postman collection**

---

## 🏗️ Repository Structure

```
Primetrade.ai/
│
├── backend/
│   ├── server.js
│   ├── Primetrade.ai.postman_collection.json
│   ├── config/
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── taskRoutes.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   └── middleware/
│
└── frontend/
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── ProtectedRoute.jsx
        ├── api/
        └── pages/
            ├── Login.jsx
            ├── Register.jsx
            └── Dashboard.jsx
```

> ⚠️ **Note:** The `.env` file is **not committed to GitHub** (ignored via `.gitignore`). You must create it locally.

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (`jsonwebtoken`)
* bcryptjs
* dotenv
* cors
* Winston (logging)

### Frontend

* Vite + React
* React Router
* Axios
* Framer Motion
* Tailwind CSS
* LocalStorage for JWT storage

---

## 🔐 Core Features

### Authentication

* User Registration
* Secure Login
* Password Hashing
* JWT-based authentication

### Role-Based Access

| Role      | Permissions                                               |
| --------- | --------------------------------------------------------- |
| **USER**  | Manage only their own tasks                               |
| **ADMIN** | View all tasks, delete any task, assign tasks to any user |

### Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task

### Admin Features

* View all users
* Assign tasks to any user via dropdown
* View task owner details

---

# 🚀 How to Run the Project

## 1) Backend Setup

```bash
cd backend
npm install
```

### Create `.env` file (MANDATORY)

Inside `backend/.env`:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskDB
JWT_SECRET=mySuperSecretKey
```

> You can also use MongoDB Atlas — just replace `MONGO_URI`.

### Start Backend

```bash
node server.js
```

Backend runs at:
👉 `http://localhost:5000`

---

## 2) Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
👉 `http://localhost:5173`

---

## 📌 API Endpoints (v1)

### Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
GET  /api/v1/auth/users   (Admin only)
```

### Tasks (JWT Required)

```
GET    /api/v1/tasks
POST   /api/v1/tasks
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
GET    /api/v1/tasks/admin/all   (Admin only)
```

---

## 🧠 Admin Task Assignment Flow

### Normal User

```json
POST /api/v1/tasks
{
  "title": "Buy groceries"
}
```

### Admin assigning to another user

```json
POST /api/v1/tasks
{
  "title": "Prepare report",
  "userId": "USER_MONGODB_ID"
}
```

---

## 📄 Postman API Documentation

Import this file into Postman:

```
backend/Primetrade.ai.postman_collection.json
```

Steps:

1. Open Postman
2. Click **Import**
3. Select the file
4. Click **Open**

---

## 📈 Scalability & Future Enhancements

* Redis caching
* Nginx load balancing
* Docker containerization
* Microservices architecture
* Cloud deployment (Render / Railway / AWS)

Possible features:

* Mark task completed
* Search & filters
* Pagination
* Email notifications

---

## 👨‍💻 Developed By

**Keshav Bansal**
Full-Stack Developer

GitHub: [https://github.com/Keshav-Bansal05](https://github.com/Keshav-Bansal05)
Email: [bansalkeshav8888@gmail.com](mailto:bansalkeshav8888@gmail.com)

---

⭐ If you like this project, please star the repo!

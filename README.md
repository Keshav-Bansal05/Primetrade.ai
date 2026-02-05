# 🚀 **Primetrade.ai — Full-Stack Task Manager**

<p align="center">
  <b>A secure, role-based task management system built with modern full-stack technologies.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Node.js-green?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Frontend-Vite+React-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Database-MongoDB-brightgreen?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge" />
</p>

---

## 🌟 **Project Overview**

This repository contains a **full-stack Task Management system** built as part of the **Primetrade.ai Backend Intern Assignment**.

It demonstrates real-world backend and frontend skills including:

✔ Secure authentication with **JWT**
✔ Password hashing using **bcrypt**
✔ **Role-Based Access Control (USER vs ADMIN)**
✔ RESTful APIs with proper versioning (`/api/v1`)
✔ Full **CRUD operations** on Tasks
✔ Clean, modular backend architecture
✔ Vite + React frontend with protected routes
✔ API documentation using **Postman collection**

---

## 🏗️ **Architecture**

```
Primetrade.ai/
│
├── backend/
│   ├── server.js
│   ├── README.md
│   ├── Primetrade.ai.postman_collection.json
│   ├── .env (sample)
│   ├── config/
│   ├── routes/
│   ├── models/
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

---

## 🛠️ **Tech Stack**

### 🔹 Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* dotenv
* cors

### 🔹 Frontend

* Vite + React
* React Router
* Axios
* LocalStorage for JWT storage

---

## 🔐 **Features**

### 🔹 Authentication

* User Registration
* Secure Login
* Password Hashing
* JWT-based authentication

### 🔹 Role-Based Access

| Role      | Permissions                      |
| --------- | -------------------------------- |
| **USER**  | Manage only their own tasks      |
| **ADMIN** | View and manage all users’ tasks |

### 🔹 Task Management

* Create Task
* View Tasks
* Update Task
* Delete Task

### 🔹 Frontend UI

* Register Page
* Login Page
* Protected Dashboard
* Task CRUD UI
* Different UI behavior for USER vs ADMIN

---

## 🚀 **How to Run the Project**

### ▶️ Backend Setup

```bash
cd backend
npm install
```

Create `.env` inside backend:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskDB
JWT_SECRET=mySuperSecretKey
```

Start MongoDB, then run:

```bash
node server.js
```

Backend runs at:
👉 `http://localhost:5000`

---

### ▶️ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
👉 `http://localhost:5173`

---

## 📌 **API Endpoints (v1)**

### Authentication

```
POST /api/v1/auth/register
POST /api/v1/auth/login
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

## 📄 **Postman API Documentation**

A ready-to-import Postman collection is included here:

```
backend/Primetrade.ai.postman_collection.json
```

Steps to import:

1. Open Postman
2. Click **Import**
3. Select the file
4. Click **Open**

---

## 📈 **Scalability Considerations**

This system can be extended using:

* Redis caching
* Nginx load balancing
* Docker containerization
* Microservices architecture
* Cloud deployment (Render / Railway / AWS)

---

## 👨‍💻 **Developed By**

**Keshav Bansal**
Full-Stack Developer Intern Candidate

🔗 GitHub: *your-profile-link-here*
📧 Email: *your-email-here*

---

⭐ **If you like this project, don’t forget to star the repo!**

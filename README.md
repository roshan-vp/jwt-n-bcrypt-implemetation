# 🔐 Auth System with JWT, Bcrypt, Cookies & MongoDB

A simple Node.js authentication system that uses **JWT tokens**, **bcrypt password hashing**, and **HTTP cookies** for session management.  
The backend is connected to **MongoDB** via **Mongoose** to handle user registration and login.

---

## 📌 Features
- **User Signup** with encrypted passwords (bcrypt)
- **User Login** with JWT token generation
- **Secure Session Handling** via HTTP cookies
- **MongoDB** database connection using Mongoose
- **Protected Routes** that require authentication
- **Environment Variables** for sensitive keys

---

## 🛠 Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **JWT (jsonwebtoken)**
- **bcrypt.js**
- **cookie-parser**
- **dotenv**

---

## 📂 Project Structure

project/
├── server.js # Main entry point
├── models/ # Mongoose models
├── views/ # to login/signup
├── .env # Environment variables
├── .gitignore # Ignored files (node_modules, .env, etc.)
└── package.json

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

git clone https://github.com/roshan-vp/jwt-n-bcrypt-implementation.git

# 🚀 ExpressApp

![Node](https://img.shields.io/badge/Node.js-18%2B-green)
![Express](https://img.shields.io/badge/Express.js-API-black)
![License](https://img.shields.io/badge/License-ISC-blue)

A **RESTful API** built with **Express.js**, **Sequelize ORM**, and **PostgreSQL**.
Includes authentication utilities, request validation using **Zod**, and interactive API documentation with **Swagger**.

---

## 📦 Tech Stack

* **Node.js**
* **Express.js**
* **Sequelize**
* **PostgreSQL**
* **Zod**
* **Swagger (Swagger UI)**
* **bcrypt**
* **express-session**

---

## 📁 Project Structure

```
.
├── config
│   ├── database.js
│   └── swagger.js
├── models
│   └── User.js
├── routes
│   ├── authRoute.js
│   └── getUser.js
├── validation
│   └── authValidator.js
├── server.js
└── package.json
```

---

## ⚙️ Installation

```bash
git clone https://github.com/de-auther/ExpressApp.git
cd ExpressApp
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
SESSION_SECRET=your_secret
```

---

## ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

Server runs using **nodemon**.

---

## 📡 API Documentation

After starting the server, open:

```
http://localhost:3000/api-docs
```

Swagger UI allows you to:

* View all endpoints
* Test APIs
* See request/response schemas

---

## 🔑 Features

* REST API structure
* PostgreSQL database integration
* Sequelize ORM
* User authentication support
* Request validation using Zod
* Session management
* Swagger documentation
* Organized project structure

---

## 📄 License

This project is licensed under the **ISC License**.

© 2026 deAuther

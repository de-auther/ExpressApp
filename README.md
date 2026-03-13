ExpressApp

Simple Express.js API with Sequelize + PostgreSQL, authentication utilities, validation using Zod, and Swagger API documentation.

Tech Stack

Node.js

Express

Sequelize

PostgreSQL

Zod

Swagger

bcrypt

express-session

Installation
git clone https://github.com/de-auther/ExpressApp.git
cd expressapp
npm install
Run Development Server
npm run dev

Server runs using nodemon.

Project Structure
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
API Docs

Swagger documentation available at:

/api-docs
License

Copyright (c) 2026 deAuther

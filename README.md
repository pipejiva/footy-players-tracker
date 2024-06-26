# Footy players tracker

### About the Software

This application is designed to manage an Australian football team's players and their performance tests. The software allows coaches to register, log in, and manage player information including personal details such as name, weight, height, and clothing size.

The frontend of the application is built using React.js. The backend, developed with Node.js and MySQL. The application also uses JWT.

## Environment Setup

### Prerequisites

- Node.js 18.17.0
- Docker and Docker Compose

### Download

- Clone the repository

  ```bash
  git clone https://github.com/pipejiva/footy-players-tracker
  cd footy-players-tracker
  ```

### Running backend application

```bash
docker-compose up -d
cd backend
npm install
npm run dev

```

- Project structure

```code
footy-players-tracker/backend/src
├── controllers/        # HTTP request/response logic
├── models/             # Sequelize ORM models
├── routes/             # Express routes
├── utils/              # Utility functions and modules
├── .env                # Environment variables
├── index.js              # Express application entry point
├── package.json        # Node.js dependencies and scripts
└── README.md           # Project documentation

```

#### API documentation

- **Swagger/OpenAPI Documentation**: The link to look the API documentation is `http://localhost:3000/api-docs`.

### Running frontend application

```bash
cd football-team-management
npm install
npm start

```

- Project structure

```code
footy-players-tracker/football-team-management
├── public/
│   ├── index.html
│   ├── manifest.json
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Players.js
│   ├── App.js
│   ├── index.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── package-lock.json
```

### User Registration Guide

To create a user, follow these steps:

1. Navigate to [http://localhost:3001/register](http://localhost:3001/register).
2. Enter a username in lowercase letters.
3. Enter a password that meets the following criteria:
   - Minimum of 8 characters
   - Contains at least one number
   - Contains at least one symbol

### Login Guide

To log in, follow these steps:

1. Navigate to [http://localhost:3001/login](http://localhost:3001/login).
2. Enter your registered username.
3. Enter your password.
4. Click the "Login" button.

### Player Management

To manage players, follow these steps:

1. Navigate to [http://localhost:3001/players](http://localhost:3001/players).
2. You can:
   - **List Players**: View the list of all players.
   - **Create a Player**: Add a new player by filling out the form and submitting it.
   - **Edit a Player**: Click the "Edit" button next to a player's details to update their information.
   - **Delete a Player**: Click the "Delete" button next to a player's details to remove them from the list.

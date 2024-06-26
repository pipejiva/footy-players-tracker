# footy-players-tracker

## Environment Setup

### Prerequisites

- Node.js 18.17.0
- Docker and Docker Compose

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/pipejiva/footy-players-tracker
   cd footy-players-tracker
   ```

2. Running the Application

   ```bash
   docker-compose up -d
   cd backend
   npm install
   npm start

   ```

3. Backend project structure

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

3. API documentation

- **Swagger/OpenAPI Documentation**: The link to look the API documentation is `http://localhost:3000/api-docs`.

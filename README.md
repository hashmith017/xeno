# XENO Project

This project consists of a backend server and a frontend client.

## Project Structure

- `backend/`: Contains the Node.js Express server.
- `frontend/`: Contains the React application.

## Getting Started

Follow these instructions to set up and run the project.

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
   The backend server will typically run on `http://localhost:3000` (or as configured in `backend/server.js`).

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend application will typically open in your browser at `http://localhost:5173` (or as indicated by the Vite development server).

## Available Scripts

### Backend

- `node server.js`: Starts the backend server.

### Frontend

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint for code quality.
- `npm run preview`: Serves the production build locally.

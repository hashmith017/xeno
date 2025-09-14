# XENO Project

This project consists of a backend server and a frontend client, designed to manage customer segments and campaign delivery.

## Problem Statement

The project addresses the need for a system to manage customer data, create targeted segments based on various criteria, deliver personalized messages to these segments, and track campaign history. It aims to provide a streamlined workflow for marketing and communication efforts by enabling users to define customer segments dynamically and automate message delivery.

## Features

### 1. Backend (Node.js + Express + MongoDB)
- **API Endpoints:**
    - `POST /api/customers`: Add new customer records.
    - `POST /api/orders`: Add new order records.
    - `GET /api/customers`: Retrieve a list of all customers.
    - `GET /api/orders`: Retrieve a list of all orders.
- **Database:** Data is stored in MongoDB Atlas, a cloud-based NoSQL database.

### 2. Authentication (Google OAuth)
- Implemented using `passport.js` with Google OAuth 2.0 strategy.
- User sessions are managed (or JWTs are used) after successful login.
- Campaign-related routes (`/campaigns`, `/segments`) are protected, accessible only by authenticated users.

### 3. Frontend (React.js with Vite/CRA)
- **Login Page:** Allows users to sign in using Google OAuth.
- **Segment Builder Page:**
    - Provides dropdowns and input fields to define customer segments (e.g., "spend > 10000", "visits < 3").
    - Supports combining conditions with "AND/OR" toggles.
    - "Preview Audience Size" button to call the backend and display the number of customers matching the defined segment.
- **Campaign History Page:**
    - Displays a table of past campaigns, including status (sent, failed) and audience size.
    - Most recent campaigns are displayed at the top.

### 4. Campaign Delivery & Logging
- Upon saving a segment, a new campaign entry is created in a `communication_log`.
- Messages are sent to matched customers via a dummy vendor API.
- The dummy vendor API (`/vendor/send` in the backend) simulates message delivery, returning `SENT` (90% success rate) or `FAILED` (10% failure rate) randomly.
- Results (status per customer) are logged in the `communication_log`.

### 5. AI Integration (Message Suggestions)
- Utilizes OpenAI API (or Hugging Face free models) for message suggestions.
- Users can enter an "objective" (e.g., "bring back inactive users") when creating a campaign.
- The system returns 2–3 suggested messages based on the objective, which the user can select and send.

## Architecture

```
[User] <--- Frontend (React) ---> [Backend (Node.js/Express)] <---> [MongoDB Atlas]
                                       |
                                       |
                                       +---> [Google OAuth]
                                       |
                                       +---> [Dummy Vendor API]
                                       |
                                       +---> [OpenAI API]
```
*Note: This is a simplified diagram. Details like load balancers, firewalls, and specific network configurations are omitted for clarity.*

## Limitations

- No message queuing system (e.g., Kafka/RabbitMQ) for campaign delivery; messages are sent synchronously.
- No batch updates for campaign status; status is updated per customer.
- The vendor API is a dummy implementation and does not represent actual message delivery.

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

## Submission Prep

- **Deployment:**
    - Backend: Render (free Node.js hosting)
    - Frontend: Vercel (React hosting)
    - Database: MongoDB Atlas (free tier)
- **GitHub Repository Structure:**
    - `backend/`: Contains all Node.js backend code.
    - `frontend/`: Contains all React frontend code.
    - `README.md`: This file, containing setup steps, architecture overview, and other relevant details.
- **Demo Video (≤7 min):**
    - Should demonstrate:
        - User login.
        - Segment creation.
        - Audience preview.
        - Campaign launch.
        - Campaign history viewing.
        - AI message suggestions.
    - Should explain trade-offs made (e.g., no pub-sub, no batch updates).
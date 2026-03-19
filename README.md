# 🚀 Career Assessment App (Full Stack)

A full-stack web application that helps users discover suitable career paths based on their skills and interests through an interactive assessment system.

------------------------------------------------------------------------

## 📌 Features

- 🔐 User Authentication (Register/Login)
- 📝 Career Assessment Quiz
- 📊 Visual Results using Chart.js
- 👤 User Profile Management
- 🌐 REST API Integration
- 📱 Responsive UI with Tailwind CSS

------------------------------------------------------------------------

## 🛠️ Tech Stack

### Frontend
- React (Vite + TypeScript)
- Tailwind CSS
- React Router
- Axios
- Chart.js

### Backend
- Node.js (ES Modules)
- Express.js
- MongoDB (Mongoose)
- dotenv

------------------------------------------------------------------------

## 📂 Project Structure

Career App/
│
├── frontend/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ ├── context/AuthContext.tsx
│ │ ├── services/api.ts
│ │ ├── App.tsx
│ │ └── main.tsx
│ │
│ ├── index.html
│ ├── vite.config.ts
│ └── package.json
│
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── assessmentController.js
│ │ ├── authController.js
│ │ └── profileController.js
│ ├── middleware/
│ │ └── authMiddleware.js
│ ├── models/
│ │ ├── AssessmentAttempt.js
│ │ ├── AssessmentQuestion.js
│ │ ├── Profile.js
│ │ ├── Question.js
│ │ ├── Result.js
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ ├── assessmentRoutes.js
│ │ └── profileRoutes.js
│ ├── utils/
│ │ ├── careerEngine.js
│ │ ├── inMemoryStore.js
│ │ └── isDbReady.js
│ │ └── scoring.js
│ ├── server.js
│ └── package.json


------------------------------------------------------------------------

## ⚙️ Installation & Setup

### 1. Clone Repository

### Backend

cd backend\
npm install

Create `.env`:

PORT=5001\
MONGO_URI=your_mongo_url

Run:

npm start

------------------------------------------------------------------------

### Frontend

cd frontend\
npm install\
npm run dev

------------------------------------------------------------------------

## 🔌 API Endpoints

### Auth

POST /api/auth/register
POST /api/auth/login

### Assessment

GET /api/assessment
POST /api/assessment/submit

### Profile

GET /api/profile\
PUT /api/profile

------------------------------------------------------------------------

## 🧠 Core Logic

The app uses a custom scoring system:

-   Questions mapped to career domains
-   Scores calculated via `scoring.js`
-   Career suggestions generated using `careerEngine.js`

------------------------------------------------------------------------

## 🔄 Flow

1.  User logs in\
2.  Takes assessment\
3.  Backend evaluates answers\
4.  Career scores generated\
5.  Results visualized in frontend

------------------------------------------------------------------------

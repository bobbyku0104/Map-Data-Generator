# ⚡ LeadSync - Map Data Generator

LeadSync is a premium, full-stack business intelligence and lead sourcing application. It fetches qualified, high-value local business leads (e.g., businesses without websites, contact details, ratings) using the Google Maps data API, integrates secure subscription payment flows via Razorpay, and manages robust user authentication using JWT and MongoDB.

---

## 🚀 Key Features

- **Advanced Lead Sourcing:** Search for targeted local business leads by keyword, profession, and location.
- **Filtering Logic:** Automatically filters out businesses that already have websites, leaving you with prospects who need web services.
- **JWT Authentication:** Secure client-side and server-side authentication (registration, login, logout) with HTTP-only cookies and localStorage.
- **Quota & Access Control:** Strict search limit enforcement. Users get one free search access, after which they are prompted to upgrade.
- **Razorpay Payment Gateway:** Fully integrated checkout and signature verification flow supporting **Starter**, **Professional**, and **Enterprise** subscription plans.
- **Premium Dark UI/UX:** A stunning, responsive interface built with React, TailwindCSS, and Lucide icons.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **HTTP Client:** Axios (with environment-driven URL configuration)
- **Routing:** React Router DOM

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Security:** JWT (jsonwebtoken), Bcrypt.js (password hashing), CORS
- **Third-Party Integrations:** Razorpay SDK, OpenWebNinja Local Business Data API

---

## 📂 Project Structure

```
├── client/                 # React Frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Hero, Navbar, LeadsTable, etc.)
│   │   ├── pages/          # Page views (Home, Login, Signup)
│   │   └── main.jsx        # App entry point
│   └── .env                # Frontend environment variables
│
└── server/                 # Node.js Express Backend
    ├── config/             # DB connection settings
    ├── controllers/        # Route controllers (Auth, Payments, Leads)
    ├── middleware/         # Auth & validation middlewares
    ├── models/             # Mongoose schemas (User)
    ├── routes/             # API routing (Auth, Client access, Payments)
    ├── services/           # External API integrations (OpenWebNinja)
    └── .env                # Backend environment variables
```

---

## ⚙️ Setup & Installation

### Prerequisites
- **Node.js** (v16.x or higher)
- **MongoDB** (Local instance or MongoDB Atlas account)

### 1. Backend Setup
Navigate to the `server` directory, install dependencies, and create a `.env` file:
```bash
cd server
npm install
```

Create a `.env` file inside `server/` with the following variables:
```env
PORT=5000
MONGO_URL=mongodb://127.0.0.1:27017/leadsdb  # For local development
JWT_SECRET=your_jwt_secret_key
OPENWEBNINJA_API_KEY=your_openwebninja_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Start the backend server:
```bash
npx nodemon
```
*The server will run on `http://localhost:5000`* 🚀

---

### 2. Frontend Setup
Navigate to the `client` directory, install dependencies, and create a `.env` file:
```bash
cd ../client
npm install
```

Create a `.env` file inside `client/` pointing to your backend:
```env
VITE_API_URL=http://localhost:5000  # For local development
```

Start the frontend development server:
```bash
npm run dev
```
*The frontend will run on `http://localhost:5173`* 💻

---

## ☁️ Deployment Guidelines

### 1. Deploying the Backend (Render / Heroku)
- Push your repository to GitHub.
- Create a new **Web Service** on Render connected to your repository.
- Under **Environment**, add the environment variables (`MONGO_URL`, `JWT_SECRET`, `OPENWEBNINJA_API_KEY`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`).
- **Important:** Since Render is cloud-based, you must use a cloud database (like **MongoDB Atlas**). Replace `MONGO_URL` with your Atlas connection string, and make sure Atlas allows access from anywhere (`0.0.0.0/0`).

### 2. Deploying the Frontend (Vercel / Netlify)
- Create a new project on Vercel connected to your repository (set the root directory to `client`).
- Add the **Environment Variable** `VITE_API_URL` pointing to your deployed backend URL on Render (e.g., `https://map-data-generator.onrender.com`).
- Redeploy the project.

# 📧 Smart Email Automation System

An AI-powered full-stack web application that generates intelligent, context-aware email replies and provides dashboard-based email management.

---

# 🚀 Project Overview

Smart Email Automation System is designed to:

* Automate professional email reply generation using AI
* Provide secure authentication using JWT
* Maintain user-specific email data
* Offer a dashboard with analytics, inbox, follow-ups, and API monitoring
* Support scalable backend architecture

---

# 🏗️ Project Architecture

This project follows a **modular full-stack architecture**:

* **Frontend:** React (Vite-based)
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Authentication:** JWT + bcrypt
* **Vector Storage:** Used for advanced email handling (vectorStore.js)

---

# 📂 Folder Structure

## 🔹 Backend Structure

```
backend/
│
├── node_modules/
├── src/
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── Email.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   └── auth.js
│   │
│   ├── services/
│   │
│   ├── db.js
│   ├── index.js
│   └── vectorStore.js
│
├── .env
├── .gitignore
├── package.json
└── package-lock.json
```

### 🔹 Backend Explanation

* **middleware/authMiddleware.js**
  Protects routes using JWT verification.

* **models/user.js**
  Defines user schema (name, email, password).

* **models/Email.js**
  Defines email schema linked to user via ObjectId.

* **routes/auth.js**
  Handles:

  * Registration
  * Login
  * Token generation

* **db.js**
  MongoDB connection configuration.

* **vectorStore.js**
  Handles vector-based email storage/AI retrieval logic.

* **index.js**
  Entry point of backend server.

---

## 🔹 Frontend Structure (React + Vite)

```
frontend/
│
├── node_modules/
├── public/
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── ApiStatus.jsx
│   │   └── ApiStatus_extended.jsx
│   │
│   ├── layout/
│   │   ├── DashboardLayout.jsx
│   │   └── DashboardLayout.css
│   │
│   ├── pages/
│   │   ├── Analytics.jsx
│   │   ├── Analytics.css
│   │   ├── DevTools.jsx
│   │   ├── FollowUps.jsx
│   │   ├── FollowUps.css
│   │   ├── Inbox.jsx
│   │   ├── Inbox.css
│   │   ├── Login.jsx
│   │   └── Login.css
│   │
│   ├── api.js
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

# 🔄 Application Flow

1. User registers or logs in.
2. Password is hashed using bcrypt.
3. JWT token is generated.
4. Token is stored on frontend.
5. Auth middleware verifies protected routes.
6. User submits email subject & content.
7. AI logic processes input.
8. Reply is generated and stored in MongoDB.
9. Dashboard displays:

   * Inbox
   * Follow-ups
   * Analytics
   * API Status

---

# 🎯 Core Features

* 🔐 Secure Authentication (JWT)
* 🔑 Password Hashing (bcrypt)
* 📂 User-Specific Email Storage
* 🤖 AI-Based Reply Generation
* 📊 Analytics Dashboard
* 📥 Inbox Management
* 🔁 Follow-Up Tracking
* 🛠️ Developer Tools Page
* 📡 API Status Monitoring

---

# 🛠️ Installation Guide

## 1️⃣ Clone Repository

```bash
git clone <your-repo-url>
cd SMART_EMAIL_AUTOMATION
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
npm start
```

Create `.env` inside backend:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
AI_API_KEY=your_ai_key
```

---

## 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🔐 Security Implementation

* JWT-based route protection
* Password hashing
* Environment variable configuration
* User-based email isolation

---

# 📊 Database Design

## User Schema

* name
* email
* password (hashed)

## Email Schema

* user (ObjectId reference)
* subject
* content
* reply
* timestamps

---

# 🎯 Goals & Objectives

## Primary Goal

To build an AI-powered scalable email automation system that enhances productivity and reduces manual email drafting time.

## Technical Objectives

* Implement secure JWT authentication
* Maintain proper user-email relationship
* Build modular backend architecture
* Integrate AI for contextual response generation
* Ensure scalable React frontend architecture

## Non-Technical Objectives

* Improve communication efficiency
* Ensure secure data handling
* Provide clean UI/UX
* Design scalable enterprise-ready solution

---

# 🔮 Future Enhancements

* Real-time Gmail integration
* Tone customization (Formal / Friendly / Corporate)
* AI-based email categorization
* Spam detection module
* Cloud deployment (AWS / Render)
* Role-based admin panel

---

# 🧠 Learning Outcomes

* Full-stack architecture design
* JWT authentication implementation
* MongoDB schema modeling
* AI integration workflow
* React dashboard development
* Debugging and API testing

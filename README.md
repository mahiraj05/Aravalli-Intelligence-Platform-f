🌍 Aravalli Intelligence Platform  
### Team: **GEN-AI-SIS**

An AI-powered environmental intelligence platform built to analyze, monitor, and visualize environmental risk areas using a modern full-stack architecture.

---

## 👥 Team Members
- **Ritika**
- **Mahi Raj**
- **Mansi**

**Team Name:** GEN-AI-SIS

---

## 🧠 Project Overview

The **Aravalli Intelligence Platform** is designed to support environmental monitoring and decision-making.  
The system integrates a modern web-based frontend with a scalable backend API to simulate environmental analysis workflows.

The project demonstrates:
- Full-stack system design
- API-driven architecture
- Cloud deployment
- Real-world readiness for AI/analytics integration

---

## 🎯 Problem Statement

Environmental regions such as the Aravalli range face challenges like:
- Deforestation
- Illegal mining
- Environmental degradation

There is a lack of centralized, visual, and intelligent platforms to:
- Analyze affected regions
- Track changes
- Support data-driven decisions

---

## 💡 Solution

This platform provides:
- A dashboard to visualize analysis results
- APIs to run environmental analysis
- Cloud-based deployment for real-world scalability

The current MVP uses mock analysis data, but the architecture is designed to integrate real satellite and AI-based analysis systems in the future.

---

## 🏗️ System Architecture

User
│
▼
Frontend (React + Firebase Hosting)
│
▼
Backend API (Node.js + Express on Render)
│
▼
Firebase Services
├── Firestore (data storage)
└── Storage (files / GeoJSON)

yaml
Copy code

---

## 🔄 Application Flow

1. User opens the frontend dashboard
2. Frontend calls backend APIs
3. Backend processes analysis logic (mock data)
4. Results are stored/retrieved from Firebase
5. Frontend displays analysis results visually

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- JavaScript
- Firebase Hosting

### Backend
- Node.js
- Express.js
- REST APIs
- Firebase Admin SDK

### Cloud & Tools
- Firebase Firestore
- Firebase Storage
- Render (Backend deployment)
- GitHub (Version control)

---

## 📁 Project Structure

Aravalli-Intelligence-Platform/
│
├── frontend/
│ ├── src/
│ ├── dist/
│ ├── firebase.json
│ └── package.json
│
├── backend/
│ ├── src/
│ │ ├── index.js
│ │ ├── routes/
│ │ ├── controllers/
│ │ └── services/
│ └── package.json
│
└── README.md

yaml
Copy code

---

## 🚀 Deployment Details

### 🌐 Frontend Deployment
- Hosted on **Firebase Hosting**
- Fast, secure, and scalable static hosting

### ⚙️ Backend Deployment
- Hosted on **Render**
- Live REST APIs accessible publicly

---

## 🔗 Live URLs

- **Frontend (Firebase Hosting):**  
  👉 https://jaypur-aravali-antigravity.web.app

- **Backend API (Render):**  
  👉 https://aravalli-intelligence-platform-b.onrender.com

---

## ⚙️ How to Run Locally (Optional)

### Backend
```bash
cd backend
npm install
node src/index.js
Frontend
bash
Copy code
cd frontend
npm install
npm run build
npm run dev

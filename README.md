# 🛍️ MarketZen — Boutique Luxury AI Powered E-Commerce


<div align="center">
  <img src="frontend/src/assets/logo.png" alt="MarketZen Logo" width="120" />
  <p><i>Defining the standard of boutique luxury. Shop Smarter, Live Calmer.</i></p>

  [![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://marketgen-ai-ecommerce.vercel.app/)
  [![License](https://img.shields.io/badge/License-MIT-C9A84C?style=for-the-badge)](LICENSE)
</div>

---

## 🚀 Languages and Tools...

<p align="left">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white" />
</p>

<p align="left">
  <img src="https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white" />
  <img src="https://img.shields.io/badge/Google_Gemini_AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white" />
  <img src="https://img.shields.io/badge/Razorpay-020425?style=for-the-badge&logo=razorpay&logoColor=3399FF" />
  <img src="https://img.shields.io/badge/Resend-000000?style=for-the-badge&logo=resend&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=000000&labelColor=white" />
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
</p>

---

## ✨ Features

### 🧠 AI-Powered Insights
- **Smart Search**: Context-aware product discovery using Google Gemini AI.
- **AI Skin Analyzer**: Advanced image processing for personalized skincare recommendations.
- **AI Routine Builder**: Tailored daily wellness guides generated in real-time.
- **Ingredient Checker**: Analyze safety and suitability of product compositions instantly.

### 🛡️ Secure & Seamless Experience
- **Hybrid Authentication**: Secure Login/Signup with **Google OAuth 2.0** and custom **JWT** workflows.
- **Bypass Connectivity Issues**: Integrated **Resend API** for reliable OTP delivery via Port 443.
- **Premium Checkout**: End-to-end payment processing with **Razorpay**.
- **Real-time Support**: Live concierge chat powered by **Socket.io**.

### 💎 Boutique Aesthetic
- **High-Fidelity Design**: Luxury UI elements including Glassmorphism, smooth Framer Motion transitions, and premium typography (`Playfair Display`, `Jost`).
- **Responsive Navigation**: Robust SPA routing optimized for Vercel.

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas Account
- Google AI (Gemini) API Key
- Razorpay API Key

### Backend Setup
1. `cd server`
2. `npm install`
3. Create `.env` file:
   ```env
   PORT=4002
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_secret
   RESEND_API_KEY=your_key
   GEMINI_API_KEY=your_key
   RAZORPAY_KEY_ID=your_id
   RAZORPAY_KEY_SECRET=your_secret
   ```
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---

## 📁 Project Structure

```text
├── frontend/             # React (Vite) Application
│   ├── src/
│   │   ├── components/   # UI Fragments
│   │   ├── context/      # State Management
│   │   └── pages/        # Main Views
├── server/               # Node.js + Express API
│   ├── models/           # Mongoose Schemas
│   ├── routes/           # REST Endpoints
│   └── utils/            # Helper logic
└── README.md
```

---

<div align="center">
  <p>Built with ❤️ for a better shopping experience.</p>
  <b><a href="https://github.com/Lithish779/Ecommerce">GitHub Repo</a> • <a href="https://marketgen-ai-ecommerce.vercel.app/">Live Demo</a></b>
</div>

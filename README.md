<div align="center">
<img width="1200" height="475" alt="Miyah Sudanese Utility Map" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
<h1>Miyah (مياه) - Sudanese Utility Tracking System</h1>
<p>A resilient community-driven platform for tracking water and power utilities in Sudan. Built for offline resilience using mesh networking and modern web aesthetics.</p>
</div>

---

## 🚀 Overview

Miyah is a dual-application ecosystem designed to empower Sudanese citizens to report utility outages and for NGOs/Utility providers to manage and verify these reports. The system is designed to work in low-connectivity environments using a simulated Peer-to-Peer Mesh Network.

## ✨ Key Features

### 👤 Citizen App (`Miyah-user`)
- **USSD Inquiry System**: Simulated USSD interface (*#123#*) for checking neighborhood utility status.
- **Resilient Reporting**: Submit reports with photos and voice messages.
- **Mesh Connectivity**: Broadcasts reports to nearby "nodes" (NGOs) even when the central server is unreachable.
- **Premium UI**: Modern, glassmorphic design with RTL (Arabic) and LTR (English) support.

### 🏢 NGO Dashboard (`Miyah-map`)
- **Interactive Sudan Map**: Real GeoJSON-based visualization of Khartoum and surrounding areas.
- **Community Reports Table**: Real-time list of reports received via Server or Mesh Network.
- **Media Verification**: Listen to voice recordings and view photos directly in the dashboard.
- **Report Management**: Verify or delete reports to maintain data accuracy.

### ⚙️ Backend & Services
- **Express Server**: Handles persistent storage, client-side ID deduplication, and high-payload media storage.
- **Mesh Service**: Simulated P2P communication layer bridge between Citizen and NGO modules.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Icons**: Lucide React
- **Maps**: Custom SVG/GeoJSON Map Engine
- **State/Animations**: Framer Motion & CSS keyframe animations

## 🏃 Local Setup

### 1. Start the Utility Server
```bash
cd server
npm install
npm start
```
*Port: 3002*

### 2. Run the Citizen App
```bash
cd Miyah-user
npm install
npm run dev
```
*Port: 3000*

### 3. Run the NGO Dashboard
```bash
# In the root directory
npm install
npm run dev
```
*Port: 3001*

## 📁 Project Structure

```bash
├── Miyah-user/        # Citizen application frontend
├── server/            # Express backend (Data & API)
├── components/       # NGO App components (Shared)
├── services/         # Mesh network services
├── constants.ts      # Sudan GeoJSON & Mock data
└── types.ts          # Unified TypeScript interfaces
```

---
<div align="center">
  <p>Dedicated to providing reliable utility information for a more resilient Sudan.</p>
</div>

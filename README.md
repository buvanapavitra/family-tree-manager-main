# Family Tree Management App

This is a full-stack web application for managing a family tree. Users can add, view, update, and delete family members, and view the hierarchy in a nested accordion format.

## 🌐 Live Demo

**Application hosted on Render:**  
(https://family-tree-manager-main.onrender.com/)

## Features

- Add new family members
- Assign parent-child relationships
- View family hierarchy in an expandable accordion UI
- Edit and delete members
- Responsive and user-friendly interface

## Tech Stack

- Frontend: React (Vite), Redux Toolkit, Redux-Saga, Material UI
- Backend: Node.js, Express
- Database: MongoDB

---


## 📁 Folder Structure


family-tree-manager-main/
  family-tree-backend/
    server.js
    ...
  family-tree-frontend/
    dist/
      index.html
    ...
  package.json


---

## 🚀 Getting Started

### 1. **Clone the repository**

git clone <your-repo-url>
cd family-tree-manager-main


### 2. **Install dependencies**

npm install
cd frontend
npm install
cd ../backend
npm install
cd ..

### 3. **Set up environment variables**

Create a `.env` file in the `backend` folder:

MONGO_URI=your-mongodb-connection-string
PORT=5000

### 4. **Build the frontend**

cd frontend
npm run build
cd ..

### 5. **Start the backend server**

From the root folder:

npm start

The backend will serve the frontend build at [http://localhost:5000](http://localhost:5000).

---

## 🛠 Development

- **Frontend dev server:**  
 
  cd frontend
  npm run dev

  Runs at [http://localhost:5173](http://localhost:5173)

- **Backend dev server:**  

  cd backend
  npm run dev

  Runs at [http://localhost:5000](http://localhost:5000)

---

## 🔗 API Endpoints

- `GET /api/members` — Get all members
- `POST /api/members` — Add a new members
- `PUT /api/members/:id` — Update a members
- `DELETE /api/members/:id` — Delete a members

---

## 📝 Notes

- Make sure to build the frontend before starting the backend in production.
- If you change the frontend code, rebuild before restarting backend.

---

## 📄 Screenshot


![WhatsApp Image 2025-05-16 at 13 45 30_4506fc1e](https://github.com/user-attachments/assets/6c3d7cd3-a20d-4ce5-8283-dc168bd00c3c)

**Add new member**

<img width="392" alt="image" src="https://github.com/user-attachments/assets/160a10d5-c752-438a-baca-e33c1afbe7cc" />


**Edit**

<img width="461" alt="image" src="https://github.com/user-attachments/assets/25e98fca-0e99-4b97-b42d-5ced68a34164" />

**Delete**

![image](https://github.com/user-attachments/assets/a2eb6cb0-eacf-4e61-b4be-3bb0ed3246d4)










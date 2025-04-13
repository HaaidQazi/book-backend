# 📚 Peer-2-Peer Book Exchange Portal - Backend

This is the backend server for the Peer-2-Peer Book Exchange Portal — a simple and efficient platform where users can register as **Book Owners** or **Seekers**, and exchange academic books.


🚀 Features

- 👥 **User Registration & Login**
  - Role-based authentication: **Owner** or **Seeker**
  - User data stored in a JSON file (`data/users.json`)

 📘 **Book Management**
  - Book Owners can add books with metadata
  - Seekers can view available books
  - Filter books by title, genre, or location
  - Book data stored in a JSON file (`data/books.json`)

- 📡 **RESTful APIs** using Express
- 🌐 **CORS enabled** for frontend-backend communication

 🌐 Live Backend URL

✅ Deployed on **Render**  
🔗 [`https://book-backend-xodx.onrender.com`](https://book-backend-xodx.onrender.com)

---

## 📦 Installation & Setup
 1. Clone the repository

git clone https://github.com/your-username/book-backend.git
cd book-backend

2. Install dependencies

npm install

3. Run the server

node index.js

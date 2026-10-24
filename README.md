# 📚 Bookstore Management System

A full-stack CRUD web app for managing a bookstore's inventory. Built with **React (Vite)** on the frontend and **JSON Server** as a lightweight REST API backend.

Add, view, update, and delete books through a clean, responsive interface.

---

## ✨ Features

- **Create** new book records (title, author, price, etc.)
- **Read** the full book catalogue in a responsive layout
- **Update** existing book details
- **Delete** books from the inventory
- Responsive UI styled with React Bootstrap
- Centralized API layer (Axios) for clean, reusable requests

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React, Vite                         |
| Styling   | React Bootstrap, Bootstrap, React Icons |
| HTTP      | Axios                               |
| Backend   | JSON Server (REST API on port 3000) |
| Data      | `db.json` (flat-file JSON database) |

## 📁 Project Structure

```
bookstore-management/
├── backend/
│   ├── db.json              # Mock database (books collection)
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page-level views
│   │   ├── service/
│   │   │   ├── bookApi.js   # API calls (GET, POST, PUT, DELETE)
│   │   │   └── serverurl.js # Base backend URL (single source of truth)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```

> Adjust the `components/` and `pages/` entries to match your actual folders.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/bookstore-management.git
cd bookstore-management
```

### 2. Start the backend (JSON Server)

```bash
cd backend
npm install
npx json-server --watch db.json --port 3000
```

The API will be available at `http://localhost:3000/books`.

### 3. Start the frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173` (Vite's default port).

> Both servers must be running at the same time for the app to work.

## 🔌 API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint      | Description          |
|--------|---------------|----------------------|
| GET    | `/books`      | Get all books        |
| GET    | `/books/:id`  | Get a single book    |
| POST   | `/books`      | Add a new book       |
| PUT    | `/books/:id`  | Update a book        |
| DELETE | `/books/:id`  | Delete a book        |

## ⚙️ Configuration

The backend URL is defined once in `frontend/src/service/serverurl.js`. If you change the JSON Server port, update it there:

```js
const SERVER_URL = "http://localhost:3000";
export default SERVER_URL;
```

## 🧠 What I Learned

- Structuring a React app with components, props, and state
- Using `useState` and `useEffect` for data fetching and UI updates
- Separating API logic from UI code with a dedicated service layer
- Performing full CRUD operations against a REST API using Axios
- Building responsive layouts with React Bootstrap

## 🔮 Future Improvements

- Search and filter by title, author, or category
- Form validation and better error handling
- Pagination or sorting for large catalogues
- Authentication and user roles (admin vs. viewer)
- Replace JSON Server with Node/Express + MongoDB or PostgreSQL
- Deploy frontend (Vercel/Netlify) and backend (Render/Railway)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built by **Emmanuel** as a hands-on project to learn React and REST API integration.

# Quiz App Frontend

This is the frontend for the Quiz App built using React. It includes protected routes, login, result tracking, and user dashboard features.

## 🚀 Features

- User Authentication (Login, Logout)
- Protected Routes with React Router
- Save and View Quiz Results
- Token-based Authorization
- Responsive UI

## 🛠️ Tech Stack

- React.js
- React Router
- Tailwind CSS (or your CSS framework)
- Vite (for faster builds)
- Context API (for Auth handling)

## 📂 Project Structure

src/
├── components/
├── context/ # Auth context
├── layouts/ # Main layout
├── pages/ # Login, Register, Home, etc.
├── route/ # ProtectedRoute and PublicRoute
|__ hooks/ # custom hooks
└── utis/ # API service functions and validation functions


## 🔧 Setup Instructions

1. **Clone the repo**

```bash
git clone git url (get from this repo)
cd quiz-app-frontend
npm install

2. **Set environment variables** 

Create a .env file in the root with:
VITE_API_URL=http://localhost:3000(server base url)

3. **Start the development server**

npm run dev




import React from "react";
import { AuthProvider } from "./context/AuthContext";
import Register from "./components/Register";
import Login from "./components/Login";
import ProfileForm from "./components/ProfileForm";
import CardDisplay from "./components/CardDisplay";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/card">Card</Link>
        </nav>

        <Routes>
          <Route path="/" element={<div>Welcome to E-Teen Project</div>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/card/:userId" element={<CardDisplay />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

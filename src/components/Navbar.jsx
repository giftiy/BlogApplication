import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">MyBlog</Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">New Post</Link>
      </div>
    </nav>
  );
}

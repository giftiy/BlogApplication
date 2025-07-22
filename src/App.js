import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogView from './components/BlogView';
import BlogForm from './components/BlogForm';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/view/:id" element={<BlogView />} />
          <Route path="/create" element={<BlogForm />} />
          <Route path="/edit/:id" element={<BlogForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

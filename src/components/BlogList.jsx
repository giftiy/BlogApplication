// src/components/BlogList.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// 1. Import the specific API functions you need
import { getAllPosts } from '../api';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 2. Call the named function directly
    getAllPosts()
      .then(res => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="container">
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} className="post-card">
            <h3>{post.title}</h3>
            <p>By {post.author}</p>
            <Link to={`/view/${post.id}`} className="btn">Read More</Link>
          </div>
        ))
      )}
    </div>
  );
}
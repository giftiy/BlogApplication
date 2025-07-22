import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../api';  // your default export containing named functions

export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.getPostById(id)
      .then(res => setPost(res.data))
      .catch(() => {
        alert('Post not found');
        navigate('/');  // optional: redirect if not found
      });
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm('Delete this post?')) {
      api.deletePost(id)
        .then(() => {
          alert('Deleted successfully');
          navigate('/');
        })
        .catch(() => alert('Delete failed'));
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container post-detail">
      <h2>{post.title}</h2>
      <p className="author">By {post.author}</p>
      <p>{post.content}</p>
      <div className="actions">
        <Link to={`/edit/${id}`} className="btn">Edit</Link>
        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
        <Link to="/" className="btn btn-secondary">Back</Link>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api'; // Make sure this path is correct

export default function BlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
  });

  useEffect(() => {
    if (isEdit) {
      console.log(`Fetching post with ID: ${id}`);
      api.getPostById(id)
        .then(res => {
          setForm(res.data);
        })
        .catch(() => {
          alert('Error: Post not found or could not be loaded.');
          navigate('/');
        });
    }
  }, [id, isEdit, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await api.updatePost(id, form);
        alert('Post updated successfully');
      } else {
        await api.createPost(form);
        alert('Post created successfully');
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to submit form:', error);
      alert('Error submitting form. Please check the console for details.');
    }
  };

  return (
    <div className="container form-container">
      <h2>{isEdit ? 'Edit Post' : 'New Post'}</h2>
      <form onSubmit={handleSubmit} className="blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            maxLength={100}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            maxLength={50}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={form.content}
            onChange={handleChange}
            required
            rows={10}
            className="form-control"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          {isEdit ? 'Update Post' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

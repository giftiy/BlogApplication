// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api',
});

// Create a new blog post
export const createPost = (newPost) => api.post('/create-post', newPost);

// Get all blog posts
export const getAllPosts = () => api.get('/all-posts');

// Get a single blog post by ID
export const getPostById = (id) => api.get(`/get-post/${id}`);

// Update a blog post by ID
export const updatePost = (id, updatedPost) => api.put(`/update-post/${id}`, updatedPost);

// Delete a blog post by ID
export const deletePost = (id) => api.delete(`/delete-post/${id}`);

// --- FIX IS HERE ---
// 1. Assign the object of functions to a named constant
const apiService = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};

// 2. Export that named constant as the default
export default apiService;
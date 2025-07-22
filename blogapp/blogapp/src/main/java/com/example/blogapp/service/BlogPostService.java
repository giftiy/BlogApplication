package com.example.blogapp.service;

import com.example.blogapp.model.BlogPost;
import com.example.blogapp.repository.BlogPostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BlogPostService {

    private final BlogPostRepository repository;

    public BlogPostService(BlogPostRepository repository) {
        this.repository = repository;
    }

    // Save a new blog post
    public BlogPost save(BlogPost post) {
        return repository.save(post);
    }

    // Get all blog posts
    public List<BlogPost> findAll() {
        return repository.findAll();
    }

    // Find a blog post by id
    public Optional<BlogPost> findById(Long id) {
        return repository.findById(id);
    }

    // Update an existing post
    public BlogPost update(Long id, BlogPost updatedPost) {
        return repository.findById(id)
                .map(post -> {
                    post.setTitle(updatedPost.getTitle());
                    post.setContent(updatedPost.getContent());
                    // add other fields here if needed
                    return repository.save(post);
                }).orElseThrow(() -> new RuntimeException("Post not found"));
    }

    // Delete post by id
    public void delete(Long id) {
        repository.deleteById(id);
    }
}

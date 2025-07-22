package com.example.blogapp.controller;

import com.example.blogapp.model.BlogPost;
import com.example.blogapp.service.BlogPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")

// Base path for all API endpoints
public class BlogPostController {

    private final BlogPostService service;

    public BlogPostController(BlogPostService service) {
        this.service = service;
    }

    // CREATE a new post
    @PostMapping("/create-post")
    public ResponseEntity<BlogPost> createPost(@RequestBody BlogPost post) {
        BlogPost savedPost = service.save(post);
        return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
    }

    // READ all posts
    @GetMapping("/all-posts")
    public ResponseEntity<List<BlogPost>> getAllPosts() {
        List<BlogPost> posts = service.findAll();
        return ResponseEntity.ok(posts);
    }

    // READ a post by ID
    @GetMapping("/get-post/{id}")
    public ResponseEntity<BlogPost> getPostById(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // UPDATE a post by ID
    @PutMapping("/update-post/{id}")
    public ResponseEntity<BlogPost> updatePost(@PathVariable Long id, @RequestBody BlogPost post) {
        BlogPost updatedPost = service.update(id, post);
        return ResponseEntity.ok(updatedPost);
    }

    // DELETE a post by ID
    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}

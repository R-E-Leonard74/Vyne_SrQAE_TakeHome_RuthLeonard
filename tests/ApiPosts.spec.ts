import { test, expect } from '@playwright/test';
import { JSONPlaceholderClient } from '../src/clients/JSONPlaceholderClient';
import { Post } from '../types/post';

test.describe('JSONPlaceholder Posts API', () => {
  let apiClient: JSONPlaceholderClient;

  test.beforeEach(async ({ request }) => {
    // Instantiate client with Playwright's APIRequestContext
    apiClient = new JSONPlaceholderClient(request);
  });

  test('GET /posts - Should retrieve all posts', async () => {
    const response = await apiClient.getAllPosts();
    expect(response.status()).toBe(200);
    const posts: Post[] = await response.json();
    
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    console.log(JSON.stringify(posts, null, 2));
    
  });

  test('GET /posts/:id - Should retrieve a single post by ID', async () => {
    const postId = 1;
    const response = await apiClient.getPostById(postId);
    console.log(await response.text());

    expect(response.status()).toBe(200);
    const post: Post = await response.json();

    expect(post.id).toBe(postId);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('body');
  });

  test('POST /posts - Should create a new post', async () => {
    const newPost: Omit<Post, 'id'> = {
      title: 'Automated Playwright Test',
      body: 'Testing API endpoints using Playwright and TypeScript wrapper.',
      userId: 1,
    };

    const response = await apiClient.createPost(newPost);

    expect(response.status()).toBe(201);
    const createdPost: Post = await response.json();

    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeDefined();
    console.log(JSON.stringify(createdPost, null, 2));
  });

  test('PUT /posts/:id - Should update an existing post', async () => {
    const updatedPayload: Post = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated body content',
      userId: 1,
    };

    const response = await apiClient.updatePost(1, updatedPayload);

    expect(response.status()).toBe(200);
    const post: Post = await response.json();

    expect(post.title).toBe(updatedPayload.title);
    expect(post.body).toBe(updatedPayload.body);
    console.log(JSON.stringify(post, null, 2));
  });

  test('DELETE /posts/:id - Should remove a post', async () => {
    const response = await apiClient.deletePost(1);

    expect(response.status()).toBe(200);
  });

  test('GET /posts/:id - Should attempt to retrieve a single post with invalid ID', async () => {
    const postId = 101;
    const response = await apiClient.getPostById(postId);
    console.log(await response.text());

    expect(response.status()).toBe(404);
    const post: Post = await response.json();
  });

  
    test('POST /posts - Should create a new post with a new user id', async () => {
    const newPost: Omit<Post, 'id'> = {
      title: 'That NEW Test',
      body: 'This is a test. It is only a test. 1.2.3.',
      userId: 12,
    };

    const response = await apiClient.createPost(newPost);
    expect(response.status()).toBe(201);
    const createdPost: Post = await response.json();

    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeDefined();
    console.log(JSON.stringify(createdPost, null, 2));
    console.log(await response.text());
  });

test('PATCH /posts/:id - Should  a new post with a new user id', async () => {
    const newPost: Omit<Post, 'id'> = {
      body: 'This is a test. It is only a test. 1.2.3. Do not pass go. Do not collect $200',
      userId: 12,
    };

    const response = await apiClient.createPost(newPost);
    expect(response.status()).toBe(201);
    const createdPost: Post = await response.json();

    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
    expect(createdPost.id).toBeDefined();
    console.log(JSON.stringify(createdPost, null, 2));
    console.log(await response.text());
  });


  
  
});
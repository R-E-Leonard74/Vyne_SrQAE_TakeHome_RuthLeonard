import { APIRequestContext, APIResponse } from '@playwright/test';
import { Post } from '../types/post';

export class JSONPlaceholderClient {
  private request: APIRequestContext;
  private readonly baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  // GET /posts
  async getAllPosts(): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/posts`);
  }

  // GET /posts/:id
  async getPostById(id: number): Promise<APIResponse> {
    return await this.request.get(`${this.baseUrl}/posts/${id}`);
  }

  // POST /posts
  async createPost(payload: Omit<Post, 'id'>): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/posts`, {
      data: payload,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  // PUT /posts/:id
  async updatePost(id: number, payload: Post): Promise<APIResponse> {
    return await this.request.put(`${this.baseUrl}/posts/${id}`, {
      data: payload,
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  // DELETE /posts/:id
  async deletePost(id: number): Promise<APIResponse> {
    return await this.request.delete(`${this.baseUrl}/posts/${id}`);
  }
}
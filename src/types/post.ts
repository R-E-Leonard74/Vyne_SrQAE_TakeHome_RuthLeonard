export interface Post {
  userId: number;
  id?: number; // Optional because new posts won't have an ID until created by the server
  title: string;
  body: string;
}
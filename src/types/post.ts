export interface Post {
    id: number;
    title: string;
    body: string;
    imageUrl?: string;
  }
  export interface Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }
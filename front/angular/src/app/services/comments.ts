import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Comment {
  _id?: string;
  postId: string;
  text: string;
  author: string;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private url = 'http://localhost:3000/api/comments';

  constructor(private http: HttpClient) { }

  addComment(postId: string, text: string, author: string) {
    return this.http.post(`${this.url}`, {
      postId,
      text,
      author
    });
  }

  getCommentsByPostId(postId: string) {
    return this.http.get<Comment[]>(`${this.url}/post/${postId}`);
  }

  deleteComment(commentId: string) {
    return this.http.delete(`${this.url}/${commentId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private url = 'http://localhost:3000/api/likes';

  constructor(private http: HttpClient) { }

  addLike(userId: string, postId: string) {
    return this.http.post(`${this.url}`, { userId, postId });
  }

  removeLike(userId: string, postId: string) {
    return this.http.delete(`${this.url}/${userId}/${postId}`);
  }

  checkLike(userId: string, postId: string) {
    return this.http.get<{ isLiked: boolean }>(`${this.url}/check/${userId}/${postId}`);
  }

  getLikeCount(postId: string) {
    return this.http.get<{ count: number; postId: string }>(`${this.url}/count/${postId}`);
  }

  getBookmarks(userId: string) {
    return this.http.get<{ postIds: string[] }>(`${this.url}/bookmarks/${userId}`);
  }
}

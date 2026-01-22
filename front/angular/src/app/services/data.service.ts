import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url + '/posts');
  }

  getAllPaginated(page: number = 1, limit: number = 5) {
    return this.http.get(this.url + `/posts?page=${page}&limit=${limit}`);
  }

  addPost(post: any) {
    return this.http.post(this.url + '/posts', post);
  }

  getById(id: string) {
    return this.http.get(this.url + '/posts/' + id);
  }

  incrementViews(id: string) {
    return this.http.get(this.url + '/posts/' + id + '/view');
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikeService } from '../../services/like.service';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BlogItemComponent } from '../blog-item/blog-item.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [CommonModule, BlogItemComponent, PaginationComponent],
  template: `
    <div class="container mt-5">
      <h2>Moje Ulubione Posty 📑</h2>
      @if (bookmarkedPosts.length === 0) {
        <p class="text-muted">Brak ulubionych postów. Dodaj posty do ulubionych klikając na bookmark!</p>
      } @else {
        <div class="row mt-4">
          @for (post of paginatedPosts; track post._id) {
            <div class="col-md-6 col-lg-4 mb-4">
              <blog-item [title]="post.title" [text]="post.text" [image]="post.image" [id]="post._id"></blog-item>
            </div>
          }
        </div>
        @if (totalPages > 1) {
          <app-pagination
            [currentPage]="currentPage"
            [totalItems]="bookmarkedPosts.length"
            [itemsPerPage]="postsPerPage"
            (pageChange)="changePage($event)">
          </app-pagination>
        }
      }
    </div>
  `,
  styles: [`
    h2 {
      color: var(--text-color);
      margin-bottom: 2rem;
    }
  `]
})
export class BookmarksComponent implements OnInit {
  bookmarkedPosts: any[] = [];
  paginatedPosts: any[] = [];
  currentPage = 1;
  totalPages = 1;
  postsPerPage = 6;

  constructor(
    private likeService: LikeService,
    private dataService: DataService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadBookmarks();
  }

  loadBookmarks() {
    const userId = this.authService.currentUser?.userId;
    if (!userId) return;

    this.likeService.getBookmarks(userId).subscribe({
      next: (response) => {
        const postIds = response.postIds;
        // Fetch full post data for all liked posts - get all without pagination
        this.dataService.getAllPaginated(1, 1000).subscribe({
          next: (data: any) => {
            const allPosts = data.posts || data.data || data;
            this.bookmarkedPosts = allPosts.filter((post: any) =>
              postIds.includes(post._id)
            );
            this.totalPages = Math.ceil(this.bookmarkedPosts.length / this.postsPerPage);
            this.updatePaginatedPosts();
          }
        });
      },
      error: (err) => console.error('Błąd ładowania bookmarków:', err)
    });
  }

  updatePaginatedPosts() {
    const start = (this.currentPage - 1) * this.postsPerPage;
    const end = start + this.postsPerPage;
    this.paginatedPosts = this.bookmarkedPosts.slice(start, end);
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updatePaginatedPosts();
  }
}

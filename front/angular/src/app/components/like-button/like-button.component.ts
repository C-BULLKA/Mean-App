import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../services/like.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="like-container d-flex align-items-center gap-2">
      <button
        class="btn btn-sm"
        [class.bookmarked]="isLiked"
        [class.not-bookmarked]="!isLiked"
        [disabled]="!isLoggedIn"
        (click)="toggleLike()"
        [title]="!isLoggedIn ? 'Zaloguj się aby dodać do ulubionych' : ''">
        <span class="bookmark-icon">{{ isLiked ? '❤️' : '♡' }}</span>
      </button>
      <span class="like-count">{{ likeCount }}</span>
    </div>
  `,
  styles: [`
    .like-container {
      margin: 10px 0;
    }
    .btn {
      padding: 5px 10px;
      font-size: 14px;
      background: none;
      border: 1px solid #ddd;
      cursor: pointer;
      transition: all 0.2s;
    }
    .bookmark-icon {
      font-size: 20px;
    }
    .bookmarked {
      background-color: #fff3cd;
      border-color: #ffc107;
    }
    .not-bookmarked:hover {
      background-color: #f8f9fa;
      border-color: #999;
    }
    .like-count {
      font-weight: bold;
      min-width: 30px;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
export class LikeButtonComponent implements OnInit {
  @Input() postId: string = '';

  isLiked: boolean = false;
  likeCount: number = 0;
  isLoggedIn: boolean = false;
  currentUserId: string = '';

  constructor(
    private likeService: LikeService,
    private authService: AuthService
  ) {
    const user = this.authService.currentUser;
    this.isLoggedIn = !!user;
    this.currentUserId = user?._id || user?.userId || '';
  }

  ngOnInit() {
    if (this.postId) {
      this.loadLikeData();
    }
  }

  loadLikeData() {
    // Pobierz liczbę polubień
    this.likeService.getLikeCount(this.postId).subscribe({
      next: (data) => {
        this.likeCount = data.count;
      },
      error: (err) => console.error('Błąd pobierania liczby like:', err)
    });

    // Sprawdź czy użytkownik już polubił
    if (this.isLoggedIn && this.currentUserId) {
      this.likeService.checkLike(this.currentUserId, this.postId).subscribe({
        next: (data) => {
          this.isLiked = data.isLiked;
        },
        error: (err) => console.error('Błąd sprawdzania like:', err)
      });
    }
  }

  toggleLike() {
    if (!this.isLoggedIn || !this.currentUserId) {
      alert('Musisz być zalogowany aby polubić post');
      return;
    }

    if (this.isLiked) {
      // Usuń like
      this.likeService.removeLike(this.currentUserId, this.postId).subscribe({
        next: () => {
          this.isLiked = false;
          this.likeCount--;
        },
        error: (err) => {
          console.error('Błąd usuwania like:', err);
          alert('Błąd usuwania like');
        }
      });
    } else {
      // Dodaj like
      this.likeService.addLike(this.currentUserId, this.postId).subscribe({
        next: () => {
          this.isLiked = true;
          this.likeCount++;
        },
        error: (err) => {
          console.error('Błąd dodawania like:', err);
          alert('Błąd dodawania like');
        }
      });
    }
  }
}

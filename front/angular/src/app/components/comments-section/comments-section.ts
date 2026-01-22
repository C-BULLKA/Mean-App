import { Component, Input, OnInit } from '@angular/core';
import { CommentsService, Comment } from "../../services/comments";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AuthService } from '../../services/auth.service';
import { WordFilterService } from '../../services/word-filter.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-comments-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comments-section.html',
  styleUrl: './comments-section.scss'
})
export class CommentsSectionComponent implements OnInit {
  @Input() postId?: string;
  commentText: string = '';
  comments: Comment[] = [];
  currentUserLogin: string = '';

  constructor(
    private commentsService: CommentsService,
    private authService: AuthService,
    private wordFilterService: WordFilterService,
    private notificationService: NotificationService
  ) {
    const user = this.authService.currentUser;
    this.currentUserLogin = user?.login || '';
  }

  ngOnInit() {
    this.loadComments();
  }

  addComment() {
    if (this.postId && this.commentText.trim() && this.currentUserLogin) {
      // Check for bad words
      if (this.wordFilterService.hasBadWords(this.commentText)) {
        const badWords = this.wordFilterService.getBadWordsFound(this.commentText);
        this.notificationService.error(`⚠️ Twój komentarz zawiera niedozwolone słowa: ${badWords.join(', ')}`);
        return;
      }

      this.commentsService.addComment(this.postId, this.commentText, this.currentUserLogin).subscribe({
        next: () => {
          this.commentText = '';
          this.loadComments();
        },
        error: (err) => {
          console.error('Błąd dodawania komentarza:', err);
          this.notificationService.error('Błąd dodawania komentarza');
        }
      });
    } else if (!this.currentUserLogin) {
      this.notificationService.warning('Musisz być zalogowany aby komentować');
    }
  }

  deleteComment(commentId: string | undefined) {
    if (!commentId) return;

    if (confirm('Czy na pewno chcesz usunąć ten komentarz?')) {
      this.commentsService.deleteComment(commentId).subscribe({
        next: () => {
          this.loadComments();
          this.notificationService.success('Komentarz usunięty');
        },
        error: (err) => {
          console.error('Błąd usuwania komentarza:', err);
          this.notificationService.error('Błąd usuwania komentarza');
        }
      });
    }
  }

  loadComments() {
    if (this.postId) {
      this.commentsService.getCommentsByPostId(this.postId).subscribe({
        next: (data) => {
          this.comments = data;
        },
        error: (err) => {
          console.error('Błąd pobierania komentarzy:', err);
        }
      });
    }
  }

  canDeleteComment(comment: Comment): boolean {
    return comment.author === this.currentUserLogin;
  }
}

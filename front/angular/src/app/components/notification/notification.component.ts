import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notification-container">
      @for (notification of notifications; track notification.id) {
        <div class="notification notification-{{ notification.type }}" role="alert">
          <div class="notification-icon">
            {{ getIcon(notification.type) }}
          </div>
          <div class="notification-content">
            <div class="notification-message">{{ notification.message }}</div>
          </div>
          <button type="button" class="notification-close" (click)="notificationService.remove(notification.id)">✕</button>
        </div>
      }
    </div>
  `,
  styles: [`
    .notification-container {
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 9999;
      max-width: 420px;
    }

    .notification {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      padding: 1rem 1.25rem;
      margin-bottom: 12px;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-left: 4px solid;
      background-color: var(--card-bg, #fff); /* Fallback jeśli zmienna nie istnieje */
    }

    @keyframes slideIn {
      from {
        transform: translateX(450px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    .notification-icon {
      font-size: 1.5rem;
      flex-shrink: 0;
    }

    .notification-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .notification-message {
      font-size: 0.95rem;
      font-weight: 500;
      line-height: 1.4;
    }

    .notification-close {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
      padding: 0;
      color: var(--text-secondary, #666);
      transition: color 0.2s ease;
      flex-shrink: 0;
    }

    .notification-close:hover {
      color: var(--text-color, #000);
    }

    /* Style dla notification-*, które są używane w HTML */
    .notification-error {
      border-left-color: var(--danger-color, #ef4444);
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.08) 0%, rgba(239, 68, 68, 0.04) 100%);
      color: var(--text-color, #000);
    }

    .notification-success {
      border-left-color: var(--success-color, #10b981);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%);
      color: var(--text-color, #000);
    }

    .notification-warning {
      border-left-color: var(--warning-color, #f59e0b);
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(245, 158, 11, 0.04) 100%);
      color: var(--text-color, #000);
    }

    .notification-info {
      border-left-color: var(--primary-color, #6366f1);
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(99, 102, 241, 0.04) 100%);
      color: var(--text-color, #000);
    }

    @media (max-width: 576px) {
      .notification-container {
        left: 12px;
        right: 12px;
        max-width: none;
      }
      .notification {
        font-size: 0.9rem;
      }
    }

    /* Te style (alert-*) nie są używane w obecnym HTML, ale naprawiłem ich składnię */
    .alert-error {
      background-color: #f8d7da;
      border-color: #f5c6cb;
      color: #721c24;
    }

    .alert-success {
      background-color: #d4edda;
      border-color: #c3e6cb;
      color: #155724;
    }

    .alert-warning {
      background-color: #fff3cd;
      border-color: #ffeeba;
      color: #856404;
    }

    .alert-info {
      background-color: #d1ecf1;
      border-color: #bee5eb;
      color: #0c5460;
    }

    /* Obsługa trybu ciemnego (nested CSS) */
    body.dark-mode .alert-error {
      background-color: #4a1d1f;
      border-color: #6a3d3f;
      color: #ff9fa5;
    }

    body.dark-mode .alert-success {
      background-color: #1f4a1f;
      border-color: #3f6a3f;
      color: #90ff90;
    }

    body.dark-mode .alert-warning {
      background-color: #4a3d1f;
      border-color: #6a5d3f;
      color: #ffd700;
    }

    body.dark-mode .alert-info {
      background-color: #1f3a4a;
      border-color: #3f5a6a;
      color: #90d4ff;
    }
  `]
})
export class NotificationComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription!: Subscription;

  constructor(public notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notifications.subscribe(
      notifications => this.notifications = notifications
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getIcon(type: string): string {
    const icons: { [key: string]: string } = {
      'error': '❌',
      'success': '✅',
      'warning': '⚠️',
      'info': 'ℹ️'
    };
    return icons[type] || 'ℹ️';
  }
}

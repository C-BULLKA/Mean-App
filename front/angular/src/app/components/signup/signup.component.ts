import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  credentials = {
    name: '',
    email: '',
    login: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  create() {
    this.authService.createOrUpdate(this.credentials).subscribe({
      next: () => {
        alert('Konto stworzone pomyślnie! Teraz możesz się zalogować.');
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        console.error('Błąd rejestracji:', err);
        alert('Wystąpił błąd podczas rejestracji: ' + (err.error?.error || 'Nieznany błąd'));
      }
    });
  }
}

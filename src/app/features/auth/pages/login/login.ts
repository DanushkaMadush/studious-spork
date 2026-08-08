import { Component, inject } from '@angular/core';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  username = '';
  password = '';
  errorMessage = '';

  login() : void {
    const success = this.authService.login(
      this.username,
      this.password
    );

    if (success) {
      this.router.navigate(['/app/dashboard']);
      return;
    }
    this.errorMessage = 'Invalid username or password';
  }
}

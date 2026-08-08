import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private readonly currentUserState = signal<User | null>(null);

  readonly currentUser = this.currentUserState.asReadonly();

  readonly isAuthenticated = signal(false);

  login(username: string, password: string, ): boolean {
    
    if (username === 'admin' && password === '1234') {
      const user: User = {
        id: 1,
        username: 'admin',
        role: 'Admin'
      }

      this.currentUserState.set(user);
      this.isAuthenticated.set(true);
      return true;
    }

    if (username === 'user' && password === '1234') {
      const user: User = {
        id: 2,
        username: 'user',
        role: 'User'
      };

      this.currentUserState.set(user);
      this.isAuthenticated.set(true);
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserState.set(null);
    this.isAuthenticated.set(false);
  }
}

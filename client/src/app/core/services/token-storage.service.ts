import { Injectable, signal } from '@angular/core';
import { User } from '../../shared/models/interface';
import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  // Signals for reactive auth state
  token = signal<string | null>(this.loadToken());
  user = signal<User | null>(this.loadUser());

  constructor() { }

  // -------- LOCAL STORAGE HELPERS --------

  private loadToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private loadUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  // -------- AUTH METHODS --------

  signOut(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token.set(null);
    this.user.set(null);
  }

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
    this.token.set(token);
  }

  getToken(): string | null {
    return this.token();
  }

  saveUser(user: User): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    this.user.set(user);
  }

  getUser(): User | null {
    return this.user();
  }

  // -------- AUTH VALIDATION --------

  isAuthenticated(): boolean {
    const token = this.token();

    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);

      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && now > decoded.exp) {
        // Token expired
        this.signOut();
        return false;
      }

      return true;

    } catch (error) {
      // Malformed token
      this.signOut();
      return false;
    }
  }
}

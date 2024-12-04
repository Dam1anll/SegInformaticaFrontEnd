import { EventEmitter, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: any = {
    id: '',
    name: '',
    email: '',
    role: '',
  };

  is_login = false;
  isFirstLogin = false;

  openDialogEvent: EventEmitter<void> = new EventEmitter<void>();

  sessionExpiredSubject = new BehaviorSubject<boolean>(false);
  sessionExpired$: Observable<boolean> = this.sessionExpiredSubject.asObservable();

  constructor(private api: ApiService, private router: Router) {
    this.authenticate();
  }

  authenticate() {
    const accessToken = this.getAccessToken();
    if (accessToken && !this.isTokenExpired(accessToken)) {
      this.is_login = true;
      const decodedToken = this.getDecodedAccessToken(accessToken);
      this.setUser(decodedToken);
    } else {
      this.is_login = false;
    }
  }

  handleFirstLogin() {
    this.isFirstLogin = false;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  getUserRole(data: any) {
    const decodedAccessToken = this.getDecodedAccessToken(data.access_token);
    const userRole = decodedAccessToken.role;
    
    return userRole;
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getRefreshToken() {
    return localStorage.getItem('refresh_token');
  }

  setLogin(data: any) {
    this.is_login = true;
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    this.setUser(data.user);
  }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  logout() {
    localStorage.clear();
    this.is_login = false;
    this.router.navigate(['/login']); // Redirige al usuario al login después de cerrar sesión
  }

  hasRole(roles: string[]): boolean {
    return roles.includes(this.user.role);
  }

  register(userData: any): Observable<any> {
    return this.api.post('auth/register', userData);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.api.post('auth/login', credentials);
  }

  refreshAccessToken() {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return;

    this.api.post('auth/refresh-token', { refresh_token: refreshToken }).subscribe({
      next: (response: any) => {
        localStorage.setItem('access_token', response.access_token);
        this.authenticate(); // Reautenticar al usuario con el nuevo token
      },
      error: () => {
        this.logout();
        this.sessionExpiredSubject.next(true); // Emitir evento de sesión expirada
      },
    });
  }

  isTokenExpired(token: string): boolean {
    const decodedToken: any = this.getDecodedAccessToken(token);
    if (!decodedToken) return true;

    const now = Math.floor(Date.now() / 1000);
    return decodedToken.exp < now;
  }

  ensureValidAccessToken() {
    const accessToken = this.getAccessToken();
    if (accessToken && this.isTokenExpired(accessToken)) {
      this.refreshAccessToken();
    }
  }

  fetchUserFromAccessToken(): Observable<any> {
    const accessToken = this.getAccessToken();
    return this.api.post('auth/access-token', { access_token: accessToken });
  }

  toggleUserStatus(userId: string, status: boolean): Observable<any> {
    return this.api.put(`users/${userId}/status`, { isActive: status });
  }
}

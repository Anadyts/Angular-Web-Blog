import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../../login/services/login.service';
import { User } from '../../login/models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private userStore = new BehaviorSubject<User | null>(null);
  user$ = this.userStore.asObservable();
  private isAuthSub = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuthSub.asObservable();

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    this.loginService.isAuth$.subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.isAuthSub.next(true);
        this.fetchUser();
      } else {
        this.userStore.next(null);
        this.isAuthSub.next(false);
      }
    });
  }

  private fetchUser() {
    this.http.post<{user: User}>('http://localhost:7200/api/auth', {token: this.getToken()}).subscribe({
      next: (response) => this.userStore.next(response.user),
      error: (error) => {
        console.error('Error fetching user:', error);
        this.userStore.next(null);
        localStorage.clear()
      }
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    this.loginService.logout()
  }
}

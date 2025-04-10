import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../models/login.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:7200/api/login'
  private tokenKey = 'token';
  private isAuthSub = new BehaviorSubject<boolean>(false);
  isAuth$ = this.isAuthSub.asObservable();
  
  constructor(private http: HttpClient, private router: Router) {
    const token = this.getToken();
    this.isAuthSub.next(!!token)
  }

  login(username: string, password: string){
    return this.http.post<{token: string}>(this.apiUrl, {username, password})
      .pipe(
        tap(response => {
          this.setToken(response.token)
          this.isAuthSub.next(true)
          this.router.navigate(['/blog'])
        })
      )
  }

  logout(){
    localStorage.clear()
    this.isAuthSub.next(false)
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey)
  }

  setToken(token: string){
    localStorage.setItem(this.tokenKey, token)
  }

}

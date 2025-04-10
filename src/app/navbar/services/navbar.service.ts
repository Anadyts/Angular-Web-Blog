import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/navbar.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private userStore= new BehaviorSubject<User | null>(null);
  private apiUrl = 'http://localhost:7200/api/auth'
  private tokenKey = 'token';
  user$ = this.userStore.asObservable();

  constructor(private http: HttpClient) { 
    this.http.post<{user: User}>(this.apiUrl, {token: this.getToken()}).subscribe({
      next: (response) => {
        this.userStore.next(response.user)
      }
    })
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  logout(){
    localStorage.clear()
    this.userStore.next(null)
    
  }

}

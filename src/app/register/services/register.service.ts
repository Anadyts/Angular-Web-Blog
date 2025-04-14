import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:7200/api/'
  constructor(private http: HttpClient) { }

  register(username: string, password: string){
    return this.http.post<{message: string}>(this.apiUrl + 'register', {username, password})
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserStateService } from '../../core/services/user-state.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../login/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class CreateArticleService {
  private apiUrl = 'http://localhost:7200/api/create-blog'
  private userStore: User | null = null
  
  constructor(private router: Router,  private userStateService:UserStateService, private http: HttpClient) {
    this.userStateService.user$.subscribe({
      next: (user) => this.userStore = user,
      error: (err) => console.log('Get User Error', err)
    })
  }
  
  createBlog(title: string, content: string): void {
    this.http.post<{message: string}>(this.apiUrl, {title: title, content: content, user_id: this.userStore?.user_id}).subscribe({
      next: (response) => {
        console.log(response.message)
        this.router.navigate(['/blog'])
      },
      error: (err) => {console.log('Error create blog', err)}
    })
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../blog/models/blog.model';import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../login/models/login.model';
;

@Injectable({
  providedIn: 'root'
})
export class BlogDetailService {
  private apiUrl = 'http://localhost:7200/api/article'

  constructor(private http: HttpClient) { }

  getBlogDetails(article_id: string) {
    return this.http.post<{article: Article, author: string}>(this.apiUrl, { article_id })
  }
}

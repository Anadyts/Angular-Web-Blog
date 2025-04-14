import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../blog/models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class MyBlogService {
  private apiUrl = 'http://localhost:7200/api/'
  constructor(private http:HttpClient) {
  }

  getArticle(user_id: number){
    return this.http.get<{articles: Article[]}>(this.apiUrl + `article?user_id=${user_id}`)
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../blog/models/blog.model';import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../login/models/login.model';
import { BlogComment, Like } from '../models/blog-detail.model';
@Injectable({
  providedIn: 'root'
})
export class BlogDetailService {
  private apiUrl = 'http://localhost:7200/api/'
  constructor(private http: HttpClient) { }

  getBlogDetails(article_id: string) {
    return this.http.post<{article: Article, author: string}>(this.apiUrl+'article', { article_id })
  }

  getComment(limit: number, article_id: string){
    return this.http.get<{comments: BlogComment[],totalPage: number}>
    (this.apiUrl + 'comment' + `?limit=${limit}&article_id=${article_id}`)
  }

  postComment(comment: string, user_id: number, article_id: string){
    return this.http.post<{comment: BlogComment}>(this.apiUrl + 'new-comment', {comment, user_id, article_id})
  }

  getLike(user_id: number, article_id: string){
    return this.http.get<{like: Like}>(this.apiUrl + `like?user_id=${user_id}&article_id=${article_id}`)
  }

  like(user_id: number, article_id: string){
    return this.http.post<{message: string}>(this.apiUrl + 'like', {user_id, article_id})
  }

  unLike(user_id: number, article_id: string){
    return this.http.delete<{message: string}>(this.apiUrl + `unlike?user_id=${user_id}&article_id=${article_id}`)
  }
}

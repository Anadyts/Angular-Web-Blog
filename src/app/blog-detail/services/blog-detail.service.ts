import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../../blog/models/blog.model';import { BehaviorSubject, tap } from 'rxjs';
import { User } from '../../login/models/login.model';
import { BlogComment } from '../models/blog-detail.model';
@Injectable({
  providedIn: 'root'
})
export class BlogDetailService {
  private apiArticle = 'http://localhost:7200/api/article'
  private apiComment = 'http://localhost:7200/api/comment'
  private apiNewComment = 'http://localhost:7200/api/new-comment'
  constructor(private http: HttpClient) { }

  getBlogDetails(article_id: string) {
    return this.http.post<{article: Article, author: string}>(this.apiArticle, { article_id })
  }

  getComment(limit: number, article_id: string){
    return this.http.get<{comments: BlogComment[],totalPage: number}>
    (this.apiComment + `?limit=${limit}&article_id=${article_id}`)
  }

  postComment(comment: string, user_id: number, article_id: string){
    return this.http.post<{comment: BlogComment}>(this.apiNewComment, {comment, user_id, article_id})
  }
}

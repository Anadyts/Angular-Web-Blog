import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/blog.model';
import { BehaviorSubject, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = 'http://localhost:7200/api/blog'
  private articlesSub = new BehaviorSubject<Article[]>([])
  article$ = this.articlesSub.asObservable()

  constructor(private http: HttpClient) { }

  fetchArticles(limit: number, search: string){
    return this.http.get<{articles: Article[]}>(this.apiUrl + `?limit=${limit}&search=${search}`).pipe(
      tap((res) => {
        this.articlesSub.next(res.articles)
        console.log(res.articles)
      }),
      catchError((err) => {
        return of({articles: []})
      })
    )
  }
}

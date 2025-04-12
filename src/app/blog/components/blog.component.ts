import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Article } from '../models/blog.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
  articles: Article[] = []
  private limit : number = 4
  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.getArticles(this.limit)
  }

  getArticles(limit : number){
    this.blogService.fetchArticles(limit).subscribe({
      next: (res) => {
        this.articles = res.articles
      },
      error: (err) => {
        console.log('Init blog error', err)
      }
    })
  }

  moreArticles(){
    this.limit += 4
    this.getArticles(this.limit)
    console.log(this.limit)
    
  }
}

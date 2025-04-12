import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogService } from '../services/blog.service';
import { Article } from '../models/blog.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blog',
  standalone:true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent implements OnInit{
  articles: Article[] = []
  private limit : number = 4
  isRanOutOfArticles : boolean = false
  search: string = ''
  error: string = ''
  constructor(private blogService: BlogService){}

  ngOnInit(): void {
    this.isRanOutOfArticles = false
    this.getArticles(this.limit)
  }

  getArticles(limit : number){
    this.blogService.fetchArticles(limit, this.search).subscribe({
      next: (res) => {
        this.articles = res.articles

        if(this.articles.length < limit){
          this.isRanOutOfArticles = true
        }
      },
      error: (err) => {
        console.log('Init blog error', err)
      }
    })
  }

  moreArticles(){
    this.limit += 4
    this.getArticles(this.limit)
    
  }

  searchArticles(){
    this.isRanOutOfArticles = true
    this.getArticles(this.limit)

    if(this.search === ''){
      this.isRanOutOfArticles = false
    }
  }
}

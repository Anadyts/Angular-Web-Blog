import { Component, OnInit } from '@angular/core';
import { Article } from '../../blog/models/blog.model';
import { MyBlogService } from '../services/my-blog.service';
import { UserStateService } from '../../core/services/user-state.service';
import { User } from '../../login/models/login.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-blog',
  imports: [CommonModule, RouterLink],
  templateUrl: './my-blog.component.html',
  styleUrl: './my-blog.component.scss'
})
export class MyBlogComponent implements OnInit{
  articles: Article[] = []
  user: User | null = null

  constructor(private myBlogService: MyBlogService, private userStateService: UserStateService){}
  ngOnInit(): void {
    this.userStateService.user$.subscribe({
      next: (user) => {
        this.user = user
        if(user){
          this.getArticle()
        }
      }
    })
  }
  
  getArticle(){
    this.myBlogService.getArticle(this.user!.user_id).subscribe({
      next: (res) => {
        this.articles = res.articles
      }
    })
  }

}

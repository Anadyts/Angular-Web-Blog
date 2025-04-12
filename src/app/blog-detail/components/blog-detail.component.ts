import { Component, OnInit } from '@angular/core';
import { BlogDetailService } from '../services/blog-detail.service';
import { Article } from '../../blog/models/blog.model';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../login/models/login.model';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit{
  article : Article | null = null
  author: string = ''
  constructor(private blogDetailService: BlogDetailService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const articleId: string = this.route.snapshot.paramMap.get('id')!;
    this.blogDetailService.getBlogDetails(articleId).subscribe({
      next: (res) => {
        this.article = res.article
        this.author = res.author
      }
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { BlogDetailService } from '../services/blog-detail.service';
import { Article } from '../../blog/models/blog.model';
import { ActivatedRoute, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { User } from '../../login/models/login.model';
import { BlogComment } from '../models/blog-detail.model';
import { FormsModule } from '@angular/forms';
import { UserStateService } from '../../core/services/user-state.service';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit{
  page: number = 1
  limit: number = 4
  article : Article | null = null
  author: string = ''
  isCommentSectionOn : boolean = false 
  currentPage: number = 0
  totalPage: number = 0
  comments: BlogComment[] | null = null
  newComment: string = ''
  user : User | null = null
  isLike : boolean = false
  constructor(private blogDetailService: BlogDetailService, private route: ActivatedRoute, private userStateService: UserStateService){
    
  }

  ngOnInit(): void {
    
    const articleId: string = this.route.snapshot.paramMap.get('id')!;
    this.blogDetailService.getBlogDetails(articleId).subscribe({
      next: (res) => {
        this.article = res.article
        this.author = res.author
      }
    })

    this.userStateService.user$.subscribe({
      next:(user) => {
        this.user = user
        if(this.user){
          this.getLike()
        }
      }
    })
  }

  turnOnComment(){
    const current = this.isCommentSectionOn
    this.isCommentSectionOn = !current
    
    if(this.isCommentSectionOn){
      this.loadComment(true)
    }
  }

  loadComment(firstLoad: boolean = false){
    const articleId: string = this.route.snapshot.paramMap.get('id')!;
    this.blogDetailService.getComment(this.limit, articleId).subscribe({
      next: (res) => {
        if(firstLoad){
          this.totalPage = res.totalPage - 1
        }
        this.comments = res.comments
      }
    })
  }

  nextComment(){
    this.currentPage++;
    this.limit += 4
    this.loadComment(false)
  }

  postNewComment(){
    const articleId: string = this.route.snapshot.paramMap.get('id')!;
    this.blogDetailService.postComment(this.newComment, this.user!.user_id, articleId).subscribe({
      next: (res)=>{
        const newComment: BlogComment = res.comment;

      if (!this.comments) {
        this.comments = [newComment];
      } else {
        
        this.comments.push(newComment);
      }

      this.newComment = '';

      
        
      },
      error: (err) => {
        console.log(err)
      }
    })

    
  }

  getLike(){
    const articleId: string = this.route.snapshot.paramMap.get('id')!;
    this.blogDetailService.getLike(this.user!.user_id, articleId).subscribe({
      next: (res) => {
        if(res.like){
          this.isLike = true
          console.log(this.isLike)
        }
      },
      error: (err) => {
        console.log('Not found like', err)
      }
    })
  }

  toggleLike(){
    const articleId: string = this.route.snapshot.paramMap.get('id')!;

    if(this.isLike){
      this.blogDetailService.unLike(this.user!.user_id, articleId).subscribe({
        next: (res) => {
          this.isLike = false
          console.log(res)
        },
        error: (err) => {
          console.log('Unlike Error', err)
        }
      })
    }else{
      this.blogDetailService.like(this.user!.user_id, articleId).subscribe({
        next: (res) => {
          this.isLike = true
          console.log(res)
        },
        error: (err) => {
          console.log('Like Error', err)
        }
      })
    }
  }
}

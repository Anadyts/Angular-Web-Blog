import { Component } from '@angular/core';
import { CreateArticleService } from '../services/create-article.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-article',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.scss'
})
export class CreateArticleComponent {
  title : string = ''
  content: string = ''

  constructor(private createArticle: CreateArticleService){}
  
  createBlog(){
    if (!this.title.trim() || !this.content.trim()) {
      alert("Please fill in both Title and Content.");
      return;
    }
    this.createArticle.createBlog(this.title, this.content)
  }

}

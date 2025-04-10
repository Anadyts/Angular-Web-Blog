import { HttpClient } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = ''
  password: string = ''
  error: string = ''

  constructor(private loginService: LoginService,private router: Router){}

  login(){
    if(this.username.trim() && this.password.trim()){
      this.loginService.login(this.username, this.password).subscribe({
        next: () => {
          
        },
        error: (err) => {
          this.error = 'Login failed. Please try again.'
        }
  
      })
    }else{
      this.error = 'Username and password are required.'
    }
  }

}

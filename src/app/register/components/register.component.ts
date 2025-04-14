import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  error: string = ''
  username: string = ''
  password: string = ''
  confirmPassword: string = ''
  constructor(private router: Router,private registerService: RegisterService){

  }

  register(){
    this.error = ''
    if(this.username.trim() && this.password.trim() && this.confirmPassword.trim()){
      if(this.password !== this.confirmPassword){
        this.error = 'Password is not matched!'
      }else{
        this.registerService.register(this.username, this.password).subscribe({
          next: (res) => {
            
            this.router.navigate(['/login'])
          },
          error: (err) => {
            this.error = 'This Username is already used!'
          }
        })
        
      }
    }else{
      this.error = 'Username and Password are required'
    }
  }
}

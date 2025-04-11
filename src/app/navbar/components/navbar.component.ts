import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/navbar.model';
import { NavbarService } from '../services/navbar.service';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../login/services/login.service';
import { BehaviorSubject } from 'rxjs';
import { UserStateService } from '../../core/services/user-state.service';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user: User | null = null
  isAuth : boolean = false

  constructor(private userStateService: UserStateService){
    this.userStateService.user$.subscribe(user => {
      this.user = user
    })
    this.userStateService.isAuth$.subscribe(isAuth => {
      this.isAuth = isAuth
    })
  }

  logout(){
    this.userStateService.logout()
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../models/navbar.model';
import { NavbarService } from '../services/navbar.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  user: User | null = null

  constructor(private navService: NavbarService){
    navService.user$.subscribe({
      next: (user) => {
        this.user = user
      }
    })
  }

  logout(){
    this.navService.logout()
  }
}

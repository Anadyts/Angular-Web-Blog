import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HomeService } from '../services/home.service';
import { User } from '../../login/models/login.model';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  user: User | null = null
  constructor(homeService: HomeService){
    homeService.user$.subscribe(user => {
      this.user = user
    })
  }
}

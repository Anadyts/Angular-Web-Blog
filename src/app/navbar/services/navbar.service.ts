import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/navbar.model';
import { BehaviorSubject } from 'rxjs';
import { LoginService } from '../../login/services/login.service';
import { UserStateService } from '../../core/services/user-state.service';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private userStore = new BehaviorSubject<User | null>(null);
  user$ = this.userStore.asObservable();

  constructor(private userStateService: UserStateService) { 
    this.userStateService.user$.subscribe(user => {
      this.userStore.next(user);
    });
  }
}
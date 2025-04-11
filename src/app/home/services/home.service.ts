import { Injectable } from '@angular/core';
import { UserStateService } from '../../core/services/user-state.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../login/models/login.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private userStore = new BehaviorSubject<User | null>(null);
  user$ = this.userStore.asObservable();

  constructor(userStateService: UserStateService) { 
    userStateService.user$.subscribe(user => {
      this.userStore.next(user);
    });
  }
}

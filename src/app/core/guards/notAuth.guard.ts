import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login/services/login.service';
import { map, take } from 'rxjs/operators';

export const notAuthGuard = () => {
const loginService = inject(LoginService);
const router = inject(Router);

return loginService.isAuth$.pipe(
    take(1),
    map(isAuth => {
    if (!isAuth) {
        return true;
    }
    router.navigate(['/Home']);
    return false;
    })
);
};

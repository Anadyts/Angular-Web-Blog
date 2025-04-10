import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/components/register.component';
import { HomeComponent } from './home/components/home.component';
import { BlogComponent } from './blog/components/blog.component';
import { authGuard } from './core/guards/auth.guard';
import { notAuthGuard } from './core/guards/notAuth.guard';

export const routes: Routes = [
    {path:'login', component:LoginComponent, canActivate:[notAuthGuard]},
    {path:'blog', component:BlogComponent, canActivate:[authGuard]},
    {path:'register', component:RegisterComponent, canActivate:[notAuthGuard]},
    {path:'', component:HomeComponent},
    {path:'**', component:HomeComponent},
];

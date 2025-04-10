import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/components/register.component';
import { HomeComponent } from './home/components/home.component';
import { BlogComponent } from './blog/components/blog.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'blog', component:BlogComponent},
    {path:'register', component:RegisterComponent},
    {path:'', component:HomeComponent},
    {path:'**', component:HomeComponent},
];

import { Routes } from '@angular/router';
import { LoginComponent } from './login/components/login.component';
import { RegisterComponent } from './register/components/register.component';
import { HomeComponent } from './home/components/home.component';
import { BlogComponent } from './blog/components/blog.component';
import { authGuard } from './core/guards/auth.guard';
import { notAuthGuard } from './core/guards/notAuth.guard';
import { CreateArticleComponent } from './create-article/components/create-article.component';
import { BlogDetailComponent } from './blog-detail/components/blog-detail.component';

export const routes: Routes = [
    {path:'login', component:LoginComponent, canActivate:[notAuthGuard]},
    {path:'blog', component:BlogComponent, canActivate:[authGuard]},
    {path:'register', component:RegisterComponent, canActivate:[notAuthGuard]},
    {path:'blog/create-article', component:CreateArticleComponent, canActivate:[authGuard]},
    {path:'blog/details/:id', component:BlogDetailComponent, canActivate:[authGuard]},
    {path:'', component:HomeComponent},
    {path:'**', component:HomeComponent},
];

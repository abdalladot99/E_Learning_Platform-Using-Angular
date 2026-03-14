import { Routes } from '@angular/router';

export const routes: Routes = [
  {path :'' , redirectTo:'user',pathMatch:'full'},
  {
    path:'user',
    loadComponent:()=>import('./layouts/user/user.component')
    .then((c)=>c.UserComponent),

    children:[
      {path :'' , redirectTo:'home',pathMatch:'full'},

      {
        path:'home',
        loadComponent:()=>import('./pages/home/home.component')
        .then((c)=>c.HomeComponent),
      }

    ]
  },

  {
    path:'admin',
    loadComponent:()=>import('./layouts/admin/admin.component')
    .then((c)=>c.AdminComponent)
  },

];

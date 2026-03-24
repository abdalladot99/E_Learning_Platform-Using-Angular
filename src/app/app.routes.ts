import { Routes } from '@angular/router';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component')
        .then(m => m.LoginComponent),
  },

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
      },
      {
        path:'details/:id',
        loadComponent: () =>
          import('./pages/details/details.component')
          .then(c => c.DetailsComponent)
      },
      {
        path:'teacher-profile/:id',
        loadComponent: () =>
          import('./shared/components/teacher-profile/teacher-profile.component')
          .then(c => c.TeacherProfileComponent)
      },
      {
        path:'teacher-by-subject/:params',
        loadComponent: () =>
          import('./pages/teachers-by-subject/teachers-by-subject.component')
          .then(c => c.TeachersBySubjectComponent)
      },
      {
        path: 'courses/level',
        loadComponent: () =>
          import('./pages/courses-by-level/courses-by-level.component').then(m => m.CoursesByLevelComponent)
      }
    ]
  },

  {
    path:'admin',
    loadComponent:()=>import('./layouts/admin/admin.component')
    .then((c)=>c.AdminComponent)
  },

];

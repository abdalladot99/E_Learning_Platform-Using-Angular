import { AuthService } from './../../services/auth.service';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { SidebarModule } from 'primeng/sidebar';
import { InputTextModule } from 'primeng/inputtext';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-user-header',
  standalone: true,
    imports: [
    CommonModule,
    RouterModule,
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    MenuModule,
    BadgeModule,
    RippleModule,
    TooltipModule,
    SidebarModule,
    InputTextModule,
    OverlayPanelModule,
    RouterLink
  ],
  templateUrl: './header-user.component.html',
  styleUrl: './header-user.component.css'
})
export class HeaderUserComponent{

  constructor(private authService: AuthService) { }

  sidebarVisible = false;
  isLoggedIn = this.authService.isLoggedIn();

  user = {
    name: 'أحمد محمد',
    avatar: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png',
    role: 'طالب'
  };

  navLinks = [
    { label: 'الرئيسية', icon: 'pi pi-home', route: '/' },
    { label: 'الكورسات', icon: 'pi pi-book', route: '/courses' },
    { label: 'المدرسين', icon: 'pi pi-users', route: '/teachers' },
    { label: 'تواصل معنا', icon: 'pi pi-envelope', route: '/contact' }
  ];

  menuItems = [
    { label: 'الملف الشخصي', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'كورساتي', icon: 'pi pi-book', routerLink: '/my-courses' },
    { label: 'الإعدادات', icon: 'pi pi-cog', routerLink: '/settings' },
    { separator: true },
    { label: 'تسجيل خروج', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  logout() {
      this.authService.logout();
  }
}

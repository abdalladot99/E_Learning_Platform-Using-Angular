import { Component } from '@angular/core';
import { FooterAdminComponent } from "../admin-footer/footer-admin.component";
import { RouterOutlet } from "@angular/router";
import { HeaderAdminComponent } from "../admin-header/header-admin.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    FooterAdminComponent,
    RouterOutlet,
    HeaderAdminComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

}

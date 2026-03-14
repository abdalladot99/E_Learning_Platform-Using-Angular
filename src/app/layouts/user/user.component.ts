import { Component } from '@angular/core';
import { HeaderUserComponent } from "../user-header/header-user.component";
import { RouterOutlet } from "@angular/router";
import { FooterUserComponent } from "../user-footer/footer-user.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HeaderUserComponent, RouterOutlet, FooterUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}

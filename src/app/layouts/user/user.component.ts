import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FooterUserComponent } from "../user-footer/footer-user.component";
import { HeaderUserComponent } from '../user-header/header-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [HeaderUserComponent, RouterOutlet, FooterUserComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

}

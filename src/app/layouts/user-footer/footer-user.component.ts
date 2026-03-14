import { Component } from '@angular/core';

@Component({
  selector: 'app-user-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer-user.component.html',
  styleUrl: './footer-user.component.css'
})
export class FooterUserComponent {

  currentYear: number = new Date().getFullYear();

}


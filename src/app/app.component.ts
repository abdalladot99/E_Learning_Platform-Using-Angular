import { Component } from '@angular/core';
import { AdminComponent } from "./layouts/admin/admin.component";
import { UserComponent } from "./layouts/user/user.component";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AdminComponent, UserComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E_Learning_Platform';
}

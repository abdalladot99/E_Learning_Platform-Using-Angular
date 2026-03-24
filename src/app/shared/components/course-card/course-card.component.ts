import { Component, Input, signal } from '@angular/core';
import { Course } from '../../../interfaces/home';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, RouterModule ],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent {

  @Input() course!: Course ;

  @Input() i!: number ;

  @Input() status!: string ;

}

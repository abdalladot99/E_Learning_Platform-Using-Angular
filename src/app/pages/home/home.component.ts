// home.component.ts

import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeServiceService } from '../../services/home-service.service';
import { ApiResponse, HomeData, Course, Teacher } from '../../interfaces/home';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // ✅ استخدام Signals (الطريقة الجديدة)
  popularCourses = signal<Course[]>([]);
  recentCourses = signal<Course[]>([]);
  topTeachers = signal<Teacher[]>([]);
  totalCourses = signal<number>(0);
  totalUsers = signal<number>(0);
  totalTeachers = signal<number>(0);

  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor(private homeService: HomeServiceService) {}

  ngOnInit(): void {
    this.getDataHome();
  }

  getDataHome(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.homeService.getCourses().subscribe({
      next: (res: ApiResponse<HomeData>) => {
        if (res.success) {
          this.popularCourses.set(res.value.popularCourses);
          this.recentCourses.set(res.value.recentCourses);
          this.topTeachers.set(res.value.topTeachers);
          this.totalCourses.set(res.value.totalCourses);
          this.totalUsers.set(res.value.totalUsers);
          this.totalTeachers.set(res.value.totalTeachers);
        } else {
          this.errorMessage.set(res.error || 'حدث خطأ ما');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage.set('فشل في تحميل البيانات');
        this.isLoading.set(false);
      }
    });
  }

}

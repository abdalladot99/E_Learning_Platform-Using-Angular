import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeServiceService } from '../../services/home-service.service';
import { CourseCardComponent } from '../../shared/components/course-card/course-card.component';

interface Subject {
  name: string;
  icon: string;
  color: string;
  count?: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // Signals
  popularCourses = signal<any[]>([]);
  recentCourses = signal<any[]>([]);
  topTeachers = signal<any[]>([]);
  totalCourses = signal<number>(0);
  totalUsers = signal<number>(0);
  totalTeachers = signal<number>(0);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  subjects = [
  { name: 'اللغة العربية', slug: 'arabic', icon: 'pi pi-book', color: '#be185d' },

  { name: 'اللغة الإنجليزية', slug: 'english', icon: 'pi pi-globe', color: '#f59e0b' },

  { name: 'اللغة الفرنسية', slug: 'french', icon: 'pi pi-flag', color: '#6366f1' },

  { name: 'الرياضيات', slug: 'math', icon: 'pi pi-calculator', color: '#2563eb' },

  { name: 'الفيزياء', slug: 'physics', icon: 'pi pi-bolt', color: '#6366f1' },

  { name: 'الكيمياء', slug: 'chemistry', icon: 'pi pi-filter', color: '#f43f5e' },

  { name: 'الأحياء', slug: 'biology', icon: 'pi pi-heart', color: '#22d3ee' },

  { name: 'العلوم', slug: 'science', icon: 'pi pi-cog', color: '#059669' },

  { name: 'التاريخ', slug: 'history', icon: 'pi pi-clock', color: '#b91c1c' },

  { name: 'الجغرافيا', slug: 'geography', icon: 'pi pi-map', color: '#10b981' },

  { name: 'الدراسات الإجتماعية', slug: 'social-studies', icon: 'pi pi-users', color: '#0ea5e9' },

  { name: 'الفلسفة', slug: 'philosophy', icon: 'pi pi-question-circle', color: '#9333ea' },

  { name: 'علم النفس', slug: 'psychology', icon: 'pi pi-user', color: '#0ea5e9' },

  { name: 'العلوم المتكاملة', slug: 'integrated-science', icon: 'pi pi-th-large', color: '#16a34a' },

  { name: 'الإحصاء', slug: 'statistics', icon: 'pi pi-chart-bar', color: '#0ea5e9' },

  { name: 'المواد الشرعية', slug: 'islamic-studies', icon: 'pi pi-star', color: '#22c55e' },

  { name: 'لغة عربية أزهرية', slug: 'azhar-arabic', icon: 'pi pi-book', color: '#15803d' },

  { name: 'مهارات', slug: 'skills', icon: 'pi pi-palette', color: '#f59e0b' },

  { name: 'حاسب آلي', slug: 'computer-science', icon: 'pi pi-desktop', color: '#06b6d4' }
];

  constructor(private homeService: HomeServiceService) {}

  ngOnInit(): void {
    this.getDataHome();
  }

  getDataHome(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.homeService.getCourses().subscribe({
      next: (res) => {
        if (res.success && res.value) {
          this.popularCourses.set(res.value.popularCourses || []);
          this.recentCourses.set(res.value.recentCourses || []);
          this.topTeachers.set(res.value.topTeachers || []);
          this.totalCourses.set(res.value.totalCourses || 0);
          this.totalUsers.set(res.value.totalUsers || 0);
          this.totalTeachers.set(res.value.totalTeachers || 0);
        } else {
          this.errorMessage.set(res.error || 'حدث خطأ في تحميل البيانات');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error:', err);
        this.errorMessage.set('فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.');
        this.isLoading.set(false);
      }
    });
  }

  filterBySubject(subject: string): void {
    // Navigate to courses with subject filter
    console.log('Filter by:', subject);
  }
}

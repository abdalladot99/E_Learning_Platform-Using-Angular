import { Component, signal } from '@angular/core';
// PrimeNG
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { SkeletonModule } from 'primeng/skeleton';
import { RippleModule } from 'primeng/ripple';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TeacherProfile } from '../../../interfaces/teacher-detalis';
import { ApiResponse, Course } from '../../../interfaces/home';
import { TeacherService } from '../../../services/teacher.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CourseCardComponent } from "../course-card/course-card.component";

@Component({
  selector: 'app-teacher-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule,
    TagModule,
    SkeletonModule,
    RippleModule,
    PaginatorModule,
    TooltipModule,
    ToastModule,
    CourseCardComponent
],
  providers: [MessageService],
  templateUrl: './teacher-profile.component.html',
  styleUrl: './teacher-profile.component.css'
})
export class TeacherProfileComponent {
teacher = signal<TeacherProfile | null>(null);
  courses = signal<Course[]>([]);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  // Pagination
  currentPage = signal<number>(1);
  pageSize = signal<number>(6);
  totalRecords = signal<number>(0);

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    const teacherId = this.route.snapshot.paramMap.get('id');
    if (teacherId) {
      this.loadTeacher(teacherId);
    }
  }

  loadTeacher(id: string, page: number = 1): void {
    this.isLoading.set(true);
    this.error.set('');

    this.teacherService.getTeacherById(id, page, this.pageSize()).subscribe({
      next: (res: ApiResponse<TeacherProfile>) => {
        if (res.success && res.value) {
          this.teacher.set(res.value);
          this.courses.set(res.value.pagedResult?.data || []);
          this.totalRecords.set(res.value.pagedResult?.totalCount || 0);
          this.currentPage.set(res.value.pagedResult?.pageNumber || 1);
        } else {
          this.error.set(res.error || 'حدث خطأ في تحميل البيانات');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading teacher:', err);
        this.error.set('فشل في تحميل بيانات المدرس. يرجى المحاولة مرة أخرى.');
        this.isLoading.set(false);
      }
    });
  }

  onPageChange(event: any): void {
    const page = event.page + 1;
    const teacherId = this.teacher()?.teacherId;
    if (teacherId) {
      this.loadTeacher(teacherId, page);
      // Scroll to courses section
      document.querySelector('.courses-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  getPercentage(value: number, max: number): number {
    return Math.min((value / max) * 100, 100);
  }

  handleImageError(event: any): void {
    event.target.src = 'https://via.placeholder.com/180x180?text=No+Image';
  }

  shareProfile(): void {
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: `${this.teacher()?.teacherName} - مدرس ${this.teacher()?.subject}`,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      this.messageService.add({
        severity: 'success',
        summary: 'تم النسخ',
        detail: 'تم نسخ رابط الصفحة بنجاح'
      });
    }
  }

  getRatingStars(rating: number): number[] {
    return Array(5).fill(0).map((_, i) => i < Math.floor(rating) ? 1 : 0);
  }
}

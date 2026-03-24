import { MessageService } from 'primeng/api';

import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

// PrimeNG
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { DetailsService } from '../../services/details.service';
import { ApiResponse, CourseDetails } from '../../interfaces/course';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TagModule,
    AvatarModule,
    DividerModule,
    SkeletonModule,
    ToastModule,
    RippleModule,
    TabViewModule,
    AccordionModule,
    ProgressBarModule,
    RouterModule
],

  providers: [MessageService],   // ⬅️ مهم
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {


  course = signal<CourseDetails | null>(null);
  isLoading = signal<boolean>(true);
  error = signal<string>('');

  constructor(
    private route: ActivatedRoute,
    private courseService: DetailsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadCourse(id);
      }
    });

  }

  loadCourse(id: string): void {
    this.isLoading.set(true);
    this.courseService.getCourseById(id).subscribe({
      next: (res: ApiResponse<CourseDetails>) => {
        if (res.success) {
          this.course.set(res.value);
        } else {
          this.error.set(res.error || 'حدث خطأ في تحميل الكورس');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('فشل في تحميل بيانات الكورس');
        this.isLoading.set(false);
      }
    });
  }

  enrollCourse(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'تم بنجاح',
      detail: 'تم التسجيل في الكورس بنجاح'
    });
  }

  addToWishlist(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'تمت الإضافة',
      detail: 'تمت إضافة الكورس للمفضلة'
    });
  }

  shareCourse(): void {
    navigator.clipboard.writeText(window.location.href);
    this.messageService.add({
      severity: 'success',
      summary: 'تم النسخ',
      detail: 'تم نسخ رابط الكورس'
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}


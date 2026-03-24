import { HomeServiceService } from './../../services/home-service.service';
import { Component, computed, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubjectData } from '../../interfaces/home';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-teachers-by-subject',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teachers-by-subject.component.html',
  styleUrl: './teachers-by-subject.component.css'
})
export class TeachersBySubjectComponent implements OnInit {

  /* ── Signals ── */
  data         = signal<SubjectData | null>(null);
  isLoading    = signal(false);
  errorMessage = signal<string | null>(null);
  activeFilter = signal('all');

  /* ── Filter Options ── */
  filters = [
  { label: 'الكل',   value: 'all',       icon: 'pi pi-th-large'    },
  { label: 'مجاني',  value: 'free',      icon: 'pi pi-gift'        },
  { label: 'مدفوع',  value: 'paid',      icon: 'pi pi-tag'         },
];

  /* ── Computed: Filtered Courses ── */
  filteredCourses = computed(() => {
    const courses = this.data()?.courses ?? [];
    switch (this.activeFilter()) {
      case 'free':       return courses.filter(c => c.price === 0);
      case 'paid':       return courses.filter(c => c.price > 0);
      case 'published':  return courses.filter(c => c.isPublished);
      case 'draft':      return courses.filter(c => !c.isPublished);
      default:           return courses;
    }
  });

  constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private _homeServiceService:   HomeServiceService,
  ) {}

  ngOnInit(): void {
    // ممكن تاخد الـ subject من query params أو route params
    const subject = this.route.snapshot.paramMap.get('params');
      if (subject) this.fetchData(subject);

  }

  /* ── Fetch Data ── */
  fetchData(subject: string): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    this._homeServiceService.getCoursesAndTeachersBySubject(subject).subscribe({
        next: (res) => {
          if (res.success) {
            this.data.set(res.value);
          } else {
            this.errorMessage.set('فشل تحميل البيانات');
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(
            err?.error?.message ?? 'حدث خطأ في الاتصال بالسيرفر'
          );
          this.isLoading.set(false);
        }
      });
  }

  /* ── Set Filter ── */
  setFilter(value: string): void {
    this.activeFilter.set(value);
  }


  /* ── Helpers ── */
  getInitials(name: string): string {
    return name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? '?';
  }

  truncate(str: string, max: number): string {
    return str?.length > max ? str.slice(0, max) + '...' : str;
  }

  getLevelClass(level: string): string {
    const map: Record<string, string> = {
      'مبتدئ':  'level-beginner',
      'متوسط':  'level-intermediate',
      'متقدم':  'level-advanced',
    };
    return map[level] ?? 'level-intermediate';
  }

  formatPrice(price: number): string {
    return price === 0 ? 'مجاني' : `${price} ج`;
  }

  formatRating(rating: number): string {
    return rating > 0 ? rating.toFixed(1) : 'جديد';
  }


  getTotalStudents(): number {
  return this.data()?.courses.reduce(
    (acc, c) => acc + (c.enrollments?.length ?? 0), 0
  ) ?? 0;
}

}

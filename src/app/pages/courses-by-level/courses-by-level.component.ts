import { HomeServiceService } from './../../services/home-service.service';
import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';

/* ── Interfaces ── */
interface Enrollment {
  id: string;
  studentId: string;
  isPaid: boolean;
  amountPaid: number;
  enrollDate: string;
  expiryDate: string;
  durationInDays: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
  techerName: string;
  price: number;
  durationHours: number;
  isPublished: boolean;
  academicYearTarget: string;
  level: string;
  subject: string;
  enrollments: Enrollment[];
}

export interface ApiValue {
  courses: Course[];
  academicYear: string;
  selectedAcademic: string | null;
  allSubjects: string[];
  currentPage: number;
  totalPages: number;
  totalCourses: number;
  pageSize: number;
}

@Component({
  selector: 'app-courses-by-level',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses-by-level.component.html',
  styleUrls: ['./courses-by-level.component.css']
})
export class CoursesByLevelComponent implements OnInit {
  
  /* ── Signals ── */
  data          = signal<ApiValue | null>(null);
  isLoading     = signal(false);
  errorMessage  = signal<string | null>(null);
  currentPage   = signal(1);
  activeSubject = signal<string>('all');
  activeLevel   = signal<string>('all');

  /* ── Params from route ── */
  academicYear = signal<string>('');

  /* ── Level Tabs Config ── */
  levelTabs = [
    { label: 'الابتدائي',  value: 'الابتدائي',  icon: 'pi pi-star',           color: '#f59e0b' },
    { label: 'الإعدادي',  value: 'الإعدادي',  icon: 'pi pi-book',           color: '#6366f1' },
    { label: 'الثانوي',   value: 'الثانوي',   icon: 'pi pi-graduation-cap', color: '#10b981' },
  ];

  /* ── Price Filters ── */
  priceFilters = [
    { label: 'الكل',   value: 'all',  icon: 'pi pi-th-large' },
    { label: 'مجاني',  value: 'free', icon: 'pi pi-gift'     },
    { label: 'مدفوع',  value: 'paid', icon: 'pi pi-tag'      },
  ];
  activePriceFilter = signal<string>('all');

  /* ── Computed: filtered courses ── */
  filteredCourses = computed(() => {
    let courses = this.data()?.courses ?? [];

    // filter by subject
    if (this.activeSubject() !== 'all') {
      courses = courses.filter(c => c.academicYearTarget === this.activeSubject());
    }

    // filter by level
    if (this.activeLevel() !== 'all') {
      courses = courses.filter(c => c.level === this.activeLevel());
    }

    // filter by price
    if (this.activePriceFilter() === 'free') {
      courses = courses.filter(c => c.price === 0);
    } else if (this.activePriceFilter() === 'paid') {
      courses = courses.filter(c => c.price > 0);
    }

    return courses;
  });

  constructor(
    private route:  ActivatedRoute,
    private router: Router,
    private http:   HttpClient,
    private _homeServiceService: HomeServiceService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const year = params['academicYear'] ?? 'الإعدادي';
      this.academicYear.set(year);
      this.currentPage.set(1);
      this.fetchCourses(year, 1);
    });
  }


  /* ── Fetch ── */
  fetchCourses(academicYear: string, page: number): void {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const params = new HttpParams()
      .set('academicYear', academicYear)
      .set('page', page.toString())
      .set('pageSize', '8');

this._homeServiceService.CoursesByAcademicYear(params).subscribe({
      next: (res) => {
        if (res.success) {
          this.data.set(res.value);
          this.activeSubject.set('all');
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

  /* ── Change Level ── */
  changeLevel(level: string): void {
    this.academicYear.set(level);
    this.currentPage.set(1);
    this.activeSubject.set('all');
    this.activePriceFilter.set('all');

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { academicYear: level },
      queryParamsHandling: 'merge'
    });

    this.fetchCourses(level, 1);
  }

  /* ── Pagination ── */
  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.fetchCourses(this.academicYear(), page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  totalPages(): number {
    return this.data()?.totalPages ?? 1;
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  /* ── Subject Filter ── */
  setSubject(subject: string): void {
    this.activeSubject.set(subject);
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
      'مبتدئ': 'level-beginner',
      'متوسط': 'level-intermediate',
      'متقدم': 'level-advanced',
    };
    return map[level] ?? 'level-intermediate';
  }

  formatPrice(price: number): string {
    return price === 0 ? 'مجاني' : `${price} ج`;
  }

  getLevelTabColor(): string {
    const tab = this.levelTabs.find(t => t.value === this.academicYear());
    return tab?.color ?? '#6366f1';
  }

  getEnrollmentsCount(): number {
    return this.data()?.courses.reduce(
      (acc, c) => acc + (c.enrollments?.length ?? 0), 0
    ) ?? 0;
  }
}

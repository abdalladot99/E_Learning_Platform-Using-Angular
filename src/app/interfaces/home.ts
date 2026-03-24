// interfaces/home.interface.ts

export interface Enrollment {
  id: string;
  studentId: string;
  student: any;
  courseId: string;
  course: any;
  isPaid: boolean;
  amountPaid: number;
  enrollDate: string;
  expiryDate: string;
  durationInDays: number;
  paymentId: string | null;
  payment: any;
}

export interface SubjectData {
  subject:   string;
  teachers:  Teacher[];
  courses:   Course[];
}


export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
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

export interface Teacher {
  teacherId: string;
  fullName: string;
  profilePictureUrl: string | null;
  subject: string;
  bio: string;
  averageRating: number;
  studentsCount: number;
  coursesCount: number;
}

export interface HomeData {
  popularCourses: Course[];
  recentCourses: Course[];
  topTeachers: Teacher[];
  subjects: string[];
  academicYears: string[];
  totalCourses: number;
  totalUsers: number;
  totalTeachers: number;
}

export interface ApiResponse<T> {
  success: boolean;
  value: T;
  error: string | null;
}

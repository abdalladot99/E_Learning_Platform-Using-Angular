export interface CourseDetails {
  course_id: string;
  teacher_id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: string;
  techerName: string;
  price: number;
  durationHours: number;
  academicYearTarget: string;
  level: string;
  subject: string;
  videosCount: number;
  quizeCount_fromAllVideos: number;
  examsCount: number;
  filesCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  value: T;
  error: string | null;
}

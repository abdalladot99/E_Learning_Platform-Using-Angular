import { Course } from "./home";

export interface TeacherProfile {
  teacherId: string;
  teacherName: string;
  teacherEmail: string;
  teacherBio: string;
  imageProfile: string;
  subject: string;
  totalhour: number;
  averageRating: number;
  totalstudent: number;
  pagedResult: PagedResult;
}


export interface PagedResult {
  data: Course[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

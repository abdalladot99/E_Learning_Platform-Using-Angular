import { Injectable } from '@angular/core';
import { baseUrl } from '../rootUrl/base-url/base-url.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/home';
import { TeacherProfile } from '../interfaces/teacher-detalis';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private baseUrl =  baseUrl;

  constructor(private http: HttpClient) {}

  /**
   * جلب بيانات مدرس معين بالـ ID
   */
  getTeacherById(id: string, page: number = 1, pageSize: number = 6): Observable<ApiResponse<TeacherProfile>> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<TeacherProfile>>(
      `${this.baseUrl}CourseSearch/teacher/${id}`,
      { params }
    );
  }

  /**
   * جلب كل المدرسين
   */
  getAllTeachers(page: number = 1, pageSize: number = 10): Observable<ApiResponse<any>> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<any>>(
      `${this.baseUrl}/teachers`,
      { params }
    );
  }

  /**
   * البحث عن مدرسين
   */
  searchTeachers(query: string, subject?: string): Observable<ApiResponse<any>> {
    let params = new HttpParams().set('search', query);

    if (subject) {
      params = params.set('subject', subject);
    }

    return this.http.get<ApiResponse<any>>(
      `${this.baseUrl}/teachers/search`,
      { params }
    );
  }

  /**
   * جلب كورسات مدرس معين
   */
  getTeacherCourses(teacherId: string, page: number = 1, pageSize: number = 6): Observable<ApiResponse<any>> {
    const params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<ApiResponse<any>>(
      `${this.baseUrl}/teachers/${teacherId}/courses`,
      { params }
    );
  }

  /**
   * جلب أفضل المدرسين
   */
  getTopTeachers(limit: number = 5): Observable<ApiResponse<any>> {
    const params = new HttpParams().set('limit', limit.toString());

    return this.http.get<ApiResponse<any>>(
      `${this.baseUrl}/teachers/top`,
      { params }
    );
  }
}

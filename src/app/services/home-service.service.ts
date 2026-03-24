import { Injectable } from '@angular/core';
import { baseUrl } from '../rootUrl/base-url/base-url.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, HomeData, SubjectData } from '../interfaces/home';
import { ApiValue } from '../pages/courses-by-level/courses-by-level.component';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  getHomeData() {
    throw new Error('Method not implemented.');
  }

  private api = baseUrl;

  constructor(private http: HttpClient) {}

  getCourses(){
    return this.http.get<ApiResponse<HomeData>>(this.api+'Home/HomePage');
  }

  getCoursesAndTeachersBySubject(sub:string): Observable<ApiResponse<SubjectData>> {
    return this.http.get<ApiResponse<SubjectData>>(`${this.api}Home/TeachersBySubject/${sub}`);
  }

  CoursesByAcademicYear(params: HttpParams): Observable<ApiResponse<ApiValue>> {
    return this.http.get<ApiResponse<ApiValue>>(`${this.api}Home/CoursesByAcademicYear`, { params});
  }


  getCourse(id:number){
    return this.http.get(`${this.api}/${id}`);
  }

}

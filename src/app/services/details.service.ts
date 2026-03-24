import { baseUrl } from './../rootUrl/base-url/base-url.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../interfaces/home';
import { Observable } from 'rxjs';
import { CourseDetails } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private baseUrl = baseUrl;

  constructor(private http :HttpClient) { }

  getCourseById(id: string): Observable<ApiResponse<CourseDetails>> {
    return this.http.get<ApiResponse<CourseDetails>>(`${this.baseUrl}CourseSearch/${id}`);
  }
}

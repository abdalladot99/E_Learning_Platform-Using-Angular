import { Injectable } from '@angular/core';
import { baseUrl } from '../rootUrl/base-url/base-url.component';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, HomeData } from '../interfaces/home';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  private api = baseUrl+'Home/HomePage';

  constructor(private http: HttpClient) {}

  getCourses(){
  return this.http.get<ApiResponse<HomeData>>(this.api);
}

  getCourse(id:number){
    return this.http.get(`${this.api}/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

import { Category } from './category';

@Injectable()
export class CategoryService {
  private url = environment.apiUrl + 'api/categories';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(this.url + '/' + id);
  }
}

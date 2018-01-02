import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Category } from './category';
import { environment } from '../environments/environment';


@Injectable()
export class CategoryService {

  private url = environment.apiUrl + 'api/categories';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get(this.url)
      .map(response => response as Category[]);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get(this.url + '/' + id)
      .map(response => response as Category);
  }

}

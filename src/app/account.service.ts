import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';

import { Account } from './account';
import { environment } from '../environments/environment';


@Injectable()
export class AccountService {

  private url = environment.apiUrl + 'api/accounts';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get(this.url)
      .map(response => response as Account[]);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get(this.url + '/' + id)
      .map(response => response as Account);
  }

}

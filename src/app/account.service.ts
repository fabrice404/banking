import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

import { Account } from './account';

@Injectable()
export class AccountService {
  private url = environment.apiUrl + 'api/accounts';

  constructor(
    private http: HttpClient
  ) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.url}`);
  }

  getAccount(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.url}/${id}`);
  }
}

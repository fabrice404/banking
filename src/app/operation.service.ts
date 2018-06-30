import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../environments/environment';

import { Operation } from './operation';

@Injectable()
export class OperationService {
  private url = environment.apiUrl + 'api/operations';

  constructor(
    private http: HttpClient
  ) { }

  getOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.url}`);
  }

  getDownloadedOperations(): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.url}/?t=d`);
  }

  getOperation(id: number): Observable<Operation> {
    return this.http.get<Operation>(`${this.url}/${id}`);
  }

  getOpeartionsForAccountAndMonth(accountId: number, month: number, year: number): Observable<Operation[]> {
    return this.http.get<Operation[]>(`${this.url}/?t=am&a=${accountId}&m=${month}&y=${year}`);
  }

  check(id: number): Observable<Operation> {
    return this.http.patch<Operation>(`${this.url}/${id}`, { checked: true });
  }

  uncheck(id: number): Observable<Operation> {
    return this.http.patch<Operation>(`${this.url}/${id}`, { checked: false });
  }

  link(did: number, id: number): Observable<Operation> {
    return this.http.patch<Operation>(`${this.url}/${id}`, { did: did });
  }

  create(operation: Operation): Observable<Operation> {
    return this.http.post<Operation>(`${this.url}`, {
      name: operation.name,
      accountId: operation.accountId,
      categoryId: operation.categoryId,
      amount: operation.amount,
      date: operation.date
    });
  }

  update(operation: Operation): Observable<Operation> {
    return this.http.put<Operation>(`${this.url}/${operation.id}`, {
      name: operation.name,
      accountId: operation.accountId,
      categoryId: operation.categoryId,
      amount: operation.amount,
      date: operation.date
    });
  }
}

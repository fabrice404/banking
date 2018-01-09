import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';

@Injectable()
export class StatisticsService {
  private url = environment.apiUrl + 'api/statistics';

  constructor(
    private http: HttpClient
  ) { }

  getAccountDayBalance(accountId: number, month: number, year: number): Observable<any> {
    return this.http.get<any>(`${this.url}/account/dayBalance?a=${accountId}&y=${year}&m=${month}`)
  }

  getOperationsDailyBalance(accountId: number, month: number, year: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}/operations/dailyBalance?a=${accountId}&y=${year}&m=${month}`)
  }
}

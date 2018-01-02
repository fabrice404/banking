import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Rx';
import { catchError, map, tap } from 'rxjs/operators';

import { AccountService } from './account.service';
import { CategoryService } from './category.service';

import { Account } from './account';
import { Category } from './category';
import { Operation } from './operation';
import { environment } from '../environments/environment';


@Injectable()
export class OperationService {

  private url = environment.apiUrl + 'api/operations';

  constructor(private http: HttpClient, private accountService: AccountService, private categoryService: CategoryService) { }

  getOperations(): Observable<Operation[]> {
    return this.http.get(this.url)
      .map(response => response as Operation[])
      .flatMap((operations: Operation[]) => {
        return Observable
          .forkJoin(operations.map((operation: Operation) => {
            return this.accountService.getAccount(operation.account_id)
              .map((account: Account) => {
                operation.account = account[0];
                return operation;
              })
          }));
      })
      .flatMap((operations: Operation[]) => {
        return Observable
          .forkJoin(operations.map((operation: Operation) => {
            return this.categoryService.getCategory(operation.category_id)
              .map((category: Category) => {
                operation.category = category[0];
                return operation;
              })
          }));
      });
  }

  getOperation(id: number): Observable<Operation> {
    const url = '${this.url}/$id';
    return this.http
      .get<Operation>(url)
      .pipe(
      tap(console.log),
      catchError((error: any) => {
        return Observable.throw(error);
      })
      );
  }

}

import { Component, OnInit } from '@angular/core';

import { Account } from '../account';
import { Operation } from '../operation';

import { AccountService } from '../account.service';
import { CategoryService } from '../category.service';
import { OperationService } from '../operation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  accounts: Account[];
  operations: Operation[];
  downloadedOperations: Operation[];
  now: string;

  constructor(
    private accountService: AccountService,
    private categoryService: CategoryService,
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.getOperations();
    const now = new Date();
    this.now = now.getFullYear().toString()
      + (now.getMonth() + 1).toString().padStart(2, '0')
      + now.getDate().toString().padStart(2, '0');
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
    this.categoryService.getCategories()
      .subscribe(categories => { })
  }

  getOperations(): void {
    this.operationService.getOperations()
      .subscribe(operations => this.operations = operations);
    this.operationService.getDownloadedOperations()
      .subscribe(operations => this.downloadedOperations = operations);
  }

  checkOperation(id: number): void {
    this.operationService.check(id)
      .subscribe(result => {
        this.getAccounts();
        this.getOperations();
      });
  }

  linkOperation(did: number, id: number): void {
    this.operationService.link(did, id)
      .subscribe(result => {
        this.checkOperation(id);
      });
  }
}

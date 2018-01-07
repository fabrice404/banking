import { Component, OnInit } from '@angular/core';
import { Account } from '../account';
import { AccountService } from '../account.service';
import { Operation } from '../operation';
import { OperationService } from '../operation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  accounts: Account[];
  operations: Operation[];
  now: string;

  constructor(
    private accountService: AccountService,
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.getAccounts();
    this.getOperations();
    let now = new Date();
    this.now = now.getFullYear().toString()
      + (now.getMonth() + 1).toString().padStart(2, '0')
      + now.getDate().toString().padStart(2, '0');
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  getOperations(): void {
    this.operationService.getOperations()
      .subscribe(operations => this.operations = operations);
  }

  checkOperation(id: number): void {
    this.operationService.check(id)
      .subscribe(result => {
        this.getAccounts();
        this.getOperations();
      });
  }
}

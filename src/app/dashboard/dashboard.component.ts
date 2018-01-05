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

  constructor(private accountService: AccountService, private operationService: OperationService) { }

  ngOnInit() {
    this.getAccounts();
    this.getOperations();
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  getOperations(): void {
    this.operationService.getOperations()
      .subscribe(operations => this.operations = operations);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AccountService } from '../account.service';
import { CategoryService } from '../category.service';
import { OperationService } from '../operation.service';

import { Account } from '../account';
import { Category } from '../category';
import { Operation } from '../operation';

@Component({
  selector: 'app-operation',
  templateUrl: './operation.component.html'
})
export class OperationComponent implements OnInit {
  @Input() operation: Operation;
  accounts: Account[];
  categories: Category[];
  errors: object;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private categoryService: CategoryService,
    private operationService: OperationService
  ) { }

  ngOnInit() {
    this.initErrors();
    this.getAccounts();
    this.getCategories();
    this.getOperation();
  }

  getOperation(): void {
    if (this.route.snapshot.paramMap.get('id') == null) {
      this.operation = new Operation();
      if (this.route.snapshot.queryParamMap.get('account') != null) {
        this.operation.accountId = parseFloat(this.route.snapshot.queryParamMap.get('account'));
      }
      if (this.route.snapshot.queryParamMap.get('amount') != null) {
        this.operation.amount = parseFloat(this.route.snapshot.queryParamMap.get('amount'));
      }
      if (this.route.snapshot.queryParamMap.get('date') != null) {
        const tmp = this.route.snapshot.queryParamMap.get('date').split('/');
        this.operation.date = `${tmp[2]}-${tmp[1]}-${tmp[0]}`;
      }
      if (this.route.snapshot.queryParamMap.get('name') != null) {
        this.operation.name = this.route.snapshot.queryParamMap.get('name');
      }
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.operationService.getOperation(parseInt(id, 10))
        .subscribe(operation => {
          operation.date = operation.date.substring(0, 10);
          this.operation = operation;
        });
    }
  }

  getAccounts(): void {
    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  initErrors(): void {
    this.errors = {
      accountId: false,
      categoryId: false,
      amount: false,
      date: false,
      name: false
    };
  }

  save(): void {
    this.initErrors();
    if (this.operation.id == null) {
      this.operationService.create(this.operation)
        .subscribe(() => {
          this.router.navigate(['dashboard']);
        }, error => {
          error.error.map(err => this.errors[err.path] = true);
        });
    } else {
      this.operationService.update(this.operation)
        .subscribe(() => this.router.navigate(['dashboard']));
    }
  }

  cancel(): void {
    this.initErrors();
    this.operationService.uncheck(this.operation.id)
      .subscribe(operation => this.operation = operation);
  }
}

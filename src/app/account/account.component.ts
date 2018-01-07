import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { AccountService } from '../account.service';
import { OperationService } from '../operation.service';

import { Account } from '../account';
import { Operation } from '../operation';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  @Input() account: Account;
  operations: Operation[];
  now: string;
  dates: object[];
  currentMonth: string;
  monthNames: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private operationService: OperationService
  ) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.init()
      }
    })
  }
  ngOnInit() { }

  init(): void {
    let now = new Date();
    this.now = now.getFullYear().toString()
      + (now.getMonth() + 1).toString().padStart(2, '0')
      + now.getDate().toString().padStart(2, '0');

    // dates
    this.monthNames = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.dates = [];

    let year = null;
    for (let i = 2015; i <= now.getFullYear(); i++) {
      if (year != null) {
        this.dates.push(year);
      }
      year = { year: i, months: [] };
      for (let j = 1; j <= 12; j++) {
        if (i < now.getFullYear() || (i == now.getFullYear() && j <= now.getMonth() + 1)) {
          year.months.push({
            month: j,
            name: this.monthNames[j],
            year: i
          });
        }
      }
    }
    this.dates.push(year);

    this.getAccount();
    this.getOperations();
  }

  getAccount(): void {
    this.accountService.getAccount(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(account => this.account = account)
  }

  getOperations(): void {
    let now = new Date();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    if (this.route.snapshot.paramMap.get('month') != null) {
      month = parseInt(this.route.snapshot.paramMap.get('month'));
    }
    if (this.route.snapshot.paramMap.get('year') != null) {
      year = parseInt(this.route.snapshot.paramMap.get('year'));
    }
    this.currentMonth = `${this.monthNames[month]} ${year}`;
    this.operationService.getOpeartionsForAccountAndMonth(parseInt(this.route.snapshot.paramMap.get('id')), month, year)
      .subscribe(operations => this.operations = operations)
  }
}

import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Chart } from 'angular-highcharts';

import { AccountService } from '../account.service';
import { OperationService } from '../operation.service';
import { StatisticsService } from '../statistics.service';

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
  chart: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private accountService: AccountService,
    private operationService: OperationService,
    private statisticsService: StatisticsService
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
    let accountId = parseInt(this.route.snapshot.paramMap.get('id'));
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
    this.operationService.getOpeartionsForAccountAndMonth(accountId, month, year)
      .subscribe(operations => this.operations = operations)

    this.statisticsService.getAccountDayBalance(accountId, month, year)
      .subscribe(balance => {
        this.statisticsService.getOperationsDailyBalance(accountId, month, year)
          .subscribe(days => {
            balance = parseFloat(balance.balance);

            let data = [];
            let min = 999999;
            days.forEach(day => {
              balance = (Math.floor(balance * 100) + Math.floor(day.balance * 100)) / 100;
              data.push([Date.parse(day.date), balance]);
              if (balance < min) {
                min = balance;
              }
            });
            
            this.chart = new Chart({
              chart: { type: 'spline' },
              title: { text: '' },
              xAxis: {
                type: 'datetime',
              },
              plotOptions: {
                spline: {
                  marker: { enabled: true }
                },
                series: {
                  zones: [{
                    value: 0,
                    color: 'red'
                  }, {
                    value: 500,
                    color: 'orange'
                  }, {
                    color: 'green'
                  }]
                }
              },
              series: [{
                name: this.account.name,
                data: data
              }]
            });
          })
      })

  }
}

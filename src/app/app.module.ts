import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptor } from './auth.interceptor';

import { AccountService } from './account.service';
import { CategoryService } from './category.service';
import { OperationService } from './operation.service';
import { StatisticsService } from './statistics.service';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { OperationComponent } from './operation/operation.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    DashboardComponent,
    MenuComponent,
    OperationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    ChartModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    AccountService,
    CategoryService,
    OperationService,
    StatisticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

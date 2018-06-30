import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OperationComponent } from './operation/operation.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'account/:id', component: AccountComponent },
  { path: 'account/:id/:year/:month', component: AccountComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'operation', component: OperationComponent },
  { path: 'operation/:id', component: OperationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

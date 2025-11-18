import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component';
import { authGuard } from '../../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            '../../../shared/components/dashboard/dashboard-component'
          ).then((m) => m.DashboardComponent),
      },
      {
        path: 'users',
        loadComponent: () =>
          import(
            '../../../features/pages/user-management/user-list/user-list-component'
          ).then((m) => m.UserListComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

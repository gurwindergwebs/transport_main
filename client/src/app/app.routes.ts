import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { SettingsComponent } from './settings/settings.component';
import { PagesComponent } from './pages/pages.component';
import { authGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found-component';

export const routes: Routes = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'products', component: ProductsComponent },
  // { path: 'settings', component: SettingsComponent },
  // { path: 'pages', component: PagesComponent },


  {
    path: '',
    loadChildren: () =>
      import('./shared/dashboard/dashboard-routing-module').then(
        (c) => c.DashboardRoutingModule
      ),
  },

  // login
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login-component').then(
        (c) => c.LoginComponent
      ),
  },

  // not found
  { path: 'notfound', component: NotFoundComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/notfound' },
];

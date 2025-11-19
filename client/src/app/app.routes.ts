import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./shared/layouts/dashboard/dashboard-routing-module').then(
                (c) => c.DashboardRoutingModule
            ),
    },

    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/login-component/login-component').then(
                (c) => c.LoginComponent
            ),
    },
];

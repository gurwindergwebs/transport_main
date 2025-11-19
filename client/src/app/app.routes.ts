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
        path: '**',
        redirectTo: ''
    }
];

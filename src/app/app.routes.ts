import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.routes';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/dashboard' },
	{ path: 'dashboard', loadChildren: () => DASHBOARD_ROUTES },
];

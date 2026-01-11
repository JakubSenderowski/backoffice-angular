import { Routes } from '@angular/router';
import { DASHBOARD_ROUTES } from './features/dashboard/dashboard.routes';
import { MERCHANT_ROUTES } from './features/merchants/merchants.routes';
import { MONITORING_ROUTES } from './features/monitoring/monitoring.routes';
import { REPORTS_ROUTES } from './features/reports/reports.routes';
import { SETTLEMENTS_ROUTES } from './features/settlement/settlement.routes';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { authGuard } from './core/guards/auth.guard';
export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: '/dashboard' },
	{ path: 'dashboard', loadChildren: () => DASHBOARD_ROUTES, canActivate: [authGuard] },
	{ path: 'merchants', loadChildren: () => MERCHANT_ROUTES, canActivate: [authGuard] },
	{ path: 'monitoring', loadChildren: () => MONITORING_ROUTES, canActivate: [authGuard] },
	{ path: 'reports', loadChildren: () => REPORTS_ROUTES, canActivate: [authGuard] },
	{ path: 'settlement', loadChildren: () => SETTLEMENTS_ROUTES, canActivate: [authGuard] },
	{ path: 'auth', loadChildren: () => AUTH_ROUTES },
];

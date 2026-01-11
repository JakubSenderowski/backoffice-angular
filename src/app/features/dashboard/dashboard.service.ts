import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DashboardStats {
	kpiCards: {
		totalMerchants: number;
		activeTransactions: number;
		totalRevenue: number;
		successRate: number;
	};
	revenueChart: { date: string; amount: number }[];
	paymentMethods: { name: string; value: number }[];
	topMerchants: { name: string; volume: number }[];
}

@Injectable({
	providedIn: 'root',
})
export class DashboardService {
	constructor(private http: HttpClient) {}

	getStats(): Observable<DashboardStats> {
		return this.http.get<DashboardStats>('/assets/mock-data/dashboard-stats.json');
	}
}

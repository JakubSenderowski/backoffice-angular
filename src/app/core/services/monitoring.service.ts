import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonitoringAlert } from '../models/monitoring.interface';

@Injectable({
	providedIn: 'root',
})
export class MonitoringService {
	constructor(private http: HttpClient) {}

	getAlerts(): Observable<MonitoringAlert[]> {
		return this.http.get<MonitoringAlert[]>('/assets/mock-data/monitoring.json');
	}
}

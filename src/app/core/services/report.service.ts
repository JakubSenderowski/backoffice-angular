import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../models/report.interface';

@Injectable({
	providedIn: 'root',
})
export class ReportService {
	constructor(private http: HttpClient) {}

	getReports(): Observable<Report[]> {
		return this.http.get<Report[]>('/assets/mock-data/reports.json');
	}
}

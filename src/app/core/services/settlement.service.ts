import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Settlement } from '../models/settlement.interface';

@Injectable({
	providedIn: 'root',
})
export class SettlementService {
	constructor(private http: HttpClient) {}

	getSettlements(): Observable<Settlement[]> {
		return this.http.get<Settlement[]>('/assets/mock-data/settlements.json');
	}
}

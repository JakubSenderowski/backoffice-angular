import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Merchant } from '../models/merchant.interface';

@Injectable({
	providedIn: 'root',
})
export class MerchantService {
	constructor(private http: HttpClient) {}

	getMerchants(): Observable<Merchant[]> {
		return this.http.get<Merchant[]>('/assets/mock-data/merchants.json');
	}
}

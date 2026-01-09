import { Component } from '@angular/core';

@Component({
	selector: 'app-merchants',
	imports: [],
	templateUrl: './merchants.component.html',
	styleUrl: './merchants.component.scss',
})
export class MerchantsComponent {}

export interface Merchant {
	id: string;
	createdAt: Date;
	transactionLimit: number;
	paymentMethods: string[];
	companyName: string;
	status: 'active' | 'inactive' | 'blocked';
	nip: string;
	companyLocation: string;
	address: string;
	email: string;
	companyType: string;
}

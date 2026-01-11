import { Component } from '@angular/core';
import { MerchantService } from '../../core/services/merchant.service';
import { Merchant } from '../../core/models/merchant.interface';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
	selector: 'app-merchants',
	imports: [CommonModule, NzTableModule, NzTagModule, NzPaginationModule, NzInputModule, FormsModule, NzIconModule],
	templateUrl: './merchants.component.html',
	styleUrl: './merchants.component.scss',
})
export class MerchantsComponent implements OnInit {
	merchants: Merchant[] = [];
	searchValue: string = '';
	filteredMerchants: Merchant[] = [];
	constructor(private merchantService: MerchantService) {}

	ngOnInit(): void {
		this.merchantService.getMerchants().subscribe((data) => {
			this.merchants = data;
			this.filteredMerchants = data;
			console.log('Merchants loaded:', data);
		});
	}

	getStatusColor(status: string): string {
		switch (status) {
			case 'active':
				return 'green';
			case 'inactive':
				return 'orange';
			case 'blocked':
				return 'red';
			default:
				return 'default';
		}
	}

	sortByName = (a: Merchant, b: Merchant) => a.companyName.localeCompare(b.companyName);
	sortByLimit = (a: Merchant, b: Merchant) => a.transactionLimit - b.transactionLimit;
	sortByStatus = (a: Merchant, b: Merchant) => a.status.localeCompare(b.status);
	sortByLocation = (a: Merchant, b: Merchant) => a.companyLocation.localeCompare(b.companyLocation);

	onSearch(): void {
		const value = this.searchValue.toLocaleLowerCase();
		if (!value) {
			this.filteredMerchants = this.merchants;
			return;
		}
		this.filteredMerchants = this.merchants.filter((merchant) =>
			merchant.companyName.toLocaleLowerCase().includes(value),
		);
	}
}

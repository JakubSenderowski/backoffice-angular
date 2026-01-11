import { Component } from '@angular/core';
import { MerchantService } from '../../core/services/merchant.service';
import { Merchant } from '../../core/models/merchant.interface';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
@Component({
	selector: 'app-merchants',
	imports: [CommonModule, NzTableModule, NzTagModule],
	templateUrl: './merchants.component.html',
	styleUrl: './merchants.component.scss',
})
export class MerchantsComponent implements OnInit {
	merchants: Merchant[] = [];

	constructor(private merchantService: MerchantService) {}

	ngOnInit(): void {
		this.merchantService.getMerchants().subscribe((data) => (this.merchants = data));
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
}

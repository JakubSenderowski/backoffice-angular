import { Component } from '@angular/core';
import { MerchantService } from '../../core/services/merchant.service';
import { Merchant } from '../../core/models/merchant.interface';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
@Component({
	selector: 'app-merchants',
	imports: [CommonModule, NzTableModule],
	templateUrl: './merchants.component.html',
	styleUrl: './merchants.component.scss',
})
export class MerchantsComponent implements OnInit {
	merchants: Merchant[] = [];

	constructor(private merchantService: MerchantService) {}

	ngOnInit(): void {
		this.merchantService.getMerchants().subscribe((data) => (this.merchants = data));
	}
}

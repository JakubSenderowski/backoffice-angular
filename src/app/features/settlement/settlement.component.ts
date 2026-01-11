import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { SettlementService } from '../../core/services/settlement.service';
import { Settlement } from '../../core/models/settlement.interface';

@Component({
	selector: 'app-settlement',
	imports: [CommonModule, FormsModule, NzTableModule, NzInputModule, NzIconModule, NzTagModule],
	templateUrl: './settlement.component.html',
	styleUrl: './settlement.component.scss',
})
export class SettlementComponent implements OnInit {
	settlements: Settlement[] = [];
	filteredSettlements: Settlement[] = [];
	searchValue: string = '';

	sortByAmount = (a: Settlement, b: Settlement) => a.amount - b.amount;
	sortByMerchant = (a: Settlement, b: Settlement) => a.merchantName.localeCompare(b.merchantName);
	sortByStatus = (a: Settlement, b: Settlement) => a.status.localeCompare(b.status);
	sortByDate = (a: Settlement, b: Settlement) =>
		new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime();

	constructor(private settlementService: SettlementService) {}

	ngOnInit(): void {
		this.settlementService.getSettlements().subscribe((data) => {
			this.settlements = data;
			this.filteredSettlements = data;
		});
	}

	onSearch(): void {
		const value = this.searchValue.toLowerCase();

		if (!value) {
			this.filteredSettlements = this.settlements;
			return;
		}

		this.filteredSettlements = this.settlements.filter(
			(settlement) =>
				settlement.merchantName.toLowerCase().includes(value) || settlement.id.toLowerCase().includes(value),
		);
	}

	getStatusColor(status: string): string {
		switch (status) {
			case 'completed':
				return 'green';
			case 'pending':
				return 'orange';
			case 'failed':
				return 'red';
			default:
				return 'default';
		}
	}
}

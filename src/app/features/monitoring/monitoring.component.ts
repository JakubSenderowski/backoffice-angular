import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { MonitoringService } from '../../core/services/monitoring.service';
import { MonitoringAlert } from '../../core/models/monitoring.interface';

@Component({
	selector: 'app-monitoring',
	imports: [CommonModule, FormsModule, NzTableModule, NzInputModule, NzIconModule, NzTagModule, NzButtonModule],
	templateUrl: './monitoring.component.html',
	styleUrl: './monitoring.component.scss',
})
export class MonitoringComponent implements OnInit {
	alerts: MonitoringAlert[] = [];
	filteredAlerts: MonitoringAlert[] = [];
	searchValue: string = '';

	sortByMerchant = (a: MonitoringAlert, b: MonitoringAlert) => a.merchantName.localeCompare(b.merchantName);
	sortBySeverity = (a: MonitoringAlert, b: MonitoringAlert) =>
		this.getSeverityWeight(b.severity) - this.getSeverityWeight(a.severity);
	sortByAmount = (a: MonitoringAlert, b: MonitoringAlert) => a.amount - b.amount;
	sortByDate = (a: MonitoringAlert, b: MonitoringAlert) =>
		new Date(b.detectedAt).getTime() - new Date(a.detectedAt).getTime();

	constructor(private monitoringService: MonitoringService, private message: NzMessageService) {}

	ngOnInit(): void {
		this.monitoringService.getAlerts().subscribe((data) => {
			this.alerts = data;
			this.filteredAlerts = data;
		});
	}

	onSearch(): void {
		const value = this.searchValue.toLowerCase();

		if (!value) {
			this.filteredAlerts = this.alerts;
			return;
		}

		this.filteredAlerts = this.alerts.filter(
			(alert) =>
				alert.merchantName.toLowerCase().includes(value) ||
				alert.id.toLowerCase().includes(value) ||
				alert.reason.toLowerCase().includes(value),
		);
	}

	getSeverityWeight(severity: string): number {
		const weights: { [key: string]: number } = {
			critical: 4,
			high: 3,
			medium: 2,
			low: 1,
		};
		return weights[severity] || 0;
	}

	getSeverityColor(severity: string): string {
		const colors: { [key: string]: string } = {
			critical: 'red',
			high: 'orange',
			medium: 'gold',
			low: 'blue',
		};
		return colors[severity] || 'default';
	}

	getStatusColor(status: string): string {
		const colors: { [key: string]: string } = {
			under_review: 'blue',
			escalated: 'red',
			resolved: 'green',
			false_positive: 'default',
		};
		return colors[status] || 'default';
	}

	getTypeColor(type: string): string {
		return type === 'fraud' ? 'volcano' : 'purple';
	}

	reviewAlert(alert: MonitoringAlert): void {
		this.message.info(`Opening review panel for alert ${alert.id}`);
	}
}

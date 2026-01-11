import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ReportService } from '../../core/services/report.service';
import { Report } from '../../core/models/report.interface';

@Component({
	selector: 'app-reports',
	imports: [CommonModule, FormsModule, NzTableModule, NzInputModule, NzIconModule, NzTagModule, NzButtonModule],
	templateUrl: './reports.component.html',
	styleUrl: './reports.component.scss',
})
export class ReportsComponent implements OnInit {
	reports: Report[] = [];
	filteredReports: Report[] = [];
	searchValue: string = '';

	sortByName = (a: Report, b: Report) => a.name.localeCompare(b.name);
	sortByType = (a: Report, b: Report) => a.type.localeCompare(b.type);
	sortByStatus = (a: Report, b: Report) => a.status.localeCompare(b.status);
	sortByDate = (a: Report, b: Report) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();

	constructor(private reportService: ReportService, private message: NzMessageService) {}

	ngOnInit(): void {
		this.reportService.getReports().subscribe((data) => {
			this.reports = data;
			this.filteredReports = data;
		});
	}

	onSearch(): void {
		const value = this.searchValue.toLowerCase();

		if (!value) {
			this.filteredReports = this.reports;
			return;
		}

		this.filteredReports = this.reports.filter(
			(report) =>
				report.name.toLowerCase().includes(value) ||
				report.type.toLowerCase().includes(value) ||
				report.id.toLowerCase().includes(value),
		);
	}

	getStatusColor(status: string): string {
		switch (status) {
			case 'generated':
				return 'green';
			case 'processing':
				return 'blue';
			case 'failed':
				return 'red';
			default:
				return 'default';
		}
	}

	getTypeColor(type: string): string {
		const colors: { [key: string]: string } = {
			financial: 'green',
			transaction: 'blue',
			merchant: 'purple',
			fraud: 'red',
			settlement: 'orange',
		};
		return colors[type] || 'default';
	}

	downloadReport(report: Report): void {
		if (report.status === 'generated') {
			this.message.success(`Downloading ${report.name}...`);
		} else {
			this.message.warning('Report is not ready for download');
		}
	}
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { DashboardService, DashboardStats } from './dashboard.service';
import * as echarts from 'echarts';

@Component({
	selector: 'app-dashboard',
	imports: [CommonModule, NzCardModule, NzStatisticModule, NzGridModule],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
	stats: DashboardStats | null = null;

	constructor(private dashboardService: DashboardService) {}

	ngOnInit(): void {
		this.dashboardService.getStats().subscribe((data) => {
			this.stats = data;
			setTimeout(() => {
				this.initCharts();
			}, 100);
		});
	}

	initCharts(): void {
		if (!this.stats) return;

		this.initRevenueChart();
		this.initPaymentMethodsChart();
		this.initTopMerchantsChart();
	}

	initRevenueChart(): void {
		const chart = echarts.init(document.getElementById('revenueChart'));

		chart.setOption({
			tooltip: {
				trigger: 'axis',
				backgroundColor: 'rgba(255, 255, 255, 0.95)',
				borderColor: '#e5e5e7',
				textStyle: { color: '#1a1a1a' },
			},
			grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
			xAxis: {
				type: 'category',
				data: this.stats!.revenueChart.map((d) => d.date.slice(5)),
				axisLine: { lineStyle: { color: '#e5e5e7' } },
				axisLabel: { color: '#8e8e93' },
			},
			yAxis: {
				type: 'value',
				axisLine: { lineStyle: { color: '#e5e5e7' } },
				axisLabel: { color: '#8e8e93' },
			},
			series: [
				{
					data: this.stats!.revenueChart.map((d) => d.amount),
					type: 'line',
					smooth: true,
					lineStyle: { color: '#007aff', width: 3 },
					areaStyle: { color: 'rgba(0, 122, 255, 0.1)' },
					itemStyle: { color: '#007aff' },
				},
			],
		});
	}

	initPaymentMethodsChart(): void {
		const chart = echarts.init(document.getElementById('paymentMethodsChart'));

		chart.setOption({
			tooltip: { trigger: 'item' },
			series: [
				{
					type: 'pie',
					radius: ['40%', '70%'],
					avoidLabelOverlap: false,
					label: { show: true, formatter: '{b}: {d}%' },
					data: this.stats!.paymentMethods.map((item, index) => ({
						value: item.value,
						name: item.name,
						itemStyle: {
							color: ['#007aff', '#34c759', '#ff9500', '#ff3b30'][index],
						},
					})),
				},
			],
		});
	}

	initTopMerchantsChart(): void {
		const chart = echarts.init(document.getElementById('topMerchantsChart'));

		chart.setOption({
			tooltip: {
				trigger: 'axis',
				axisPointer: { type: 'shadow' },
			},
			grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
			xAxis: {
				type: 'value',
				axisLine: { lineStyle: { color: '#e5e5e7' } },
				axisLabel: { color: '#8e8e93' },
			},
			yAxis: {
				type: 'category',
				data: this.stats!.topMerchants.map((m) => m.name),
				axisLine: { lineStyle: { color: '#e5e5e7' } },
				axisLabel: { color: '#1a1a1a' },
			},
			series: [
				{
					type: 'bar',
					data: this.stats!.topMerchants.map((m) => m.volume),
					itemStyle: { color: '#007aff', borderRadius: [0, 4, 4, 0] },
					barMaxWidth: 30,
				},
			],
		});
	}
}

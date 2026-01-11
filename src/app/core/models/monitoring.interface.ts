export interface MonitoringAlert {
	id: string;
	type: 'fraud' | 'aml';
	severity: 'low' | 'medium' | 'high' | 'critical';
	merchantId: string;
	merchantName: string;
	transactionId: string;
	amount: number;
	reason: string;
	detectedAt: string;
	status: 'under_review' | 'escalated' | 'resolved' | 'false_positive';
	assignedTo: string;
}

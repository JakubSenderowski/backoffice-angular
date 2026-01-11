export interface Report {
	id: string;
	name: string;
	type: 'financial' | 'transaction' | 'merchant' | 'fraud' | 'settlement';
	dateRange: {
		start: string;
		end: string;
	};
	status: 'generated' | 'processing' | 'failed';
	createdAt: string;
	createdBy: string;
	fileSize: string | null;
}

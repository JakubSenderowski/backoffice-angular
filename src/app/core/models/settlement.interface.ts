export interface Settlement {
	id: string;
	merchantId: string;
	merchantName: string;
	amount: number;
	currency: string;
	status: 'pending' | 'completed' | 'failed';
	transactionDate: string;
	settlementDate: string | null;
	paymentMethod: string;
}

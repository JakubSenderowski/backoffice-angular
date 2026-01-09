export interface Merchant {
	id: string;
	createdAt: Date;
	transactionLimit: number;
	paymentMethods: string[];
	companyName: string;
	status: 'active' | 'inactive' | 'blocked';
	nip: string;
	companyLocation: string;
	address: string;
	email: string;
	companyType: string;
}

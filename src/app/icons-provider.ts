import { importProvidersFrom } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';

import {
	DashboardOutline,
	ShopOutline,
	TransactionOutline,
	FileTextOutline,
	EyeOutline,
	MenuFoldOutline,
	MenuUnfoldOutline,
	MailOutline,
	LockOutline,
} from '@ant-design/icons-angular/icons';

const icons: IconDefinition[] = [
	DashboardOutline,
	ShopOutline,
	TransactionOutline,
	FileTextOutline,
	EyeOutline,
	MenuFoldOutline,
	MenuUnfoldOutline,
	MailOutline,
	LockOutline,
];

export const provideNzIcons = () => importProvidersFrom(NzIconModule.forRoot(icons));

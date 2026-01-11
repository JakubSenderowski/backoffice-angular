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
	LogoutOutline,
	UserOutline,
	ArrowLeftOutline,
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
	LogoutOutline,
	UserOutline,
	ArrowLeftOutline,
];

export const provideNzIcons = () => importProvidersFrom(NzIconModule.forRoot(icons));

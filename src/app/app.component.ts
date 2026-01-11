import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthService } from './core/services/auth.service';

@Component({
	selector: 'app-root',
	imports: [CommonModule, RouterLink, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {
	isCollapsed = false;
	showLayout = true;

	constructor(private authService: AuthService, private router: Router) {
		this.router.events.subscribe(() => {
			this.showLayout = !this.router.url.includes('/auth');
		});
	}

	logout(): void {
		this.authService.logout();
		this.router.navigate(['/auth/login']);
	}
}

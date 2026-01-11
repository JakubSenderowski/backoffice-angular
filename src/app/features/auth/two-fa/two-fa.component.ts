import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'app-two-fa',
	imports: [FormsModule, NzFormModule, NzInputModule, NzButtonModule],
	templateUrl: './two-fa.component.html',
	styleUrl: './two-fa.component.scss',
})
export class TwoFaComponent {
	code = '';

	constructor(private router: Router, private authService: AuthService, private message: NzMessageService) {}

	onSubmit(): void {
		if (this.code === '111111') {
			const mockToken = 'mock_jwt_token_' + Date.now();
			this.authService.setToken(mockToken);

			this.message.success('Verification successful! Redirecting...', {
				nzDuration: 2000,
			});

			setTimeout(() => {
				this.router.navigate(['/dashboard']);
			}, 1000);
		} else {
			this.message.error('Invalid code! Please use: 111111');
		}
	}
}

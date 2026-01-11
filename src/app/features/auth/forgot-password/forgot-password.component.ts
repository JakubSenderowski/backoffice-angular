import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'app-forgot-password',
	imports: [ReactiveFormsModule, RouterLink, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
	forgotForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
	});

	constructor(private router: Router, private message: NzMessageService) {}

	onSubmit(): void {
		if (this.forgotForm.valid) {
			this.message.success(`Reset link sent to ${this.forgotForm.value.email}`, {
				nzDuration: 3000,
			});

			setTimeout(() => {
				this.router.navigate(['/auth/login']);
			}, 1500);
		}
	}
}

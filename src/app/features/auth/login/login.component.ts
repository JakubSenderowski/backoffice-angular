import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
	selector: 'app-login',
	imports: [ReactiveFormsModule, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent {
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.minLength(6)]),
	});

	constructor(private authService: AuthService, private router: Router) {}

	onSubmit(): void {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;

			this.authService.login(email!, password!).subscribe({
				next: (response) => {
					this.authService.setToken(response.token);
					this.router.navigate(['/dashboard']);
				},
				error: (err) => {
					console.error('Login failed:', err);
					alert('Invalid credentials');
				},
			});
		}
	}
}

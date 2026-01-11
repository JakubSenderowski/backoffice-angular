import { Component } from '@angular/core';
import {
	ReactiveFormsModule,
	FormGroup,
	FormControl,
	Validators,
	AbstractControl,
	ValidationErrors,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
	selector: 'app-register',
	imports: [ReactiveFormsModule, RouterLink, NzFormModule, NzInputModule, NzButtonModule, NzIconModule],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent {
	registerForm = new FormGroup(
		{
			firstName: new FormControl('', [Validators.required]),
			lastName: new FormControl('', [Validators.required]),
			email: new FormControl('', [Validators.required, Validators.email]),
			password: new FormControl('', [Validators.required, Validators.minLength(6)]),
			confirmPassword: new FormControl('', [Validators.required]),
		},
		{ validators: this.passwordMatchValidator },
	);

	constructor(private router: Router) {}

	passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
		const password = control.get('password');
		const confirmPassword = control.get('confirmPassword');

		if (!password || !confirmPassword) {
			return null;
		}

		return password.value === confirmPassword.value ? null : { passwordMismatch: true };
	}

	onSubmit(): void {
		if (this.registerForm.valid) {
			console.log('Registration data:', this.registerForm.value);

			this.router.navigate(['/auth/two-fa']);
		}
	}
}

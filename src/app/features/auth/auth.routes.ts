import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TwoFaComponent } from './two-fa/two-fa.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
export const AUTH_ROUTES: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'two-fa', component: TwoFaComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
];

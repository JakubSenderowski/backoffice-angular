import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	private readonly TOKEN_KEY = 'auth_token';

	setToken(token: string): void {
		localStorage.setItem(this.TOKEN_KEY, token);
	}

	getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	clearToken(): void {
		localStorage.removeItem(this.TOKEN_KEY);
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		return !!token;
	}

	login(email: string, password: string): Observable<{ token: string }> {
		return new Observable((observer) => {
			setTimeout(() => {
				if (email && password.length >= 6) {
					const mockToken = 'mock_jwt_token_' + Date.now();
					observer.next({ token: mockToken });
					observer.complete();
				} else {
					observer.error({ message: 'Invalid credentials' });
				}
			}, 1000);
		});
	}

	logout(): void {
		this.clearToken();
	}
}

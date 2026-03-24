import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError, throwError } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

import { LoginRequest, LoginResponse } from '../interfaces/auth';
import { baseUrl } from '../rootUrl/base-url/base-url.component';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private http       = inject(HttpClient);
  private router     = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly API = baseUrl;

  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY  = 'auth_user';

  // ── Signals (محميين من SSR) ──────────────────────────
  private _token = signal<string | null>(
    isPlatformBrowser(this.platformId)
      ? localStorage.getItem(this.TOKEN_KEY)
      : null
  );

  private _user = signal<LoginResponse['user'] | null>(
    isPlatformBrowser(this.platformId)
      ? this.getUserFromStorage()
      : null
  );

  // ── Computed ─────────────────────────────────────────
  isLoggedIn = computed(() => !!this._token());
  currentUser = computed(() => this._user());
  token = computed(() => this._token());

  // ── Public Methods ───────────────────────────────────

  login(credentials: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.API}Auth/login`, credentials)
      .pipe( tap((res) => this.handleSuccess(res, credentials.remember)), catchError((err) => this.handleError(err)));
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }

    this._token.set(null);
    this._user.set(null);

    this.router.navigate(['/login']);
  }

  // ── Private Methods ──────────────────────────────────

  private handleSuccess(res: LoginResponse, remember?: boolean): void {
    if (isPlatformBrowser(this.platformId)) {
      if (remember) {
        localStorage.setItem(this.TOKEN_KEY, res.value); 
      } else {
        sessionStorage.setItem(this.TOKEN_KEY, res.value);  
      } 
      if (res.user) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(res.user));
      }
    } 
    if (res.user) {
      this._user.set(res.user);
    }

    this._token.set(res.value);
  }

  private handleError(err: any) {
    const message =
      err.error?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى';

    return throwError(() => new Error(message));
  }

  private getUserFromStorage(): LoginResponse['user'] | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const raw = localStorage.getItem(this.USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}

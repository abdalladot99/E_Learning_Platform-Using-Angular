import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// PrimeNG
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ToastModule,
    AvatarModule,
  ],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private fb     = inject(FormBuilder);
  private auth   = inject(AuthService);
  private router = inject(Router);
  private toast  = inject(MessageService);

  // ── State ──────────────────────────────────────
  isLoading = signal(false);

  // ── Form ───────────────────────────────────────
  form: FormGroup = this.fb.group({
    email:    ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false],
  });

  // ── Getters ────────────────────────────────────
  get email()    { return this.form.get('email')!;    }
  get password() { return this.form.get('password')!; }

  // ── Submit ─────────────────────────────────────
  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const { email, password , remember } = this.form.value;

    this.auth.login({ email, password , remember }).subscribe({
      next: () => {
        this.toast.add({
          severity: 'success',
          summary: 'مرحباً!',
          detail: 'تم تسجيل الدخول بنجاح',
          life: 1000,
        });
          console.log(this.auth.isLoggedIn()); // لازم تبقى true هنا
        setTimeout(() => this.router.navigate(['/']), 1500);
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.toast.add({
          severity: 'error',
          summary: ' خطأ في تسجيل الدخول حاول مرة اخري',
          detail: err.error?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى',
          life: 4000,
        });
      },
    });
  }

  // ── Validation ─────────────────────────────────
  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field)!;
    return ctrl.invalid && (ctrl.dirty || ctrl.touched);
  }

  getError(field: string): string {
    const ctrl = this.form.get(field)!;
    if (!ctrl.errors) return '';

    const messages: Record<string, string> = {
      required:  'هذا الحقل مطلوب',
      email:     'البريد الإلكتروني غير صحيح',
      minlength: `الحد الأدنى ${ctrl.errors['minlength']?.requiredLength} أحرف`,
    };

    const firstKey = Object.keys(ctrl.errors)[0];
    return messages[firstKey] ?? 'قيمة غير صحيحة';
  }
}

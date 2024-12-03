import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;
  loading = false;
  showPassword = false;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private fun: FunctionsService
  ) {
    if (this.auth.is_login) {
      this.navigate();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required, 
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]],
      password: ['', [
        Validators.required, 
        Validators.minLength(6)
      ]]
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.login();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private login(): void {
    this.loading = true;

    this.api.post_('auth/users', this.form.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response: any) => {
          localStorage.setItem("maestros", JSON.stringify(response.maestro));
          this.auth.setLogin(response);
          this.navigate();
        },
        error: (error) => {
          console.error('Login error:', error);
          this.fun.presentAlertError('Error', error.error?.message || 'Login failed');
        }
      });
  }

  private navigate(): void {
    const user = this.auth.getUser();
    if (!user?.role) {
      this.router.navigateByUrl('/login');
      return;
    }

    const routes: { [key: string]: string } = {
      'ADMIN': '/dashboard',
      'STUDENT': '/component/inicioalumno',
      'TEACHER': '/component/maestro'
    };

    this.router.navigateByUrl(routes[user.role] || '/not-found');
  }
}
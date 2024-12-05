import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
      name: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/) // Solo letras y espacios
      ]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/), // Validación básica de correo
        Validators.pattern(/^[^<>!#$%^&*()=+{}[\]|\\:;"',<>?/]*$/) // Prohíbe caracteres especiales no deseados
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8), // Contraseña mínima de 8 caracteres
        Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) // Al menos un número y una letra
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

    this.register();
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  private register(): void {
    this.loading = true;

    this.api.post_('auth/register', this.form.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: (response: any) => {
          this.fun.presentAlert('Success', '¡Cuenta creada exitosamente!');
          this.auth.setLogin(response);
          this.navigate();
        },
        error: (error) => {
          console.error('Register error:', error);
          this.fun.presentAlertError('Error', error.error?.message || 'El registro falló.');
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
      'ADMIN': '/dashboard/admin',
      'USER': '/dashboard/user',
    };

    this.router.navigateByUrl(routes[user.role] || '/not-found');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}

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
  failedAttempts = 0;
  maxAttempts = 5; // Máximo de intentos permitidos

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
    if (this.failedAttempts >= this.maxAttempts) {
      this.fun.presentAlertError('Cuenta bloqueada', 'Has alcanzado el número máximo de intentos fallidos.');
      return;
    }

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
          this.failedAttempts = 0; // Reiniciar intentos fallidos tras un inicio exitoso
          this.navigate();
        },
        error: (error) => {
          console.error('Login error:', error);
          this.failedAttempts += 1;
          const remainingAttempts = this.maxAttempts - this.failedAttempts;
          const errorMessage = remainingAttempts > 0 
            ? `Error en el inicio de sesión. Intentos restantes: ${remainingAttempts}` 
            : 'Has alcanzado el número máximo de intentos.';

          this.fun.presentAlertError('Error', errorMessage);
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
      'ADMIN': '/encrypter',
    };

    this.router.navigateByUrl(routes[user.role] || '/not-found');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}

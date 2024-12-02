import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any;
  loading: boolean | undefined;

  constructor(
    public api: ApiService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private fun: FunctionsService
  ) {
    if (this.auth.is_login) {
      this.navigate();
    }
  }

  ngOnInit() {
    // Configurar el formulario con validaciones dinámicas
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]], // Campo único para credencial (matrícula, número de empleado o correo)
      password: ['', Validators.required], // Contraseña obligatoria
    });
  }

  submit() {
    if (this.form.dirty && this.form.valid) {
      this.login();
    } else {
      // Marcar todos los campos como tocados si no son válidos
      for (let i in this.form.controls) this.form.controls[i].markAsTouched();
    }
  }

  login() {
    this.loading = true;

    // Hacer la petición POST al endpoint de login
    this.api.post_('auth/users', this.form.value).subscribe({
      complete: () => {},
      error: (error) => {
        this.loading = false;
        console.error('Error in login:', error);
        this.fun.presentAlertError('Error', error.error.message);
      },
      next: (response) => {
        this.loading = false;
        console.log(response);
        localStorage.setItem("maestros", JSON.stringify((response as any).maestro));
        this.auth.setLogin(response); // Guardar los datos del usuario autenticado
        this.navigate();
      },
    });
  }

  navigate() {
    const user = this.auth.getUser(); // Obtener los datos del usuario desde el servicio AuthService

    if (user && user.role) {
      // Redirigir al dashboard correspondiente según el rol
      switch (user.role) {
        case 'ADMIN':
          this.router.navigateByUrl('/dashboard');
          break;
        case 'STUDENT':
          this.router.navigateByUrl('/component/inicioalumno');
          break;
        case 'TEACHER':
          this.router.navigateByUrl('/component/maestro');
          break;
        default:
          this.router.navigateByUrl('/not-found'); // Ruta predeterminada para roles desconocidos
      }
    } else {
      this.router.navigateByUrl('/login'); // Redirigir al login si no hay datos del usuario
    }
  }
}

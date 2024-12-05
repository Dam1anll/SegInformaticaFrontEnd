import { Routes } from '@angular/router';
import { FullComponent } from './pages/layouts/full/full.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { LogoutComponent } from './pages/auth/logout/logout.component';
import { AuthGuard } from './guards/auth.guard';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { EncrypterComponent } from './components/encrypter/encrypter.component';
// la ruta a preguntas

export const Approutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] }
      },
      {
        path: 'component',
        loadChildren: () =>
          import('./components/component.module').then((m) => m.ComponentsModule),
        canActivate: [AuthGuard],
        data: { roles: ['ADMIN'] }
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
  {
    path: '404',
    component: NotFoundComponent,
  },
];

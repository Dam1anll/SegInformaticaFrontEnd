import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from '../guards/auth.guard';

import { TextoComponent } from './texto/texto.component';
import { RegisterComponent } from './register/register.component';

export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'users',
				component: UsersComponent,
				canActivate: [AuthGuard],
				data: { roles: ['ADMIN'] }
			},
			{
				path: 'texto',
				component: TextoComponent,
				canActivate: [AuthGuard],
				data: { roles: ['ADMIN'] }
			},
			{
				path: 'register',
				component: RegisterComponent,
				canActivate: [AuthGuard],
				data: { roles: ['ADMIN'] }
			},
		]
	}
];

import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Panel de control',
    icon: 'bi bi-speedometer2',
    role: ['ADMIN'], 
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/users',
    title: 'Usuarios',
    icon: 'bi bi-person',
    role: ['ADMIN'],
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Encryptar',
    icon: 'bi bi-person',
    role: ['ADMIN'],
    class: '',
    extralink: false,
    submenu: [{
      path: '/component/texto',
      title: 'Texto',
      icon: 'bi bi-person',
      role: ['ADMIN'],
      class: '',
      extralink: false,
      submenu: []
    },]
  },
];

import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '/dashboard',
    title: 'Inicio',
    icon: 'bi bi-speedometer2',
    role: ['ADMIN'], 
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/component/encrypter',
    title: 'Encryptar',
    icon: 'bi bi-person',
    role: ['ADMIN'],
    class: '',
    extralink: false,
    submenu: []
  },
];

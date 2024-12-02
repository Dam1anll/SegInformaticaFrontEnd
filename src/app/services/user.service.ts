import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

//   toggleUserStatus(userId: string, token: string) {
//   return this.http.patch(`http://localhost:8080/users/${userId}/toggle-status`, null, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   });
// }
  // Otros métodos del servicio
}

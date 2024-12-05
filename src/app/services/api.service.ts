import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://seginformaticabackend.onrender.com/';

  constructor(
    private http: HttpClient
  ) {}

  http_header() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('access_token') as string,
        'Cache-Control': 'no-cache',
      }),
    };
  }

  get(data: string) {
    return this.http.get(this.baseUrl + data, this.http_header());
  }

  post(data: string, body: any) {
    return this.http.post(this.baseUrl + data, body, this.http_header());
  }

  put(data: string, body: any) {
    return this.http.put(this.baseUrl + data, body, this.http_header());
  }

  delete(data: string) {
    return this.http.delete(this.baseUrl + data, this.http_header());
  }

  post_(data: string, body: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(this.baseUrl + data, body, options);
  }

  post__(data: string, body: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post(data, body, options); // Para usar URL completa si es necesario
  }

  get__(data: string) {
    return this.http.get(data); // Para usar URL completa si es necesario
  }
}

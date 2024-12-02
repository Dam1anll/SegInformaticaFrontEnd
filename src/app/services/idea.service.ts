import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; // Asegúrate de que ApiService esté bien configurado
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IdeaService {
  
  constructor(private api: ApiService) {}

  /**
   * Cifra un texto y lo guarda en la base de datos
   * @param texto El texto que será cifrado
   * @returns Observable de la respuesta de la API
   */
  encryptText(texto: string): Observable<any> {
    return this.api.post('idea/encrypt', { texto });  // Enviar el texto para ser cifrado
  }

  /**
   * Descifra un texto ya cifrado, dado su ID en la base de datos
   * @param id El ID del texto que deseas descifrar
   * @returns Observable de la respuesta de la API
   */
  decryptText(id: number): Observable<any> {
    return this.api.post(`idea/decrypt/${id}`, {});  // Envía el ID para descifrar el texto
  }
}

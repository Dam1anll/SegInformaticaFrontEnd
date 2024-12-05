import { Injectable } from '@angular/core';
import { ApiService } from './api.service'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  constructor(private api: ApiService) {}

  encryptText(texto: string): Observable<any> {
    return this.api.post('encryption/encrypt', { text: texto }); 
  }

  decryptText(encryptedText: string, key: string, iv: string): Observable<any> {
    return this.api.post('encryption/decrypt', { encryptedText, key, iv });
  }
}

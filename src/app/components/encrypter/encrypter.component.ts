import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncryptionService } from 'src/app/services/encryption.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-encrypter',
  standalone: false,
  templateUrl: './encrypter.component.html',
  styleUrls: ['./encrypter.component.scss'],
})
export class EncrypterComponent implements OnInit {
  form: any;
  loading = false;

  encryptedText: string = '';
  decryptedText: string = '';
  key: string = '';
  iv: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private encryptionService: EncryptionService,
    private fun: FunctionsService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Inicializa el formulario reactivo.
   */
  private initForm(): void {
    this.form = this.formBuilder.group({
      textToEncrypt: ['', [Validators.required]],
      encryptedText: [''],
      key: [''],
      iv: [''],
    });
  }

  /**
   * Marca los campos como tocados para mostrar errores de validación.
   * @param formGroup Formulario que será marcado.
   */
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  /**
   * Encripta el texto ingresado.
   */
  encryptText(): void {
    if (this.form.invalid) {
      this.markFormGroupTouched(this.form);
      return;
    }

    this.loading = true;
    const textToEncrypt = this.form.get('textToEncrypt')?.value;

    this.encryptionService.encryptText(textToEncrypt)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.encryptedText = response.encryptedText;
          this.key = response.key;
          this.iv = response.iv;

          // Actualizar el formulario con los resultados
          this.form.patchValue({
            encryptedText: this.encryptedText,
            key: this.key,
            iv: this.iv,
          });
        },
        error: (error) => {
          console.error('Encryption error:', error);
          this.fun.presentAlertError('Error', error.error?.message || 'Error al encriptar el texto.');
        },
      });
  }

  /**
   * Desencripta el texto encriptado utilizando clave y IV.
   */
  decryptText(): void {
    const encryptedText = this.form.get('encryptedText')?.value;
    const key = this.form.get('key')?.value;
    const iv = this.form.get('iv')?.value;

    if (!encryptedText || !key || !iv) {
      this.fun.presentAlertError('Error', 'Por favor, ingresa el texto encriptado, la clave y el IV.');
      return;
    }

    this.loading = true;

    this.encryptionService.decryptText(encryptedText, key, iv)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (response) => {
          this.decryptedText = response.decryptedText;
        },
        error: (error) => {
          console.error('Decryption error:', error);
          this.fun.presentAlertError('Error', error.error?.message || 'Error al desencriptar el texto.');
        },
      });
  }
}

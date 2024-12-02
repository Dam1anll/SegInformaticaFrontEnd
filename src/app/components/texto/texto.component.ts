import { Component } from '@angular/core';
import { IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.scss'],
})
export class TextoComponent {
  textoOriginal: string = '';
  textoCifrado: string = '';
  textoDescifrado: string = '';
  textoId: number | null = null;

  constructor(private ideaService: IdeaService) {}

  // Método para cifrar el texto
  cifrarTexto() {
    this.ideaService.encryptText(this.textoOriginal).subscribe({
      next: (response) => {
        this.textoCifrado = response.data.encryptedText; // Asumiendo que la API devuelve el texto cifrado
        this.textoId = response.data.id; // Guardamos el ID del texto cifrado
        console.log('Texto cifrado:', this.textoCifrado);
      },
      error: (error) => {
        console.error('Error al cifrar el texto:', error);
      }
    });
  }

  // Método para descifrar el texto
  descifrarTexto() {
    if (this.textoId) {
      this.ideaService.decryptText(this.textoId).subscribe({
        next: (response) => {
          this.textoDescifrado = response.data.decryptedText; // Asumiendo que la API devuelve el texto descifrado
          console.log('Texto descifrado:', this.textoDescifrado);
        },
        error: (error) => {
          console.error('Error al descifrar el texto:', error);
        }
      });
    } else {
      console.error('ID del texto no disponible para descifrar.');
    }
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Figurinha } from '../modelos/figurinha.modelo';

@Injectable({ providedIn: 'root' })
export class FigurinhaServico {
  private apiUrl = 'http://localhost:8080/api/figurinhas';

  constructor(private http: HttpClient) { }

  // Retorna todo o catálogo de figurinhas.
  listarCatalogo(): Observable<Figurinha[]> {
    return this.http.get<Figurinha[]>(`${this.apiUrl}/catalogo`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MinhaColecaoModelo } from '../modelos/minha-colecao.modelo';

@Injectable({ providedIn: 'root' })
export class MinhaColecaoServico {
  private apiUrl = 'http://localhost:8080/api/figurinhas';

  constructor(private http: HttpClient) { }


  // Lista todos os itens da coleção do usuário.
  listarMinhaColecao(): Observable<MinhaColecaoModelo[]> {
    return this.http.get<MinhaColecaoModelo[]>(`${this.apiUrl}/minha-colecao`);
  }


  // Adiciona uma figurinha à coleção.
  adicionar(figurinhaId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/minha-colecao`, { figurinhaId });
  }


  // Atualiza a quantidade de um item específico.
  atualizarQuantidade(id: number, quantidade: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/minha-colecao/${id}?quantidade=${quantidade}`, null);
  }


  // Remove o registro inteiro da coleção.
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/minha-colecao/${id}`);
  }
}

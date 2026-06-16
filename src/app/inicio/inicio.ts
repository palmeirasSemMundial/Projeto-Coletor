import { Component, OnInit, signal } from '@angular/core';
import { FigurinhaServico } from '../servicos/figurinha.servico';
import { MinhaColecaoServico } from '../servicos/minha-colecao.servico';
import { Figurinha } from '../modelos/figurinha.modelo';
import { MinhaColecaoModelo } from '../modelos/minha-colecao.modelo';
import { MinhaColecao } from '../minha-colecao/minha-colecao';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})


export class Inicio implements OnInit {
  catalogo = signal<Figurinha[]>([]);
  colecao = signal<MinhaColecaoModelo[]>([]);
  percentualCompleto = 0;
  totalDistintas = 0;
  totalCatalogo = 0;


  constructor(private figurinhaServico: FigurinhaServico, private minhaColecaoServico: MinhaColecaoServico) { }


  ngOnInit(): void {
    this.figurinhaServico.listarCatalogo().subscribe({
      next: (dados) => {
        this.catalogo.set(dados);
        this.totalCatalogo = dados.length;
        this.carregarColecao();
      }
    });
  }


  carregarColecao(): void {
    this.minhaColecaoServico.listarMinhaColecao().subscribe({
      next: (dados) => {
        this.colecao.set(dados);
        this.totalDistintas = dados.length;
        this.percentualCompleto = (this.totalDistintas / this.totalCatalogo) * 100;
      }
    });
  }


  // Retorna estatísticas agrupadas por tipo de figurinha.
  get estatisticasPorTipo(): { tipo: string; total: number; obtido: number; percentual: number }[] {
    const tipos = [...new Set(this.catalogo().map(f => f.tipo))];
    return tipos.map(tipo => {
      const idsTipo = this.catalogo().filter(f => f.tipo === tipo).map(f => f.id);
      const totalTipo = idsTipo.length;
      const obtidoTipo = this.colecao().filter(item => idsTipo.includes(item.figurinhaId)).length;
      const percentual = totalTipo === 0 ? 0 : (obtidoTipo / totalTipo) * 100;
      return { tipo, total: totalTipo, obtido: obtidoTipo, percentual };
    });
  }
}

import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MinhaColecaoServico } from '../servicos/minha-colecao.servico';
import { FigurinhaServico } from '../servicos/figurinha.servico';
import { Figurinha } from '../modelos/figurinha.modelo';
import { MinhaColecaoModelo } from '../modelos/minha-colecao.modelo';

@Component({
  selector: 'app-minha-colecao',
  standalone: false,
  templateUrl: './minha-colecao.html',
  styleUrl: './minha-colecao.css',
})


export class MinhaColecao implements OnInit{
  colecao = signal<MinhaColecaoModelo[]>([]);
  catalogo = signal<Figurinha[]>([]);
  formulario: FormGroup;
  figurinhaSelecionada: Figurinha | null = null;
  isEditing = false;
  editandoId: number | null = null;
  quantidadeEditando: number = 0;

  constructor(
    private fb: FormBuilder,
    private minhaColecaoServico: MinhaColecaoServico,
    private figurinhaServico: FigurinhaServico
  ) {
    this.formulario = this.fb.group({
      figurinhaId: [null]
    });
  }


  ngOnInit(): void {
    this.carregarCatalogo();
    this.carregarColecao();
  }


  // Carrega o catálogo.
  carregarCatalogo(): void {
    this.figurinhaServico.listarCatalogo().subscribe({
      next: (dados) => this.catalogo.set(dados),
      error: (err) => console.error('Erro ao carregar catálogo', err)
    });
  }


  // Carrega a coleção.
  carregarColecao(): void {
    this.minhaColecaoServico.listarMinhaColecao().subscribe({
      next: (dados) => this.colecao.set(dados),
      error: (err) => console.error('Erro ao carregar coleção', err)
    });
  }

  onSelectFigurinha(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const id = Number(select.value);
    this.formulario.patchValue({ figurinhaId: id });
    this.figurinhaSelecionada = this.catalogo().find(f => f.id === id) || null;
  }

  adicionar(): void {
    const figurinhaId = this.formulario.get('figurinhaId')?.value;
    if (!figurinhaId) return;

    this.minhaColecaoServico.adicionar(figurinhaId).subscribe({
      next: () => {
        this.carregarColecao();
        this.formulario.reset();
        this.figurinhaSelecionada = null;
      },
      error: (err) => alert('Erro ao adicionar: ' + err.message)
    });
  }

  editarQuantidade(item: MinhaColecaoModelo): void {
    this.isEditing = true;
    this.editandoId = item.id;
    this.quantidadeEditando = item.quantidade;
  }

  confirmarEdicao(): void {
    if (!this.editandoId) return;
    this.minhaColecaoServico.atualizarQuantidade(this.editandoId, this.quantidadeEditando).subscribe({
      next: () => {
        this.carregarColecao();
        this.cancelarEdicao();
      },
      error: (err) => alert('Erro ao atualizar: ' + err.message)
    });
  }

  cancelarEdicao(): void {
    this.isEditing = false;
    this.editandoId = null;
    this.quantidadeEditando = 0;
  }

  remover(item: MinhaColecaoModelo): void {
    if (confirm(`Remover "${item.nome}" da coleção?`)) {
      this.minhaColecaoServico.remover(item.id).subscribe({
        next: () => this.carregarColecao(),
        error: (err) => alert('Erro ao remover: ' + err.message)
      });
    }
  }
}


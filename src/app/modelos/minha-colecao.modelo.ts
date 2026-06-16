// Modelo das figurinhas da coleção.
export interface MinhaColecaoModelo {
  id: number;
  figurinhaId: number;
  quantidade: number;
  numero: number;
  nome: string;
  equipe: string;
  tipo: string;
  especial: boolean;
}

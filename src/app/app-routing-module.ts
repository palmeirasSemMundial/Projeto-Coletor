import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { MinhaColecao } from './minha-colecao/minha-colecao';

export const routes: Routes = [
  { path: 'inicio', component: Inicio },
  { path: 'minha-colecao', component: MinhaColecao },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }
];

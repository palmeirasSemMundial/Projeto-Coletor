import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { App } from './app';
import { Inicio } from './inicio/inicio';
import { MinhaColecao } from './minha-colecao/minha-colecao';
import { Cabecalho } from './cabecalho/cabecalho';
import { Rodape } from './rodape/rodape';
import { routes } from './app-routing-module';

@NgModule({
  declarations: [App, Inicio, Cabecalho, Rodape, MinhaColecao],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}

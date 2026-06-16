import { Component, signal } from '@angular/core';

// A classe App é responsável por exibir o título da aplicação.
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})


export class App {
  protected readonly title = signal('coletor');
}

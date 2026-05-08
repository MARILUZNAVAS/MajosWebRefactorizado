import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/folder/Inicio', icon: 'rocket' },
    { title: 'Información personal', url: '/folder/Informacion', icon: 'person-circle' },
    { title: 'Contacto', url: '/folder/Contacto', icon: 'paper-plane' }
  ];
  
  public labels = [];

  constructor() {}
}
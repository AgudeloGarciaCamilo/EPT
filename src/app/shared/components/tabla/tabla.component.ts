import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  public cabeceras: string[] = [
    'NOMBRE DEL REPO',
    'DESCRIPCIÓN',
    'ENLACE AL REPO',
    'ESTRELLAS',
    'LENGUAJES DE PROGRAMACIÓN'
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

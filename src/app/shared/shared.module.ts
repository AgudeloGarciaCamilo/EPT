import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';


@NgModule({
  declarations: [
    BuscadorComponent,
    FiltrosComponent,
    TablaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }

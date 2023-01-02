import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LenguajesPipe } from './pipes/lenguajes.pipe';


@NgModule({
  declarations: [
    BuscadorComponent,
    FiltrosComponent,
    TablaComponent,
    LenguajesPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscadorComponent,
    FiltrosComponent,
    TablaComponent
  ]
})
export class SharedModule { }

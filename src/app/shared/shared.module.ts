import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { BuscadorComponent } from './components/buscador/buscador.component';
import { FiltrosComponent } from './components/filtros/filtros.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TablaComponent } from './components/tabla/tabla.component';

import { LenguajesPipe } from './pipes/lenguajes.pipe';


@NgModule({
  declarations: [
    BuscadorComponent,
    FiltrosComponent,
    SpinnerComponent,
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
    SpinnerComponent,
    TablaComponent
  ]
})
export class SharedModule { }

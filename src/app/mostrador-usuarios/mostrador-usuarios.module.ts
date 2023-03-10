import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GitHubUsuariosComponent } from './components/git-hub-usuarios/git-hub-usuarios.component';
import { MostradorUsuariosComponent } from './mostrador-usuarios/mostrador-usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GitHubUsuariosComponent,
    MostradorUsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
    MostradorUsuariosComponent
  ]
})
export class MostradorUsuariosModule { }

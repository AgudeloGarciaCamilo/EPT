import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GitHubUsuariosComponent } from './components/git-hub-usuarios/git-hub-usuarios.component';
import { MostradorUsuariosComponent } from './mostrador-usuarios/mostrador-usuarios.component';
import { UsuarioComponent } from './components/usuario/usuario.component';



@NgModule({
  declarations: [
    GitHubUsuariosComponent,
    MostradorUsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MostradorUsuariosComponent
  ]
})
export class MostradorUsuariosModule { }

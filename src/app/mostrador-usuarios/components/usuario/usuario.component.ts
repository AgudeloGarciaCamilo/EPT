import { Component, Input } from '@angular/core';
import { UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import { DESCRIPCION_GENERICA_IMAGEN } from '../../constants/mostrador-usuarios.config';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {

  @Input() usuario: UsuarioGitHub | null;

  public descripcionImagen: string = DESCRIPCION_GENERICA_IMAGEN;

  constructor() {
    this.usuario = null;
   }

}

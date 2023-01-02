import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/core/services/git-hub.service';
import { InfoUsuarioGitHub, RepositorioGitHub, UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import { LABEL_BOTON_BUSCADOR_USUARIO, PLACEHOLDER_BUSCADOR_USUARIO } from '../constants/mostrador-usuarios.config';

@Component({
  selector: 'app-mostrador-usuarios',
  templateUrl: './mostrador-usuarios.component.html',
  styleUrls: ['./mostrador-usuarios.component.css']
})
export class MostradorUsuariosComponent implements OnInit {

  public usuario: UsuarioGitHub | null;
  public repositorios: RepositorioGitHub[];

  public placeholderBuscador: string = PLACEHOLDER_BUSCADOR_USUARIO;
  public labelBotonBuscador: string = LABEL_BOTON_BUSCADOR_USUARIO;

  constructor(
    private _gitHubService: GitHubService
  ) {
    this.usuario = null;
    this.repositorios = [];
  }

  ngOnInit(): void {
    this._gitHubService.getInfoUsuarioGitHub('johnpapa').subscribe((infoUsuario: InfoUsuarioGitHub | null) => {
      this._inicializarMostrador(infoUsuario);
    });
  }

  private _inicializarMostrador(infoUsuario: InfoUsuarioGitHub | null): void {
    console.log('Received Info: ', infoUsuario);
    if (infoUsuario !== null) {
      this.usuario = infoUsuario.usuario;
      this.repositorios = infoUsuario.repositorios;
    }
  }

  public onBuscarUsuario(nombreUsuario: string) {
    console.log('Nuevo usuario: ', nombreUsuario);
    this.usuario = null;
    this.repositorios = [];
    this._gitHubService.getInfoUsuarioGitHub(nombreUsuario).subscribe((infoUsuario: InfoUsuarioGitHub | null) => {
      this._inicializarMostrador(infoUsuario);
      console.log('Heeey');
    });
  }

}

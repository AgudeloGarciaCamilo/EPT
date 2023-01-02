import { Component, OnInit } from '@angular/core';
import { GitHubService } from 'src/app/core/services/git-hub.service';
import { InfoUsuarioGitHub, LenguajesProgramacion, RepositorioGitHub, UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import { MostradorUsuariosService } from '../services/mostrador-usuarios.service';

@Component({
  selector: 'app-mostrador-usuarios',
  templateUrl: './mostrador-usuarios.component.html',
  styleUrls: ['./mostrador-usuarios.component.css']
})
export class MostradorUsuariosComponent implements OnInit {

  public usuario: UsuarioGitHub | null;
  public repositorios: RepositorioGitHub[];

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

}

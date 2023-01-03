import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subject, takeUntil } from 'rxjs';
import { GitHubService } from 'src/app/core/services/git-hub.service';
import { InfoUsuarioGitHub, RepositorioGitHub, UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import { BUSQUEDA_NO_INICIADA_MENSAJE, LABEL_BOTON_BUSCADOR_USUARIO, PLACEHOLDER_BUSCADOR_USUARIO, RETARDO_CARGA_MILISEGUNDOS, USUARIO_NO_ENCONTRADO } from '../constants/mostrador-usuarios.config';

@Component({
  selector: 'app-mostrador-usuarios',
  templateUrl: './mostrador-usuarios.component.html',
  styleUrls: ['./mostrador-usuarios.component.css']
})
export class MostradorUsuariosComponent implements OnInit, OnDestroy {

  private _destructorSuscripciones$: Subject<void> = new Subject();

  public usuario!: UsuarioGitHub | null;
  public repositorios!: RepositorioGitHub[];

  public placeholderBuscador: string = PLACEHOLDER_BUSCADOR_USUARIO;
  public labelBotonBuscador: string = LABEL_BOTON_BUSCADOR_USUARIO;
  public _retardoEnCargaMilisegundos: number = RETARDO_CARGA_MILISEGUNDOS;
  public mensajeUsuarioNull: string = BUSQUEDA_NO_INICIADA_MENSAJE;

  public estaCargando: boolean = false;

  constructor(
    private _gitHubService: GitHubService
  ) {
    this._limpiarInfoUsuario();
  }

  ngOnInit(): void {}

  private _inicializarMostrador(infoUsuario: InfoUsuarioGitHub | null): void {
    console.log('Received Info: ', infoUsuario);
    if (infoUsuario !== null) {
      this.usuario = infoUsuario.usuario;
      this.repositorios = infoUsuario.repositorios;
    }
    else {
      this.mensajeUsuarioNull = USUARIO_NO_ENCONTRADO;
    }
  }

  public onBuscarUsuario(nombreUsuario: string) {
    this._realizarBusquedaUsuarioEnGitHub(nombreUsuario);
  }

  private _realizarBusquedaUsuarioEnGitHub(nombreUsuario: string): void {
    this.estaCargando = true;
    this._limpiarInfoUsuario();

    this._gitHubService.getInfoUsuarioGitHub(nombreUsuario)
      .pipe(
        takeUntil(this._destructorSuscripciones$),
        delay(this._retardoEnCargaMilisegundos)
      )
      .subscribe((infoUsuario: InfoUsuarioGitHub | null) => {
        this._inicializarMostrador(infoUsuario);
        this.estaCargando = false;
      });
  }

  private _limpiarInfoUsuario(): void {
    this.usuario = null;
    this.repositorios = [];
  }

  ngOnDestroy(): void {
    this._destructorSuscripciones$.complete();
    this._destructorSuscripciones$.unsubscribe();
  }

}

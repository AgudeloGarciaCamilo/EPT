import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CabeceraTabla } from 'src/app/models/cabezera-tabla.interface';
import { Filtros } from 'src/app/models/filtros.interface';
import { RepositorioGitHub, LenguajesProgramacion, UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import { PLACEHOLDER_BUSCADOR_REPOSITORIO, LABEL_BOTON_BUSCADOR_REPOSITORIO, CABEZERAS_TABLA } from '../../constants/mostrador-usuarios.config';
import { MostradorUsuariosService } from '../../services/mostrador-usuarios.service';

@Component({
  selector: 'app-git-hub-usuarios',
  templateUrl: './git-hub-usuarios.component.html',
  styleUrls: ['./git-hub-usuarios.component.css']
})
export class GitHubUsuariosComponent implements OnInit, OnDestroy {

  @Input() usuario: UsuarioGitHub | null;
  @Input() repositorios: RepositorioGitHub[];

  public lenguajesPorRepo: Map<string, LenguajesProgramacion | null> | null;
  public filtrosLenguaje: Map<string, boolean> | null;
  public listaFiltrosLenguaje: string[];

  private _filtroNombreRepoActual: string;
  private _filtrosLenguajesActuales: Filtros;

  public placeholderBuscador: string = PLACEHOLDER_BUSCADOR_REPOSITORIO;
  public labelBotonBuscador: string = LABEL_BOTON_BUSCADOR_REPOSITORIO;
  public cabecerasTabla: CabeceraTabla[] = CABEZERAS_TABLA;

  public controladorRepositoriosActuales$: BehaviorSubject<RepositorioGitHub[]>;

  constructor(
    private _mostradoUsuariosService: MostradorUsuariosService,
  ) {
    this.usuario = null;
    this.repositorios = [];
    this.lenguajesPorRepo = null;
    this.filtrosLenguaje = null;
    this.listaFiltrosLenguaje = [];
    this.controladorRepositoriosActuales$ = new BehaviorSubject<RepositorioGitHub[]>([]);
    this._filtroNombreRepoActual = '';
    this._filtrosLenguajesActuales = {};
  }

  ngOnInit(): void {
    this._prepararInformacionParaMostrar();
  }

  private _prepararInformacionParaMostrar(): void {
    this.lenguajesPorRepo = this._mostradoUsuariosService.getLenguajesPorRepo(this.repositorios);
    this.filtrosLenguaje = this._mostradoUsuariosService.getFiltrosLenguajes(this.repositorios);
    this.listaFiltrosLenguaje = this._mostradoUsuariosService.getListaFiltrosLenguajes(this.filtrosLenguaje);

    this.controladorRepositoriosActuales$.next(this.repositorios);
  }

  public onFiltroCambiado(filtros: Filtros): void {
    this._filtrosLenguajesActuales = filtros;
    this._filtrarRepositorios();
  }

  public onFiltrarRepositorioPorNombre(nombreRepo: string) {
    this._filtroNombreRepoActual = nombreRepo;
    this._filtrarRepositorios();
  }

  public _filtrarRepositorios(): void {
    const repositoriosFiltrados: RepositorioGitHub[] = this._mostradoUsuariosService.filtrarRepositorios(
      this._filtroNombreRepoActual,
      this._filtrosLenguajesActuales,
      this.listaFiltrosLenguaje,
      this.repositorios,
      this.lenguajesPorRepo!
    );
    this.controladorRepositoriosActuales$.next(repositoriosFiltrados);
  }

  ngOnDestroy(): void {
    this.controladorRepositoriosActuales$.complete();
  }
}

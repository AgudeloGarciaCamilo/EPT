import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CabeceraTabla } from 'src/app/models/cabezera-tabla.interface';
import { Filtros } from 'src/app/models/filtros.interface';
import { RepositorioGitHub, LenguajesProgramacion, UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import { PLACEHOLDER_BUSCADOR_REPOSITORIO, LABEL_BOTON_BUSCADOR_REPOSITORIO, CABEZERAS_TABLA, CLAVE_FILTRADO_TABLA } from '../../constants/mostrador-usuarios.config';
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

  public placeholderBuscador: string = PLACEHOLDER_BUSCADOR_REPOSITORIO;
  public labelBotonBuscador: string = LABEL_BOTON_BUSCADOR_REPOSITORIO;
  public cabecerasTabla: CabeceraTabla[] = CABEZERAS_TABLA;
  // public claveFiltrado: string = CLAVE_FILTRADO_TABLA;

  public controladorRepositoriosActuales$: BehaviorSubject<RepositorioGitHub[]>;
  // public controladorFiltroActual$: BehaviorSubject<string>;

  constructor(
    private _mostradoUsuariosService: MostradorUsuariosService,
  ) {
    this.usuario = null;
    this.repositorios = [];
    this.lenguajesPorRepo = null;
    this.filtrosLenguaje = null;
    this.listaFiltrosLenguaje = [];
    this.controladorRepositoriosActuales$ = new BehaviorSubject<RepositorioGitHub[]>([]);
    // this.controladorFiltroActual$ = new BehaviorSubject<string>('');
  }

  ngOnInit(): void {
    this._prepararInformacionParaMostrar();
  }

  private _prepararInformacionParaMostrar(): void {
    this.lenguajesPorRepo = this._mostradoUsuariosService.getLenguajesPorRepo(this.repositorios);
    this.filtrosLenguaje = this._mostradoUsuariosService.getFiltrosLenguajes(this.repositorios);
    this.listaFiltrosLenguaje = this._mostradoUsuariosService.getListaFiltrosLenguajes(this.filtrosLenguaje);

    this.controladorRepositoriosActuales$.next(this.repositorios);

    console.log('REPOSITORIOS: ', this.repositorios);
    console.log('LENGUAJES POR REPO', this.lenguajesPorRepo);
    console.log('FILTROS: ', this.filtrosLenguaje);
  }

  public onFiltroCambiado(filtros: Filtros): void {
    const repositoriosFiltrados: RepositorioGitHub[] =
    this._mostradoUsuariosService.filtrarRepositoriosPorLenguajesProgramacion(
      filtros,
      this.listaFiltrosLenguaje,
      this.repositorios,
      this.lenguajesPorRepo!
    )
    this.controladorRepositoriosActuales$.next(repositoriosFiltrados);
  }

  public onFiltrarRepositorioPorNombre(nombreRepo: string) {
    console.log('Nuevo usuario: ', nombreRepo);
    const repositoriosFiltrados: RepositorioGitHub[] = this._mostradoUsuariosService.filtrarRepositoriosPorNombre(
      nombreRepo,
      this.repositorios
    )
    this.controladorRepositoriosActuales$.next(repositoriosFiltrados);
  }

  ngOnDestroy(): void {
    this.controladorRepositoriosActuales$.complete();
  }
}

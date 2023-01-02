import { Component, Input, OnInit } from '@angular/core';
import { Filtro } from 'src/app/models/filtro.interface';
import { RepositorioGitHub, LenguajesProgramacion } from 'src/app/models/info-usuario-github.interface';
import { PLACEHOLDER_BUSCADOR_REPOSITORIO, LABEL_BOTON_BUSCADOR_REPOSITORIO } from '../../constants/mostrador-usuarios.constant';
import { MostradorUsuariosService } from '../../services/mostrador-usuarios.service';

@Component({
  selector: 'app-git-hub-usuarios',
  templateUrl: './git-hub-usuarios.component.html',
  styleUrls: ['./git-hub-usuarios.component.css']
})
export class GitHubUsuariosComponent implements OnInit {

  @Input() repositorios: RepositorioGitHub[];

  public lenguajesPorRepo: Map<string, LenguajesProgramacion | null> | null;
  public filtrosLenguaje: Map<string, boolean> | null;
  public listaFiltrosLenguaje: string[];

  public placeholderBuscador: string = PLACEHOLDER_BUSCADOR_REPOSITORIO;
  public labelBotonBuscador: string = LABEL_BOTON_BUSCADOR_REPOSITORIO;

  constructor(
    private _mostradoUsuariosService: MostradorUsuariosService,
  ) {
    this.repositorios = [];
    this.lenguajesPorRepo = null;
    this.filtrosLenguaje = null;
    this.listaFiltrosLenguaje = [];

  }

  ngOnInit(): void {
    this._prepararInformacionParaMostrar();
  }

  private _prepararInformacionParaMostrar(): void {
    this.lenguajesPorRepo = this._mostradoUsuariosService.getLenguajesPorRepo(this.repositorios);
    this.filtrosLenguaje = this._mostradoUsuariosService.getFiltrosLenguajes(this.repositorios);
    this.listaFiltrosLenguaje = this._mostradoUsuariosService.getListaFiltrosLenguajes(this.filtrosLenguaje);

    console.log('REPOSITORIOS: ', this.repositorios);
    console.log('LENGUAJES POR REPO', this.lenguajesPorRepo);
    console.log('FILTROS: ', this.filtrosLenguaje);
  }

  public onFiltroCambiado(filtro: Filtro): void {
    console.log('CAMBIO CAPTADO: ', filtro);
  }

  public onFiltrarRepositorioPorNombre(nombreUsuario: string) {
    console.log('Nuevo usuario: ', nombreUsuario);
  }

}

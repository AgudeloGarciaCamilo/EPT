import { Injectable } from '@angular/core';
import { Filtros } from 'src/app/models/filtros.interface';
import { LenguajesProgramacion, RepositorioGitHub } from '../../models/info-usuario-github.interface';

@Injectable({
  providedIn: 'root'
})
export class MostradorUsuariosService {

  constructor() { }

  public getLenguajesPorRepo(repositorios: RepositorioGitHub[]): Map<string, LenguajesProgramacion | null> {
    const lenguajesPorRepo = new Map<string, LenguajesProgramacion | null>();

    repositorios.forEach( (repositorio: RepositorioGitHub) => {
      const repoNombreClave = repositorio.nombre.toLowerCase();
      lenguajesPorRepo.set(repoNombreClave, repositorio.lenguajesProgramacion);
    });

    return lenguajesPorRepo;
  }

  public getFiltrosLenguajes(repositorios: RepositorioGitHub[]): Map<string, boolean> {
    const filtrosLenguajes: Map<string, boolean> = new Map<string, boolean>();

    repositorios.forEach( (repositorio: RepositorioGitHub) => {
      const repositorioTieneLenguajesProgramacion: boolean = repositorio.lenguajesProgramacion !== null;

      if (repositorioTieneLenguajesProgramacion) {
        const lenguajes: string[] = Object.keys(repositorio.lenguajesProgramacion!);

        lenguajes.forEach( (lenguaje: string) => {
          const lenguajeLowerCase = lenguaje.toLowerCase();
          const lenguajeAunNoRegistrado: boolean = !filtrosLenguajes.has(lenguajeLowerCase);

          if (lenguajeAunNoRegistrado) {
            filtrosLenguajes.set(lenguajeLowerCase, false);
          }
        });
      }
    });

    return filtrosLenguajes;
  }

  public getListaFiltrosLenguajes(filtrosLenguaje: Map<string, boolean>): string[] {
    return Array.from( filtrosLenguaje.keys() );
  }

  public filtrarRepositorios(
    filtroNombre: string,
    filtrosLenguajes: Filtros,
    listaFiltrosLenguaje: string[],
    repositorios: RepositorioGitHub[],
    lenguajesPorRepo: Map<string, LenguajesProgramacion | null>
  ): RepositorioGitHub[] {
    const reposFiltradosPorNombre = repositorios.filter(
      (repositorio: RepositorioGitHub) => repositorio.nombre.includes(filtroNombre)
    );

    if ( this._todosLosFiltrosEstanDesactivados(filtrosLenguajes, listaFiltrosLenguaje) ) {
      return reposFiltradosPorNombre;
    }
    else {
      return reposFiltradosPorNombre.filter(
        (repositorio: RepositorioGitHub) => this._debeMostrarseElRepositorio(
          filtrosLenguajes,
          listaFiltrosLenguaje,
          repositorio,
          lenguajesPorRepo
        )
      );
    }

  }

  private _todosLosFiltrosEstanDesactivados(filtros: Filtros, listaFiltrosLenguaje: string[]) {
    return listaFiltrosLenguaje.every((lenguaje: string) => !filtros[lenguaje]);
  }

  private _debeMostrarseElRepositorio(
    filtros: Filtros,
    listaFiltrosLenguaje: string[],
    repositorio: RepositorioGitHub,
    lenguajesPorRepo: Map<string, LenguajesProgramacion | null>
  ): boolean {

    let debeMostrarse: boolean = false;

    debeMostrarse = listaFiltrosLenguaje.some((lenguaje: string) => {
      const lenguajesRepo: LenguajesProgramacion | null = lenguajesPorRepo.get(repositorio.nombre.toLowerCase())!;
      const filtroLenguajeActivado: boolean = filtros[lenguaje];
      const repoContieneElLenguaje: boolean =
      lenguajesRepo !== null && lenguajesRepo !== undefined && lenguajesRepo[lenguaje] !== undefined;

      return filtroLenguajeActivado && repoContieneElLenguaje;
    });

    return debeMostrarse;
  }

}

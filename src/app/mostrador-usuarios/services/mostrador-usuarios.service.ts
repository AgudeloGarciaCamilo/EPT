import { Injectable } from '@angular/core';
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

  public filtrarRepositorios(filtro: string, datos: RepositorioGitHub[]): RepositorioGitHub[] {
    return datos.filter( (repositorio: RepositorioGitHub) => repositorio.nombre.includes(filtro));
  }

}

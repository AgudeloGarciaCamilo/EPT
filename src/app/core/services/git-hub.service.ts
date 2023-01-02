import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, concatMap, forkJoin, map, Observable, of, tap } from 'rxjs';
import { GitHubRepoDTO } from 'src/app/models/github-repo-dto.interface';
import { GitHubRepoLanguagesDTO } from 'src/app/models/github-repo-languages-dto.interface';

import { GitHubUserDTO } from 'src/app/models/github-user-dto.interface';
import {
  InfoUsuarioGitHub,
  LenguajesProgramacion,
  RepositorioGitHub,
  UsuarioGitHub } from 'src/app/models/info-usuario-github.interface';
import {
  getGitHubLenguajesPorRepositorio,
  getGitHubRepositoriosPorUsuarioEndpoint,
  getGitHubUsuarioEndpoint } from '../constants/endpoints.config';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GitHubService {

  private _usuariosBuscados: Map<string, InfoUsuarioGitHub>;

  constructor(
    private _localStorageService: LocalStorageService,
    private _httpService: HttpClient
  ) {
    this._usuariosBuscados = new Map();
   }

  public getInfoUsuarioGitHub(usuario: string): Observable<InfoUsuarioGitHub | null> {
    if (this._usuariosBuscados.has(usuario)) {
      return of( this._usuariosBuscados.get(usuario)! );
    }
    else {
      return this._getInfoUsuarioNoBuscadoAun(usuario);
    }
  }

  private _getInfoUsuarioNoBuscadoAun(usuario: string): Observable<InfoUsuarioGitHub | null> {
    const usuarioKey: string = usuario.toLowerCase();
    const infoUsuario: InfoUsuarioGitHub | null = this._localStorageService.getInfoUsuarioGitHub(usuarioKey);
    const existeInfoUsuarioEnLocalStorage: boolean = infoUsuario !== null;

    if (existeInfoUsuarioEnLocalStorage) {
      console.log('Lo cogí desde el LocalStorage');
      return of(infoUsuario);
    }
    else {
      console.log('Lo cogí desde la API');
      return this._getInfoUsuarioDesdeApi(usuario);
    }
  }

  private _getInfoUsuarioDesdeApi(usuario: string): Observable<InfoUsuarioGitHub | null> {
    const url: string = getGitHubUsuarioEndpoint(usuario);
    const dtoUsuarioRecibido: Observable<GitHubUserDTO> = this._httpService.get<GitHubUserDTO>(url);

    return dtoUsuarioRecibido.pipe(
      map( (dtoUsuario: GitHubUserDTO) => this._procesarDTOUsuario(dtoUsuario)),
      concatMap( (usuario: UsuarioGitHub) => this._getInfoUsuariosConRepositorios(usuario) ),
      concatMap( (infoUsuario: InfoUsuarioGitHub) => this._obtenerLenguajesProgramacionPorRepositorio(infoUsuario) ),
      tap((infoUsuario: InfoUsuarioGitHub) => this._guardarInfoUsuarioLocalmente(infoUsuario)),
      catchError( _ => this._responderAnteErrores())
    );
  }

  private _guardarInfoUsuarioLocalmente(infoUsuario: InfoUsuarioGitHub): void {
    const usuarioKey: string = infoUsuario.usuario.nombreUsuario.toLowerCase();
    this._usuariosBuscados.set(usuarioKey, infoUsuario);
    this._localStorageService.setInfoUsuarioGitHub(usuarioKey, infoUsuario);
  }

  private _procesarDTOUsuario(dtoUsuario: GitHubUserDTO): UsuarioGitHub {
    const usuario: UsuarioGitHub = {
      nombreUsuario: dtoUsuario.login,
      urlImagen: dtoUsuario.avatar_url,
      biografia: dtoUsuario.bio
    };

    return usuario;
  }

  private _getInfoUsuariosConRepositorios(usuario: UsuarioGitHub): Observable<InfoUsuarioGitHub> {
    const url: string = getGitHubRepositoriosPorUsuarioEndpoint(usuario.nombreUsuario);
    const dtoRepositoriosRecibido: Observable<GitHubRepoDTO[]> = this._httpService.get<GitHubRepoDTO[]>(url);

    return dtoRepositoriosRecibido.pipe(
      map( (dtoRepositorios: GitHubRepoDTO[]) => this._obtenerInfoUsuarioSinLenguajes(usuario, dtoRepositorios)),
    );
  }

  private _obtenerInfoUsuarioSinLenguajes(usuario: UsuarioGitHub, dtoRepositorios: GitHubRepoDTO[]): InfoUsuarioGitHub {
    const repositorios: RepositorioGitHub[] = this._procesarDTORepositorios(dtoRepositorios);

    const infoUsuarioGitHub: InfoUsuarioGitHub = {
      usuario,
      repositorios
    };

    return infoUsuarioGitHub;
  }

  private _procesarDTORepositorios(dtoRepositorios: GitHubRepoDTO[]): RepositorioGitHub[] {
    return dtoRepositorios.map( (repositorioDto: GitHubRepoDTO) => {
      const repositorio: RepositorioGitHub = {
        nombre: repositorioDto.name,
        descripcion: repositorioDto.description,
        url: repositorioDto.html_url,
        estrellas: repositorioDto.stargazers_count,
        lenguajesProgramacion: null
      };

      return repositorio;
    });
  }

  private _obtenerLenguajesProgramacionPorRepositorio(infoUsuario: InfoUsuarioGitHub): Observable<InfoUsuarioGitHub> {
    const llamadasHttp: Observable<GitHubRepoLanguagesDTO>[] = this._obtenerLLamadasHttpLenguajes(infoUsuario);

    return forkJoin(llamadasHttp).pipe(
      map( (orderedRepoLanguages: GitHubRepoLanguagesDTO[]) =>
        this._obtenerInformacionUsuariosCompleta(infoUsuario, orderedRepoLanguages)
      )
    );
  }

  private _obtenerInformacionUsuariosCompleta(
    infoUsuario: InfoUsuarioGitHub,
    orderedRepoLanguages: GitHubRepoLanguagesDTO[]) : InfoUsuarioGitHub {
    infoUsuario.repositorios.forEach( (repositorio: RepositorioGitHub, indice: number) => {
      const lenguajesProcesados: LenguajesProgramacion = {};
      Object.entries(orderedRepoLanguages[indice]).forEach(
        (arrayKeyValue: [string, number]) => {
          const nombreLenguajeLowercase = arrayKeyValue[0].toLowerCase();

          lenguajesProcesados[nombreLenguajeLowercase] = arrayKeyValue[1];
        });

      repositorio.lenguajesProgramacion = lenguajesProcesados;
    });

    return infoUsuario;
  }

  private _obtenerLLamadasHttpLenguajes(infoUsuario: InfoUsuarioGitHub): Observable<GitHubRepoLanguagesDTO>[] {
    return infoUsuario.repositorios.map( (repositorio: RepositorioGitHub) => {
      const url = getGitHubLenguajesPorRepositorio(infoUsuario.usuario.nombreUsuario, repositorio.nombre);

      return this._httpService.get<GitHubRepoLanguagesDTO>(url);
    });
  }


  private _responderAnteErrores(): Observable<null> {
    return of(null);
  }
}

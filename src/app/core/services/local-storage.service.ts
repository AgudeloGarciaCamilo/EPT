import { Injectable } from '@angular/core';
import { InfoUsuarioGitHub } from 'src/app/models/info-usuario-github.interface';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /** Instancia del Local Storage. */
  private _myLocalStorage: Storage = localStorage;
  constructor() { }

  public getInfoUsuarioGitHub(key: string): InfoUsuarioGitHub | null {
    const infoUsuarioGuardadaString: string | null = this._myLocalStorage.getItem(key);
    const existeInfoUsuario: boolean = infoUsuarioGuardadaString !== null;

    const infoUsuario: InfoUsuarioGitHub | null = existeInfoUsuario
      ? JSON.parse(infoUsuarioGuardadaString!)
      : infoUsuarioGuardadaString;

    return infoUsuario;
  }

  public setInfoUsuarioGitHub(key: string, infoUsuario: InfoUsuarioGitHub): void {
    const infoUsuarioString: string = JSON.stringify(infoUsuario);

    this._myLocalStorage.setItem(key, infoUsuarioString);
  }
}

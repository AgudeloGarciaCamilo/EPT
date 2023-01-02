import { Injectable } from '@angular/core';
import { OrdenTabla } from '../models/tabla-orden.enum';

@Injectable({
  providedIn: 'root'
})
export class TablaService {

  private _ordenActual!: OrdenTabla;
  private _datosIniciales: any[] = [];

  constructor() {
    this.resetearOrden();
  }

  public determinarDatosIniciales(datos: any[]): void {
    this._datosIniciales = Object.assign(datos);
    this.resetearOrden();
  }

  public resetearOrden(): void {
    this._ordenActual = OrdenTabla.NORMAL;
  }

  public ordenarDatos<Type>(datos: Type[], claveOrdenacion: string): Type[] {
    let datosOrdenados: Type[] = [];

    switch(this._ordenActual) {
      case OrdenTabla.NORMAL:
        datosOrdenados = this._ordenarAscendentemente(datos, claveOrdenacion);
        this._ordenActual = OrdenTabla.ASCENDENTE;
        break;
      case OrdenTabla.ASCENDENTE:
        datosOrdenados = this._ordenarDescendentemente(datos, claveOrdenacion);
        this._ordenActual = OrdenTabla.DESCENDENTE;
        break;
      case OrdenTabla.DESCENDENTE:
        datosOrdenados = this._datosIniciales;
        this._ordenActual = OrdenTabla.NORMAL;
        break;
      default:
        datosOrdenados = this._datosIniciales;
        this._ordenActual = OrdenTabla.NORMAL;
    }

    return datosOrdenados;
  }

  private _ordenarAscendentemente(datos: any[], claveOrdenacion: string): any[] {
    return datos.sort(
      (anterior: any, posterior: any) => {
        let comparisonResult: number = 0;
        const isString: boolean = typeof anterior[claveOrdenacion] === 'string';

        if (isString) {
          comparisonResult = posterior[claveOrdenacion].localeCompare(anterior[claveOrdenacion]);
        }
        else {
          comparisonResult = anterior[claveOrdenacion] - posterior[claveOrdenacion];
        }
        return comparisonResult;
      }
    );
  }

  private _ordenarDescendentemente(datos: any[], claveOrdenacion: string): any[] {
    return datos.sort(
      (anterior: any, posterior: any) => {
        let comparisonResult: number = 0;
        const isString: boolean = typeof anterior[claveOrdenacion] === 'string';

        if (isString) {
          comparisonResult = anterior[claveOrdenacion].localeCompare(posterior[claveOrdenacion]);
        }
        else {
          comparisonResult = posterior[claveOrdenacion] - anterior[claveOrdenacion];
        }
        return comparisonResult;
      }
    );
  }

}

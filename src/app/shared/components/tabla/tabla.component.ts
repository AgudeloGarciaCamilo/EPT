import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CabeceraTabla } from 'src/app/models/cabezera-tabla.interface';
import { TablaService } from '../../services/tabla.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit, OnDestroy {

  @Input() cabeceras: CabeceraTabla[] = [];
  @Input() datos$: Observable<any[]> = new Observable();

  private _destructorSuscripciones$: Subject<void> = new Subject();

  public datosMostrados: any[] = [];

  constructor(
    private _tablaService: TablaService
  ) { }

  ngOnInit(): void {
    this.datos$
      .pipe( takeUntil(this._destructorSuscripciones$) )
      .subscribe( (datosRecibidos: any[]) => {
        this.datosMostrados = datosRecibidos;
        this._tablaService.determinarDatosIniciales(datosRecibidos);
      });
  }

  public onCabeceraClickada(cabecera: CabeceraTabla) {
    console.log('CABECERA: ', cabecera);
    if (cabecera.esOrdenable) {
      this.datosMostrados = this._tablaService.ordenarDatos(this.datosMostrados, cabecera.id);
    }
  }

  ngOnDestroy(): void {
    this._destructorSuscripciones$.complete();
    this._destructorSuscripciones$.unsubscribe();
  }
}

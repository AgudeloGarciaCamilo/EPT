import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Filtro } from 'src/app/models/filtro.interface';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit, OnDestroy {

  @Input() filtros: string[] = [];

  @Output() filtroCambiado: EventEmitter<Filtro>;

  private _destructorSuscripciones: Subject<void> = new Subject();
  public formulario: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formulario = this._formBuilder.group({});
    this.filtroCambiado = new EventEmitter();
  }

  ngOnInit(): void {
    this._prepararFormulario();
    this._inicializarSuscripciones();
  }

  private _prepararFormulario(): void {
    this.filtros.forEach( (filtro: string) => {
      this.formulario.addControl(filtro, this._formBuilder.control(false))
    });
  }


  private _inicializarSuscripciones(): void  {
    this.filtros.forEach( (filtro: string) => {
      this.formulario.get(filtro)?.valueChanges.subscribe( (estaSeleccionado: boolean) => {
        const cambio: Filtro = {
          nombre: filtro,
          activo: estaSeleccionado
        };

        this.filtroCambiado.emit(cambio);
      });
    });
  }


  ngOnDestroy(): void {
    this._destructorSuscripciones.complete();
    this._destructorSuscripciones.unsubscribe();
  }
}

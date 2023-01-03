import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { pipe, Subject, takeUntil } from 'rxjs';
import { Filtros } from 'src/app/models/filtros.interface';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit, OnDestroy {

  @Input() filtros: string[] = [];

  @Output() filtrosCambiados: EventEmitter<Filtros>;

  private _destructorSuscripciones$: Subject<void> = new Subject();
  public formulario: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
    this.formulario = this._formBuilder.group({});
    this.filtrosCambiados = new EventEmitter();
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
    this.formulario.valueChanges
      .pipe( takeUntil(this._destructorSuscripciones$) )
      .subscribe( (filtros: Filtros) => {
        this.filtrosCambiados.emit(filtros);
      });
  }

  ngOnDestroy(): void {
    this._destructorSuscripciones$.complete();
    this._destructorSuscripciones$.unsubscribe();
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {

  @Input() placeholder: string = '';
  @Input() labelBoton: string = 'Buscar';

  @Output() inputInsertado: EventEmitter<string>;

  public formulario: FormGroup;


  constructor(
    private _formBuilder: FormBuilder,
  ) {
    this.inputInsertado = new EventEmitter();
    this.formulario = this._formBuilder.group({
      input: ''
    });
  }

  ngOnInit(): void {}

  public onClickBoton() {
    const input: string = this.formulario.get('input')?.value;

    this.inputInsertado.emit(input);
  }
}

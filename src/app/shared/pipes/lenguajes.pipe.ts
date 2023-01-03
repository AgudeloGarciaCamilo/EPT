import { Pipe, PipeTransform } from '@angular/core';
import { LenguajesProgramacion } from 'src/app/models/info-usuario-github.interface';

@Pipe({
  name: 'lenguajes'
})
export class LenguajesPipe implements PipeTransform {

  transform(lenguajes: LenguajesProgramacion, ...args: unknown[]): unknown {
    return Object.keys(lenguajes).join(', ');
  }

}

import { CabeceraTabla } from "src/app/models/cabezera-tabla.interface";

export const PLACEHOLDER_BUSCADOR_USUARIO = 'Buscar usuario en GitHub';
export const LABEL_BOTON_BUSCADOR_USUARIO = 'Buscar';

export const PLACEHOLDER_BUSCADOR_REPOSITORIO = 'Buscar usuario en GitHub';
export const LABEL_BOTON_BUSCADOR_REPOSITORIO = 'Buscar';

export const CABEZERAS_TABLA: CabeceraTabla[] = [
  {
    id: 'nombre',
    valor: 'NOMBRE DEL REPO',
    esOrdenable: true
  },
  {
    id: 'descripcion',
    valor: 'DESCRIPCIÓN',
    esOrdenable: false
  },
  {
    id: 'url',
    valor: 'ENLACE AL REPO',
    esOrdenable: false
  },
  {
    id: 'estrellas',
    valor: 'ESTRELLAS',
    esOrdenable: true
  },
  {
    id: 'lenguajesProgramacion',
    valor: 'LENGUAJES DE PROGRAMACIÓN',
    esOrdenable: true
  }
];

export const CLAVE_FILTRADO_TABLA: string = CABEZERAS_TABLA[0].id;

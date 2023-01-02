export interface UsuarioGitHub {
  nombreUsuario: string;
  urlImagen: string;
  biografia: string;
}

export interface RepositorioGitHub {
  nombre: string;
  descripcion: string | null;
  url: string;
  estrellas: number;
  lenguajesProgramacion: LenguajesProgramacion | null;
}

export interface LenguajesProgramacion {
  [key: string]: number;
}

export interface InfoUsuarioGitHub {
  usuario: UsuarioGitHub;
  repositorios: RepositorioGitHub[];
}

/** URL principal de la API de GitHub, */
const GITHUB_API_URL = 'https://api.github.com';

/**
 * Esta función define el endpoint requerido para obtener la información
 * de un usuario de GitHub.
 * @param usuario String que determina el nombre del usuario.
 * @returns String que determina el endpoint completo para obtener la información del usuario.
 */
export function getGitHubUsuarioEndpoint(usuario: string) {
  return  `${GITHUB_API_URL}/users/${usuario}`;
}

/**
 * Esta función define el endpoint requerido para obtener todos los repositorios
 * asociados a un usuario concreto.
 * @param usuario String que determina el nombre del usuario.
 * @returns String que determina el endpoint completo para obtener los repositorios del usuario.
 */
export function getGitHubRepositoriosPorUsuarioEndpoint(usuario: string) {
  return  `${GITHUB_API_URL}/users/${usuario}/repos`;
}

/**
 * Esta función define el endpoint requerido para obtener todos los lenguajes de programación
 * asociados a un repositorio y un usuario.
 * @param usuario String que determina el nombre del usuario.
 * @param nombreRepo String que determina el nombre del repositorio.
 * @returns String que determina el endpoint de los lenguajes por usuario y repositorio.
 */
export function getGitHubLenguajesPorRepositorio(usuario: string, nombreRepo: string) {
  return  `${GITHUB_API_URL}/repos/${usuario}/${nombreRepo}/languages`;
}

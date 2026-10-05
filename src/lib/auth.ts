// Configuración de autenticación administrativa estática y segura
export const ADMIN_SESSION_COOKIE = "admin_session";
export const ADMIN_SESSION_TOKEN = "caminata_admin_sec_a7f92b4c8e1d35";

export function isValidAdminSession(token: string | undefined | null): boolean {
  return token === ADMIN_SESSION_TOKEN;
}

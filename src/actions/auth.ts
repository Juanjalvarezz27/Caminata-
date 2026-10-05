"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, ADMIN_SESSION_TOKEN } from "@/lib/auth";

export interface AuthState {
  error?: string;
  success?: boolean;
}

export async function loginAction(
  _prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString();

  // Validación de credenciales estáticas requeridas
  if (email === "admin@gmail.com" && password === "1234") {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_TOKEN, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 días de sesión
    });
    redirect("/admin");
  }

  return {
    error: "Credenciales incorrectas. Verifica tu correo y contraseña.",
  };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/login");
}

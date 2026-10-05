"use client";

import { useActionState } from "react";
import { loginAction, type AuthState } from "@/actions/auth";

const initialState: AuthState = {};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {state.error && (
        <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-150">
          <svg className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span className="leading-snug font-medium">{state.error}</span>
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#0F0F11] mb-1.5">
          Correo Electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          autoComplete="email"
          placeholder="admin@gmail.com"
          className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] focus:bg-white border border-[#E2DDD5] focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 text-[#0F0F11] placeholder-[#9E9EA5] focus:outline-none transition-all duration-150 text-sm font-medium shadow-xs"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#0F0F11] mb-1.5">
          Contraseña
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] focus:bg-white border border-[#E2DDD5] focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 text-[#0F0F11] placeholder-[#9E9EA5] focus:outline-none transition-all duration-150 text-sm font-medium shadow-xs"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full py-4 px-6 rounded-xl bg-[#E31B23] hover:bg-[#C4131A] active:scale-[0.99] text-white font-black uppercase tracking-wider text-base shadow-[0_8px_24px_rgba(227,27,35,0.35)] hover:shadow-[0_12px_32px_rgba(227,27,35,0.45)] transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Iniciando sesión...</span>
          </>
        ) : (
          <span>Ingresar al Panel</span>
        )}
      </button>
    </form>
  );
}

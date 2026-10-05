"use client";

import { useTransition } from "react";
import { logoutAction } from "@/actions/auth";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => logoutAction())}
      disabled={isPending}
      className="px-4 py-2 rounded-xl bg-white hover:bg-[#FEF2F2] text-[#DC2626] text-xs font-bold tracking-wider uppercase border border-[#FECACA] hover:border-[#DC2626]/40 transition-all duration-150 flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 disabled:opacity-50"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>{isPending ? "Saliendo..." : "Cerrar sesión"}</span>
    </button>
  );
}

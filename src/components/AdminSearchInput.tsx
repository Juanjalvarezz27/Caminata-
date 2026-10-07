"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface AdminSearchInputProps {
  initialQuery?: string;
}

export default function AdminSearchInput({ initialQuery = "" }: AdminSearchInputProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams.toString());

    // Al buscar se reinicia la paginación a la página 1
    params.delete("page");

    if (trimmed) {
      params.set("q", trimmed);
    } else {
      params.delete("q");
    }

    startTransition(() => {
      const target = params.toString() ? `/admin?${params.toString()}` : "/admin";
      router.push(target);
    });
  };

  const handleClear = () => {
    setQuery("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    params.delete("page");
    startTransition(() => {
      const target = params.toString() ? `/admin?${params.toString()}` : "/admin";
      router.push(target);
    });
  };

  return (
    <form onSubmit={handleSearch} className="w-full sm:w-auto flex items-center gap-2">
      <div className="relative w-full sm:w-80">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8E8E96]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, cédula o dorsal..."
          className="w-full pl-9 pr-8 py-2 text-xs font-semibold rounded-xl bg-[#FAF8F5] border border-[#E5E0D8] text-[#0F0F11] placeholder-[#8E8E96] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#E31B23]/20 focus:border-[#E31B23] transition-all"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            title="Limpiar búsqueda"
            className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#8E8E96] hover:text-[#0F0F11] transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0F0F11] hover:bg-[#2E2E33] disabled:opacity-50 rounded-xl transition-all shadow-xs shrink-0 cursor-pointer flex items-center gap-1.5"
      >
        {isPending ? (
          <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <span>Buscar</span>
        )}
      </button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { registerParticipant, type RegisterState } from "@/actions/participants";
import CustomSelect from "@/components/CustomSelect";

const initialState: RegisterState = {};

const genderOptions = [
  { value: "Femenino", label: "Femenino" },
  { value: "Masculino", label: "Masculino" },
];

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerParticipant, initialState);

  return (
    <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E5E0D8] shadow-[0_16px_40px_rgba(0,0,0,0.07)] overflow-hidden">
      {/* Barra de acento rojo superior del afiche */}
      <div className="h-2 w-full bg-[#E31B23]" />

      <div className="p-7 sm:p-9">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-[#0F0F11] font-headline tracking-tight uppercase">
            Formulario de Registro
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5C64] mt-1 font-medium">
            Ingresa tus datos para asegurar tu cupo y número de participante.
          </p>
        </div>

        {state.success ? (
          <div className="p-7 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0] text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 mx-auto mb-3.5 rounded-full bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#16A34A] shadow-xs">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-[#14532D] font-headline uppercase mb-1.5">
              ¡Inscripción Exitosa!
            </h3>
            <p className="text-sm text-[#166534] font-medium leading-relaxed mb-2">
              {state.message}
            </p>

            {/* Tarjeta de dorsal oficial asignado */}
            {state.dorsal && (
              <div className="my-5 p-4 rounded-2xl bg-white border-2 border-dashed border-[#E31B23]/40 shadow-xs inline-block w-full max-w-xs">
                <span className="text-[11px] font-black uppercase tracking-widest text-[#5C5C64] block mb-1">
                  Tu Dorsal de Participante
                </span>
                <span className="text-4xl sm:text-5xl font-black font-headline tracking-widest text-[#E31B23] font-mono">
                  #{state.dorsal}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-[#0F0F11] bg-white hover:bg-[#F8F6F0] border border-[#D5CFBE] rounded-xl transition duration-150 cursor-pointer shadow-xs"
            >
              Registrar a otro participante
            </button>
          </div>
        ) : (
          <form action={formAction} className="space-y-4 sm:space-y-5">
            {state.error && (
              <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-[#991B1B] text-xs sm:text-sm flex items-start gap-3 animate-in fade-in duration-150">
                <svg className="w-5 h-5 text-[#DC2626] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="leading-snug font-medium">{state.error}</span>
              </div>
            )}

            <div>
              <label htmlFor="nombre" className="block text-xs font-bold uppercase tracking-wider text-[#0F0F11] mb-1.5">
                Nombre Completo *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                placeholder="Ej. Mariana Barreto"
                className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] focus:bg-white border border-[#E2DDD5] focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 text-[#0F0F11] placeholder-[#9E9EA5] focus:outline-none transition-all duration-150 text-sm font-medium shadow-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cedula" className="block text-xs font-bold uppercase tracking-wider text-[#0F0F11] mb-1.5">
                  Cédula de Identidad *
                </label>
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  required
                  placeholder="V-12345678"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] focus:bg-white border border-[#E2DDD5] focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 text-[#0F0F11] placeholder-[#9E9EA5] focus:outline-none transition-all duration-150 text-sm font-medium shadow-xs font-mono"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-xs font-bold uppercase tracking-wider text-[#0F0F11] mb-1.5">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  placeholder="0414-1234567"
                  className="w-full px-4 py-3.5 rounded-xl bg-[#FAF8F5] focus:bg-white border border-[#E2DDD5] focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 text-[#0F0F11] placeholder-[#9E9EA5] focus:outline-none transition-all duration-150 text-sm font-medium shadow-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F0F11] mb-1.5">
                Género *
              </label>
              <CustomSelect
                name="genero"
                required
                options={genderOptions}
                placeholder="Selecciona tu género"
              />
            </div>

            <div className="pt-1">
              <label className="group flex items-start gap-3 cursor-pointer text-xs text-[#4A4A52] leading-relaxed p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F3EFE7] border border-[#E5E0D8] transition-colors">
                <input
                  type="checkbox"
                  name="terminosAceptados"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#D5CFBE] text-[#E31B23] focus:ring-[#E31B23] bg-white cursor-pointer accent-[#E31B23]"
                />
                <span className="font-medium">
                  Acepto las bases legales y eximo de toda responsabilidad a los organizadores por cualquier accidente o eventualidad durante el evento.
                </span>
              </label>
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
                  <span>Procesando registro...</span>
                </>
              ) : (
                <span>Confirmar Registro</span>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

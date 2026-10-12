import React from "react";

export default function ClosedRegistrations() {
  return (
    <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#E5E0D8] shadow-[0_16px_40px_rgba(0,0,0,0.07)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      {/* Barra de acento rojo del evento */}
      <div className="h-2 w-full bg-[#E31B23]" />

      <div className="p-7 sm:p-9 space-y-6">
        {/* Encabezado con estado y badge de cierre */}
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDEBED] border border-[#F9C7CB] text-[#E31B23] text-xs font-black tracking-wider uppercase mb-3.5">
            <span className="w-2 h-2 rounded-full bg-[#E31B23] animate-pulse" />
            Cupos Agotados
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0F0F11] font-headline tracking-tight uppercase leading-tight">
            Inscripciones Cerradas
          </h2>
          <p className="text-xs sm:text-sm text-[#5C5C64] mt-2 font-medium leading-relaxed">
            Hemos alcanzado la capacidad máxima de participantes para la <strong className="text-[#0F0F11]">Caminata 10K por el Día Mundial del Corazón</strong>. Agradecemos a toda la comunidad por su increíble receptividad y compromiso.
          </p>
        </div>

        {/* Bloque informativo para participantes y asistentes */}
        <div className="space-y-3">
          {/* Tarjeta 1: Confirmación de dorsales ya registrados */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#DDD6C8] flex items-center justify-center text-[#E31B23] shrink-0 shadow-2xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold uppercase tracking-wider text-[#0F0F11]">¿Ya te habías inscrito?</p>
              <p className="text-[#5C5C64] font-medium leading-relaxed">
                Tu cupo y número de dorsal asignado se encuentran asegurados en nuestro sistema.
              </p>
            </div>
          </div>

          {/* Tarjeta 2: Recordatorio de cita del evento */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#DDD6C8] flex items-center justify-center text-[#E31B23] shrink-0 shadow-2xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold uppercase tracking-wider text-[#0F0F11]">Día del Evento</p>
              <p className="text-[#5C5C64] font-medium leading-relaxed">
                Sábado 17 de Octubre a las 7:00 AM. Salida: Hospital Dr. José Gregorio Hernández.
              </p>
            </div>
          </div>

          {/* Tarjeta 3: Invitación abierta como espectadores */}
          <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E7E2D8] flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#DDD6C8] flex items-center justify-center text-[#E31B23] shrink-0 shadow-2xs">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="text-xs space-y-0.5">
              <p className="font-bold uppercase tracking-wider text-[#0F0F11]">¡Acompáñanos en la ruta!</p>
              <p className="text-[#5C5C64] font-medium leading-relaxed">
                Todos están invitados a animar el recorrido y disfrutar de los stands y actividades en el estadio.
              </p>
            </div>
          </div>
        </div>

        {/* Mensaje de agradecimiento final */}
        <div className="pt-2 border-t border-[#EAE5DC] text-center">
          <p className="text-xs font-semibold text-[#6E6E77]">
            Organiza: <span className="text-[#0F0F11] font-bold">Dra. Mariana Barreto</span>
          </p>
        </div>
      </div>
    </div>
  );
}

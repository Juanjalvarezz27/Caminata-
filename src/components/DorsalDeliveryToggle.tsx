"use client";

import { useState, useTransition } from "react";
import { toggleDorsalEntrega } from "@/actions/participants";

interface DorsalDeliveryToggleProps {
  participantId: string;
  initialEntregado: boolean;
  participantName: string;
  compact?: boolean;
}

export default function DorsalDeliveryToggle({
  participantId,
  initialEntregado,
  participantName,
  compact = false,
}: DorsalDeliveryToggleProps) {
  const [entregado, setEntregado] = useState(initialEntregado);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const nextState = !entregado;
    // Actualización visual inmediata para agilizar la entrega en mesa
    setEntregado(nextState);

    startTransition(async () => {
      const res = await toggleDorsalEntrega(participantId, nextState);
      if (!res.success) {
        // Revierte el estado en caso de error en el servidor
        setEntregado(!nextState);
        alert(res.error || "No se pudo actualizar el estado de entrega.");
      }
    });
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        title={
          entregado
            ? `Dorsal entregado a ${participantName}. Clic para cambiar a no entregado.`
            : `Pendiente de entrega a ${participantName}. Clic para marcar entregado.`
        }
        className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shadow-2xs cursor-pointer select-none disabled:opacity-70 ${
          entregado
            ? "bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
            : "bg-[#FAF8F5] text-[#6E6961] border-[#E2DBD0] hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300"
        }`}
      >
        {isPending ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : entregado ? (
          <svg className="w-3.5 h-3.5 text-emerald-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
        )}
        <span>{entregado ? "Entregado" : "No entregado"}</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-[#F0ECE4]">
      <div className="flex items-center gap-2">
        <span
          className={`w-2.5 h-2.5 rounded-full shrink-0 ${
            entregado ? "bg-emerald-500 ring-4 ring-emerald-100" : "bg-amber-400 ring-4 ring-amber-100"
          }`}
        />
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E96]">
            Estado del dorsal
          </span>
          <span
            className={`text-xs font-black ${
              entregado ? "text-emerald-700" : "text-amber-700"
            }`}
          >
            {entregado ? "Entregado" : "No entregado"}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleToggle}
        disabled={isPending}
        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer select-none disabled:opacity-60 ${
          entregado
            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200"
            : "bg-[#0F0F11] text-white hover:bg-[#E31B23] border border-[#0F0F11]"
        }`}
      >
        {isPending ? (
          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
        ) : entregado ? (
          <>
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Desmarcar</span>
          </>
        ) : (
          <>
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Entregar</span>
          </>
        )}
      </button>
    </div>
  );
}

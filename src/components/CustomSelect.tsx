"use client";

import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  name: string;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}

export default function CustomSelect({
  name,
  options,
  placeholder = "Selecciona una opción",
  required = false,
  defaultValue = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string>(defaultValue);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLabel = options.find((opt) => opt.value === selected)?.label;

  // Cierra el menú al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Campo oculto que mantiene la compatibilidad con el FormData del servidor */}
      <input type="hidden" name={name} value={selected} required={required} />

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full px-4 py-3.5 rounded-xl bg-white hover:bg-[#FAFAF8] border border-[#E2DDD5] focus:border-[#E31B23] focus:ring-4 focus:ring-[#E31B23]/10 text-left transition-all duration-200 flex items-center justify-between text-sm shadow-xs cursor-pointer group"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={selected ? "text-[#0F0F11] font-semibold" : "text-[#8E8E96]"}>
          {selectedLabel || placeholder}
        </span>
        <div className="w-6 h-6 rounded-full bg-[#F5F2EB] group-hover:bg-[#ECE7DC] flex items-center justify-center text-[#5C5C64] group-hover:text-[#0F0F11] transition-colors">
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? "rotate-180 text-[#E31B23]" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Menú desplegable flotante */}
      {isOpen && (
        <div className="absolute z-50 left-0 right-0 mt-2 p-1.5 rounded-2xl bg-white border border-[#E2DDD5] shadow-[0_16px_36px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-150 space-y-1">
          {options.map((option) => {
            const isSelected = option.value === selected;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-sm flex items-center justify-between transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? "bg-[#FDEBED] text-[#E31B23] font-bold"
                    : "text-[#2A2A30] hover:bg-[#F8F6F0] hover:text-[#0F0F11]"
                }`}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <svg
                    className="w-4 h-4 text-[#E31B23]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

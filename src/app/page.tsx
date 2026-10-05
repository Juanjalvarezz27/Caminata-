import Link from "next/link";
import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-transparent text-[#0F0F11] selection:bg-[#E31B23] selection:text-white">
      {/* Barra de navegación superior en blanco limpio y minimalista */}
      <header className="sticky top-0 z-50 border-b border-[#E5E0D8] bg-white shadow-xs transition-all">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            {/* Ícono de corazón temático */}
            <svg className="w-4 h-4 text-[#E31B23] fill-current shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <span className="font-black text-sm sm:text-base font-headline uppercase tracking-tight text-[#0F0F11]">
              Caminata 10K
            </span>
            <span className="hidden sm:inline-block text-[#D0C9BD] text-xs font-light">|</span>
            <span className="hidden sm:inline-block text-xs font-semibold text-[#5C5C64] uppercase tracking-wider">
              Día del Corazón
            </span>
          </Link>

          <Link
            href="/admin"
            className="text-xs font-bold uppercase tracking-wider text-[#3A3A40] hover:text-[#0F0F11] px-3.5 py-1.5 rounded-full border border-[#0F0F11]/15 hover:border-[#0F0F11]/35 hover:bg-white/60 transition-all flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5 text-[#5C5C64]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Acceso Admin</span>
          </Link>
        </div>
      </header>

      {/* Contenedor Principal */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Columna Izquierda: Réplica y estilo visual del afiche oficial */}
          <section className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Título Principal estilo afiche */}
            <div className="space-y-1 w-full">
              <p className="text-2xl sm:text-4xl font-black font-headline tracking-tight text-[#0F0F11] uppercase leading-none">
                Día Mundial del
              </p>
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black font-headline tracking-tighter text-[#0F0F11] uppercase leading-[0.9]">
                Corazón
              </h1>
              
              <div className="pt-2">
                <p className="text-base sm:text-lg font-bold text-[#2E2E33] tracking-tight">
                  Organiza: <span className="font-extrabold text-[#0F0F11]">Dra. Mariana Barreto</span>
                </p>
                {/* Línea roja decorativa del afiche */}
                <div className="w-24 h-1 bg-[#E31B23] mx-auto lg:mx-0 rounded-full mt-2.5" />
              </div>
            </div>

            {/* Subtítulo Caminata 10K */}
            <div className="w-full pt-2">
              <p className="text-2xl sm:text-3xl font-black font-headline uppercase tracking-tight text-[#0F0F11] leading-none">
                Caminata
              </p>
              <p className="text-7xl sm:text-8xl lg:text-9xl font-black font-headline italic tracking-tighter text-[#E31B23] leading-[0.85] select-none">
                10K
              </p>
            </div>

            {/* Ilustración oficial: Atleta y corazón integrados orgánicamente sin marco */}
            <div className="relative w-full max-w-sm sm:max-w-md my-2 aspect-[516/437] mx-auto lg:mx-0">
              <Image
                src="/hero-runner-transparent.png"
                alt="Caminata 10K por el Día Mundial del Corazón"
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Datos del evento estilo afiche */}
            <div className="w-full space-y-4 pt-2">
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E5E0D8] shadow-xs">
                <p className="text-xl sm:text-2xl lg:text-3xl font-black font-headline text-[#0F0F11] uppercase tracking-tight">
                  Sábado 17 Octubre <span className="text-[#E31B23]">|</span> 7:00 AM
                </p>
                <div className="mt-2 text-sm sm:text-base font-semibold text-[#4A4A52] space-y-0.5">
                  <p>Salida: Hospital Dr. José Gregorio Hernández</p>
                  <p>Llegada: Estadio</p>
                </div>
              </div>

              {/* Pilares destacados del afiche con separadores en línea roja */}
              <div className="flex items-center justify-around py-3.5 px-4 rounded-xl bg-white border border-[#E5E0D8] text-xs sm:text-sm font-black font-headline tracking-widest text-[#0F0F11] uppercase shadow-xs">
                <span className="flex-1 text-center">Premios</span>
                <div className="w-[1.5px] h-4 bg-[#E31B23] rounded-full" />
                <span className="flex-1 text-center">Stands</span>
                <div className="w-[1.5px] h-4 bg-[#E31B23] rounded-full" />
                <span className="flex-1 text-center">Sorpresas</span>
              </div>
            </div>

          </section>

          {/* Columna Derecha: Formulario de Registro */}
          <section className="lg:col-span-5 flex justify-center w-full sticky lg:top-24">
            <RegisterForm />
          </section>

        </div>
      </div>

      {/* Pie de página en blanco limpio, minimalista y combinado */}
      <footer className="mt-14 sm:mt-20 border-t border-[#E5E0D8] bg-white py-10 text-center shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-2.5">
          <div className="w-8 h-0.5 bg-[#E31B23] mx-auto rounded-full" />
          <p className="font-black font-headline text-xs sm:text-sm uppercase tracking-widest text-[#0F0F11]">
            Caminata 10K • Día Mundial del Corazón
          </p>
          <p className="text-xs text-[#5C5C64] font-medium">
            Organiza: <span className="font-bold text-[#0F0F11]">Dra. Mariana Barreto</span> • Sábado 17 de Octubre, 7:00 AM
          </p>
          <p className="text-[11px] text-[#8A8A92] pt-1">
            Salida: Hospital Dr. José Gregorio Hernández — Llegada: Estadio
          </p>
        </div>
      </footer>
    </main>
  );
}

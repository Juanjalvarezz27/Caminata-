import Link from "next/link";
import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-transparent text-[#0F0F11] flex items-center justify-center p-4 selection:bg-[#E31B23] selection:text-white">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#E5E0D8] shadow-[0_16px_40px_rgba(0,0,0,0.06)] overflow-hidden">
        {/* Barra roja superior */}
        <div className="h-2 w-full bg-[#E31B23]" />

        <div className="p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto mb-3.5 rounded-2xl bg-[#FDEBED] border border-[#FCD5D8] flex items-center justify-center text-[#E31B23]">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-headline text-[#0F0F11] uppercase tracking-tight">
              Acceso Administrativo
            </h1>
            <p className="text-xs text-[#5C5C64] mt-1 font-medium">
              Panel exclusivo de control y organizadores
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-6 border-t border-[#EFECE6] text-center">
            <Link
              href="/"
              className="text-xs font-bold text-[#5C5C64] hover:text-[#0F0F11] transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4 text-[#E31B23]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Volver a la página principal</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import LogoutButton from "@/components/LogoutButton";
import AdminSearchInput from "@/components/AdminSearchInput";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

interface AdminPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminDashboardPage({ searchParams }: AdminPageProps) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidAdminSession(sessionToken)) {
    redirect("/login");
  }

  // Paginación optimizada de 15 en 15 participantes
  const resolvedSearchParams = await searchParams;
  const pageParam = typeof resolvedSearchParams.page === "string" ? resolvedSearchParams.page : "1";
  const parsedPage = parseInt(pageParam, 10);
  const requestedPage = isNaN(parsedPage) || parsedPage < 1 ? 1 : parsedPage;
  const pageSize = 15;

  // Filtro de búsqueda por nombre, cédula o número de dorsal
  const searchQuery = typeof resolvedSearchParams.q === "string" ? resolvedSearchParams.q.trim() : "";
  const whereFilter: Prisma.ParticipantWhereInput = searchQuery
    ? {
        OR: [
          { nombre: { contains: searchQuery, mode: "insensitive" } },
          { cedula: { contains: searchQuery, mode: "insensitive" } },
          { dorsal: { contains: searchQuery, mode: "insensitive" } },
        ],
      }
    : {};

  // Ejecuta en paralelo métricas globales, conteo filtrado y registros paginados
  const [genderGroups, filteredCount, participants] = await Promise.all([
    prisma.participant.groupBy({
      by: ["genero"],
      _count: { _all: true },
    }),
    prisma.participant.count({
      where: whereFilter,
    }),
    prisma.participant.findMany({
      where: whereFilter,
      orderBy: { createdAt: "desc" },
      skip: (requestedPage - 1) * pageSize,
      take: pageSize,
      select: {
        id: true,
        dorsal: true,
        nombre: true,
        cedula: true,
        telefono: true,
        genero: true,
        terminosAceptados: true,
        createdAt: true,
      },
    }),
  ]);

  let femaleCount = 0;
  let maleCount = 0;
  let totalParticipants = 0;

  for (const group of genderGroups) {
    if (group.genero === "Femenino") femaleCount = group._count._all;
    if (group.genero === "Masculino") maleCount = group._count._all;
    totalParticipants += group._count._all;
  }

  const totalPages = Math.max(1, Math.ceil(filteredCount / pageSize));
  const currentPage = Math.min(requestedPage, totalPages);

  // Helper para generar URLs de paginación preservando el filtro de búsqueda
  const buildPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    if (searchQuery) {
      params.set("q", searchQuery);
    }
    return `/admin?${params.toString()}`;
  };

  return (
    <main className="min-h-screen bg-transparent text-[#0F0F11] pb-16 selection:bg-[#E31B23] selection:text-white">
      {/* Header del Dashboard en blanco limpio y minimalista */}
      <header className="sticky top-0 z-50 border-b border-[#E5E0D8] bg-white shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 group"
              title="Volver a la página principal"
            >
              {/* Ícono de corazón temático */}
              <svg className="w-4 h-4 text-[#E31B23] fill-current shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <span className="font-black text-sm sm:text-base font-headline uppercase tracking-tight text-[#0F0F11]">
                Panel de Control
              </span>
              <span className="hidden sm:inline-block text-[#D0C9BD] text-xs font-light">|</span>
              <span className="hidden sm:inline-block text-xs font-semibold text-[#5C5C64] uppercase tracking-wider">
                Dra. Mariana Barreto
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#4A4A52] hover:text-[#0F0F11] px-3.5 py-1.5 rounded-full border border-[#0F0F11]/15 hover:border-[#0F0F11]/35 hover:bg-white/60 transition-all"
            >
              <span>Ver sitio web ↗</span>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Tarjetas de Estadísticas */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          
          {/* Card 1: Total */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs relative overflow-hidden">
            <div className="h-1.5 w-full bg-[#E31B23] absolute top-0 left-0" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C5C64]">Total Inscritos</span>
              <div className="w-8 h-8 rounded-xl bg-[#FDEBED] text-[#E31B23] flex items-center justify-center">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                </svg>
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-headline text-[#0F0F11] tracking-tight">{totalParticipants}</span>
              <span className="text-xs font-bold text-[#5C5C64] uppercase">personas</span>
            </div>
          </div>

          {/* Card 2: Femenino */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs relative overflow-hidden">
            <div className="h-1.5 w-full bg-[#EC4899] absolute top-0 left-0" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C5C64]">Femenino</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FDF2F8] text-[#BE185D] border border-[#FCE7F3]">
                {totalParticipants > 0 ? `${Math.round((femaleCount / totalParticipants) * 100)}%` : "0%"}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-headline text-[#0F0F11] tracking-tight">{femaleCount}</span>
              <span className="text-xs font-bold text-[#5C5C64] uppercase">participantes</span>
            </div>
          </div>

          {/* Card 3: Masculino */}
          <div className="p-6 rounded-3xl bg-white border border-[#E5E0D8] shadow-xs relative overflow-hidden">
            <div className="h-1.5 w-full bg-[#3B82F6] absolute top-0 left-0" />
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#5C5C64]">Masculino</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]">
                {totalParticipants > 0 ? `${Math.round((maleCount / totalParticipants) * 100)}%` : "0%"}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black font-headline text-[#0F0F11] tracking-tight">{maleCount}</span>
              <span className="text-xs font-bold text-[#5C5C64] uppercase">participantes</span>
            </div>
          </div>

        </section>

        {/* Tabla de Participantes */}
        <section className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xs overflow-hidden">
          <div className="px-7 py-5 border-b border-[#EFECE6] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-black font-headline text-[#0F0F11] uppercase tracking-tight flex items-center gap-2.5">
                <span>{searchQuery ? "Resultados de Búsqueda" : "Participantes Registrados"}</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-[#E31B23] text-white">
                  {searchQuery ? filteredCount : totalParticipants}
                </span>
              </h2>
              <p className="text-xs text-[#5C5C64] mt-0.5 font-medium">
                {searchQuery
                  ? `Mostrando coincidencias para "${searchQuery}" • 15 por página`
                  : "15 participantes por página"}
              </p>
            </div>

            {/* Buscador de participantes por nombre, cédula o dorsal */}
            <AdminSearchInput initialQuery={searchQuery} key={searchQuery} />
          </div>

          {participants.length === 0 ? (
            /* Estado vacío compartido */
            <div className="px-7 py-16 text-center text-[#8E8E96]">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF8F5] border border-[#E5E0D8] flex items-center justify-center text-[#8E8E96]">
                {searchQuery ? (
                  <svg className="w-6 h-6 text-[#8E8E96]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                )}
              </div>
              <p className="text-base font-bold text-[#0F0F11]">
                {searchQuery ? "No se encontraron resultados" : "No hay participantes registrados todavía"}
              </p>
              <p className="text-xs text-[#5C5C64] mt-1 max-w-sm mx-auto">
                {searchQuery
                  ? `No se hallaron registros que coincidan con "${searchQuery}". Verifica el nombre, cédula o número de dorsal.`
                  : "Los nuevos registros completados en la página aparecerán aquí de forma inmediata."}
              </p>
              {searchQuery && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0F0F11] bg-white hover:bg-[#FAF8F5] border border-[#E5E0D8] rounded-xl transition-all shadow-xs"
                >
                  <span>Ver todos los inscritos</span>
                </Link>
              )}
            </div>
          ) : (
            <>
              {/* Vista Desktop: Tabla tradicional con todos los campos */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left text-sm text-[#0F0F11]">
                  <thead className="bg-[#FAF8F5] text-[11px] uppercase tracking-wider text-[#5C5C64] font-bold border-b border-[#EFECE6]">
                    <tr>
                      <th scope="col" className="px-6 py-4">Dorsal</th>
                      <th scope="col" className="px-7 py-4">Nombre Completo</th>
                      <th scope="col" className="px-6 py-4">Cédula</th>
                      <th scope="col" className="px-6 py-4">Teléfono</th>
                      <th scope="col" className="px-6 py-4">Género</th>
                      <th scope="col" className="px-6 py-4">Fecha de Registro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EFECE6] font-medium">
                    {participants.map((p) => (
                      <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#FDEBED] text-[#E31B23] border border-[#FCD5D8] font-mono text-xs font-black tracking-wider">
                            #{p.dorsal}
                          </span>
                        </td>
                        <td className="px-7 py-4 font-bold text-[#0F0F11] whitespace-nowrap">
                          {p.nombre}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-xs text-[#4A4A52]">
                          <span className="px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E5E0D8]">
                            {p.cedula}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-[#4A4A52] text-xs">
                          {p.telefono}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                            p.genero === "Femenino"
                              ? "bg-[#FDF2F8] text-[#BE185D] border border-[#FCE7F3]"
                              : "bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]"
                          }`}>
                            {p.genero}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-xs text-[#5C5C64]">
                          {new Intl.DateTimeFormat("es-VE", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          }).format(p.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Vista Mobile: Cards individuales ordenadas con todos los datos */}
              <div className="block md:hidden p-4 space-y-3 bg-[#FAF8F5]/30">
                {participants.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 rounded-2xl bg-white border border-[#E5E0D8] shadow-xs space-y-3 transition-all hover:border-[#E31B23]/30"
                  >
                    {/* Encabezado: Nombre del participante y Badge de Dorsal */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#8E8E96] block">
                          Participante
                        </span>
                        <h3 className="text-base font-extrabold text-[#0F0F11] font-headline tracking-tight truncate">
                          {p.nombre}
                        </h3>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#FDEBED] text-[#E31B23] border border-[#FCD5D8] font-mono text-xs font-black tracking-wider shrink-0 shadow-2xs">
                        #{p.dorsal}
                      </span>
                    </div>

                    {/* Grilla 2x2 con todos los datos del participante */}
                    <div className="grid grid-cols-2 gap-2.5 pt-2.5 border-t border-[#F0ECE4] text-xs">
                      {/* Cédula */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E96] block">
                          Cédula
                        </span>
                        <span className="font-mono text-xs font-bold text-[#2E2E33] bg-[#FAF8F5] px-2 py-0.5 rounded border border-[#E5E0D8] inline-block">
                          {p.cedula}
                        </span>
                      </div>

                      {/* Teléfono */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E96] block">
                          Teléfono
                        </span>
                        <a
                          href={`tel:${p.telefono}`}
                          className="font-semibold text-[#0F0F11] hover:text-[#E31B23] transition-colors block truncate"
                        >
                          {p.telefono}
                        </a>
                      </div>

                      {/* Género */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E96] block">
                          Género
                        </span>
                        <div>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              p.genero === "Femenino"
                                ? "bg-[#FDF2F8] text-[#BE185D] border border-[#FCE7F3]"
                                : "bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]"
                            }`}
                          >
                            {p.genero}
                          </span>
                        </div>
                      </div>

                      {/* Fecha de Registro */}
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8E8E96] block">
                          Registro
                        </span>
                        <span className="text-[11px] font-semibold text-[#5C5C64] block">
                          {new Intl.DateTimeFormat("es-VE", {
                            dateStyle: "short",
                            timeStyle: "short",
                          }).format(p.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Barra de Paginación */}
              {totalPages > 1 && (
                <div className="px-4 sm:px-7 py-4 border-t border-[#EFECE6] bg-[#FAF8F5]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Resumen de participantes mostrados */}
                  <p className="text-xs font-semibold text-[#5C5C64] text-center sm:text-left">
                    Mostrando del{" "}
                    <span className="font-extrabold text-[#0F0F11]">
                      {(currentPage - 1) * pageSize + 1}
                    </span>{" "}
                    al{" "}
                    <span className="font-extrabold text-[#0F0F11]">
                      {Math.min(currentPage * pageSize, filteredCount)}
                    </span>{" "}
                    de{" "}
                    <span className="font-extrabold text-[#0F0F11]">
                      {filteredCount}
                    </span>{" "}
                    {searchQuery ? "resultados" : "inscritos"}
                  </p>

                  {/* Controles de navegación de página */}
                  <div className="flex items-center gap-1.5">
                    {/* Botón Anterior */}
                    {currentPage > 1 ? (
                      <Link
                        href={buildPageUrl(currentPage - 1)}
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#0F0F11] bg-white hover:bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D5CFBE] rounded-xl transition-all shadow-xs flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Anterior</span>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#A09D96] bg-white/50 border border-[#E5E0D8]/60 rounded-xl cursor-not-allowed opacity-60 flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Anterior</span>
                      </button>
                    )}

                    {/* Números de página interactivos en Desktop */}
                    <div className="hidden sm:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter((p) => {
                          return (
                            p === 1 ||
                            p === totalPages ||
                            Math.abs(p - currentPage) <= 1
                          );
                        })
                        .map((p, index, filteredPages) => {
                          const prevPage = filteredPages[index - 1];
                          const showEllipsis = prevPage && p - prevPage > 1;

                          return (
                            <div key={p} className="flex items-center">
                              {showEllipsis && (
                                <span className="px-1.5 text-xs text-[#8E8E96] font-bold select-none">
                                  ...
                                </span>
                              )}
                              <Link
                                href={buildPageUrl(p)}
                                className={`w-8 h-8 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                                  p === currentPage
                                    ? "bg-[#E31B23] text-white shadow-xs font-black"
                                    : "bg-white text-[#2E2E33] border border-[#E5E0D8] hover:bg-[#FAF8F5] hover:border-[#D5CFBE]"
                                }`}
                              >
                                {p}
                              </Link>
                            </div>
                          );
                        })}
                    </div>

                    {/* Indicador de página en Mobile */}
                    <div className="sm:hidden px-2 text-xs font-bold text-[#5C5C64]">
                      Pág. {currentPage} / {totalPages}
                    </div>

                    {/* Botón Siguiente */}
                    {currentPage < totalPages ? (
                      <Link
                        href={buildPageUrl(currentPage + 1)}
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#0F0F11] bg-white hover:bg-[#FAF8F5] border border-[#E5E0D8] hover:border-[#D5CFBE] rounded-xl transition-all shadow-xs flex items-center gap-1"
                      >
                        <span>Siguiente</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-[#A09D96] bg-white/50 border border-[#E5E0D8]/60 rounded-xl cursor-not-allowed opacity-60 flex items-center gap-1"
                      >
                        <span>Siguiente</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </main>
  );
}

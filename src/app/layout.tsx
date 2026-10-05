import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Caminata 10K - Día Mundial del Corazón | Dra. Mariana Barreto",
  description: "Registro oficial para la Caminata 10K por el Día Mundial del Corazón organizada por la Dra. Mariana Barreto.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full">
      <body className="min-h-full flex flex-col text-[#0F0F11] antialiased">
        {children}
      </body>
    </html>
  );
}

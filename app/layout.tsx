
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soulcial | Amistades que empiezan en común",
  description:
    "Conoce personas con tus mismos gustos, encuentra tu comunidad y haz nuevas amistades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}

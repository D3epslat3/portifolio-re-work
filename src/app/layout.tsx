// app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/Navbar'));
const Footer = dynamic(() => import('@/components/Footer'));

export const metadata: Metadata = {
  title: "Deepslate | Creative Developer",
  description: "Desenvolvedor Front-End especializado em experiências web modernas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${GeistSans.className} scroll-smooth`}>
     <head>
        <link rel="icon" href="/deep_logo.svg" />
      </head>
      <body className="bg-neutral-950 antialiased">
        <Navbar />
        <main className="overflow-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

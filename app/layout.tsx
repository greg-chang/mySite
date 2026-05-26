import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Greg Chang",
  description: "Greg Chang — curious builder, open to new adventures. Personal portfolio with experience, projects, and contact.",
  keywords: ["Greg Chang", "Greg", "portfolio", "software engineer", "product"],
  authors: [{ name: "Greg Chang" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
  },
  openGraph: {
    title: "Greg Chang",
    description: "Greg Chang — curious builder, open to new adventures.",
    url: "https://greg-chang.com",
    siteName: "Greg Chang",
    locale: "en_US",
    type: "website",
    images: [{ url: "https://greg-chang.com/Logo.svg", alt: "Greg Chang" }],
  },
  twitter: {
    card: "summary",
    title: "Greg Chang",
    description: "Greg Chang — curious builder, open to new adventures.",
    images: ["https://greg-chang.com/Logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="preload" href="/Pictures/GregWave.png" as="image" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Greg Chang",
            url: "https://greg-chang.com",
            sameAs: [
              "https://www.linkedin.com/in/gregjchang",
              "https://www.instagram.com/greg_chang_/",
            ],
            email: "changjgreg@gmail.com",
          }),
        }}
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

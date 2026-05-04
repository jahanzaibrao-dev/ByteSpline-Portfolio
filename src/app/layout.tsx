import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteContent } from "@/content/site";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteContent.meta.url}/#organization`,
      name: "ByteSpline Tech",
      url: siteContent.meta.url,
      email: siteContent.contact.email,
      description:
        "ByteSpline Tech builds modern websites, web apps, SaaS MVPs, AI integrations, and animated digital experiences.",
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": `${siteContent.meta.url}/#website`,
      name: "ByteSpline Tech",
      url: siteContent.meta.url,
      publisher: {
        "@id": `${siteContent.meta.url}/#organization`,
      },
    },
  ],
};

export const metadata: Metadata = {
  title: siteContent.meta.title,
  description: siteContent.meta.description,
  keywords: siteContent.meta.keywords,
  metadataBase: new URL(siteContent.meta.url),
  openGraph: {
    title: siteContent.meta.title,
    description: siteContent.meta.description,
    url: siteContent.meta.url,
    siteName: "ByteSpline Tech",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "ByteSpline Tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteContent.meta.title,
    description: siteContent.meta.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${urbanist.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}

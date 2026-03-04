import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HOPLA studio",
  description:
    "Stalowe meble o architektonicznej klarowności. Rzeszów, Polska.",
  keywords: [
    "meble stalowe",
    "HOPLA studio",
    "architektura",
    "minimalizm",
    "Rzeszów",
    "projektowanie",
    "stal nierdzewna",
    "rzemiosło",
    "kolekcja mebli",
  ],
  openGraph: {
    title: "HOPLA studio",
    description:
      "Stalowe meble o architektonicznej klarowności. Rzeszów, Polska.",
    type: "website",
    locale: "pl_PL",
    url: "https://hoplastudio.cc/",
    siteName: "HOPLA studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOPLA studio",
    description:
      "Stalowe meble o architektonicznej klarowności. Rzeszów, Polska.",
  },
  metadataBase: new URL("https://hoplastudio.cc/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pl'>
      <head>
        <meta charSet='UTF-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='preconnect' href='https://fonts.cdnfonts.com' />
        <link
          href='https://fonts.cdnfonts.com/css/neue-haas-grotesk-display-pro'
          rel='stylesheet'
        />
      </head>
      <body className='font-grotesk antialiased bg-bg text-ink'>
        {children}
      </body>
    </html>
  );
}

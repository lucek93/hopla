import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hopla.studio",
  description:
    "Stalowe meble o architektonicznej klarowności. Warszawa, Polska.",
  keywords: [
    "meble stalowe",
    "hopla studio",
    "architektura",
    "minimalizm",
    "warszawa",
    "projektowanie",
    "stal nierdzewna",
    "rzemiosło",
    "kolekcja mebli",
  ],
  openGraph: {
    title: "Hopla.studio",
    description:
      "Stalowe meble o architektonicznej klarowności. Warszawa, Polska.",
    type: "website",
    locale: "pl_PL",
    url: "https://hopla.studio/",
    siteName: "Hopla.studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hopla.studio",
    description:
      "Stalowe meble o architektonicznej klarowności. Warszawa, Polska.",
  },
  metadataBase: new URL("https://hopla.studio/"),
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

"use client";

import Link from "next/link";

const COLS = [
  {
    title: "Studio",
    links: [
      { label: "Kolekcja", href: "/#kolekcja" },
      // { label: "Realizacje", href: "/realizacje" },
      { label: "O marce", href: "/o-marce" },
      { label: "Dla architektów", href: "/#architekci" },
    ],
  },
  {
    title: "Informacje",
    links: [
      { label: "Zamówienia i realizacja", href: "/zamowienia-i-realizacja" },
      { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      {
        label: "hello@hopla.studio",
        href: "mailto:hello@hopla.studio",
      },
      {
        label: "+48 792 174 420",
        href: "tel:+48792174420",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/hopla.studioo/",
        openInNewTab: true,
      },
    ],
  },
];

interface SiteFooterProps {
  onContact?: () => void;
  id?: string;
  mobileBottomPadding?: boolean;
}

export function SiteFooter({
  onContact,
  id,
  mobileBottomPadding,
}: SiteFooterProps) {
  return (
    <footer
      id={id}
      className={`pt-16 px-10 pb-10 bg-[#f4f3f0] max-[900px]:px-6 max-[900px]:pt-12 ${
        mobileBottomPadding ? "max-[900px]:pb-32" : "max-[900px]:pb-8"
      }`}
    >
      {/* Columns */}
      <div className='grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[rgba(26,25,22,0.12)] mb-8 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 max-[900px]:gap-8'>
        {/* Brand */}
        <div>
          <Link
            href='/'
            className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] block mb-4 no-underline'
          >
            Hopla <span className='text-[10px] font-normal'>studio</span>
          </Link>
          <p className='text-[12px] font-normal leading-[1.8] text-[#6b6963]'>
            Minimalistyczne obiekty stalowe.
            <br />
            Projektowane i produkowane w Polsce.
          </p>
          {/* {onContact && (
            <button
              onClick={onContact}
              className='mt-6 inline-flex items-center gap-2 text-[11px] font-normal tracking-[0.09em] uppercase text-[#f4f3f0] bg-[#1a1916] px-5 py-2.5 cursor-pointer hover:opacity-75 transition-opacity duration-200'
            >
              Napisz do nas
            </button>
          )} */}
        </div>

        {/* Nav columns */}
        {COLS.map((col) => (
          <div key={col.title}>
            <span className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#6b6963] mb-5 block'>
              {col.title}
            </span>
            {col.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.openInNewTab ? "_blank" : undefined}
                rel={link.openInNewTab ? "noopener noreferrer" : undefined}
                className='block text-[13px] font-normal text-[#1a1916] no-underline leading-[2.3] transition-colors duration-[180ms] hover:text-[#6b6963]'
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className='flex justify-between items-center max-[600px]:flex-col max-[600px]:items-start max-[600px]:gap-2'>
        <span className='text-[11px] font-normal text-[#6b6963] tracking-[0.04em]'>
          © 2026 <span className='uppercase'>Hopla</span>{" "}
          <span className='text-[9px] font-normal uppercase'>studio</span>.
          Wszelkie prawa zastrzeżone.
        </span>
        <span className='text-[11px] font-normal text-[#6b6963] tracking-[0.04em]'>
          Rzeszów, Polska
        </span>
      </div>
    </footer>
  );
}

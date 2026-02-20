"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback } from "react";

const PILLS = [
  "Inżynieryjna precyzja",
  "Minimalistyczna geometria",
  "Autentyczność materiału",
  "Ponadczasowa trwałość",
  "Lokalne rzemiosło",
];

const COLLECTION = [
  { n: 1, name: "Plane 01", cat: "Stolik kawowy" },
  { n: 2, name: "Arc 01", cat: "Siedzisko" },
  { n: 3, name: "Block 01", cat: "Krzesło" },
  { n: 4, name: "Grid 01", cat: "System półek" },
];

const PRINCIPLES = [
  {
    num: "01",
    name: "Inżynieryjna precyzja",
    desc: "Wieloletnie doświadczenie w pracy ze stalą przekłada się na dokładność do milimetra.",
  },
  {
    num: "02",
    name: "Minimalistyczna geometria",
    desc: "Każda forma jest zredukowana do absolutnego minimum. Bez ozdobników.",
  },
  {
    num: "03",
    name: "Autentyczność materiału",
    desc: "Stal szczotkowana eksponowana zgodnie z jej naturą — bez lakierów, szczerze.",
  },
  {
    num: "04",
    name: "Ponadczasowa trwałość",
    desc: "Projektujemy poza trendami. Nasze obiekty pięknieją i szlachetnieją z czasem.",
  },
  {
    num: "05",
    name: "Lokalne rzemiosło",
    desc: "Każdy element jest cięty laserowo, gięty i wykańczany z najwyższą precyzją w Polsce.",
  },
];

const MAT_SPECS = [
  { k: "Materiał", v: "Stal nierdzewna 304" },
  { k: "Wykończenie", v: "Szczotkowane, satynowe" },
  { k: "Technologia", v: "Cięcie laserowe, CNC" },
  { k: "Czas realizacji", v: "4–8 tygodni" },
  { k: "Produkcja", v: "Polska" },
];

const FOOTER_COLS = [
  {
    title: "Kolekcja",
    links: [
      { label: "Stoliki kawowe", href: "#kolekcja" },
      { label: "Siedziska", href: "#kolekcja" },
      { label: "Krzesła", href: "#kolekcja" },
      { label: "Systemy półek", href: "#kolekcja" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "O marce", href: "/o-marce" },
      { label: "Materiał", href: "#material" },
      { label: "Dla architektów", href: "#architekci" },
    ],
  },
  {
    title: "Kontakt",
    links: [
      { label: "hello@hopla.studio", href: "mailto:hello@hopla.studio" },
      { label: "Instagram", href: "#" },
    ],
  },
];

export default function Home() {
  const [scrollPct, setScrollPct] = useState(0);
  const [cursor, setCursor] = useState({
    x: -200,
    y: -200,
    hov: false,
    out: false,
  });
  const heroImgRef = useRef<HTMLDivElement>(null);
  const archMagnetRef = useRef<HTMLAnchorElement>(null);

  // Scroll progress bar + hero parallax
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct(
        Math.min(
          (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100,
          100,
        ),
      );
      if (heroImgRef.current && window.scrollY < window.innerHeight * 1.5) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.12}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Custom cursor dot
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setCursor((c) => ({ ...c, x: e.clientX, y: e.clientY, out: false }));
    const onLeave = () => setCursor((c) => ({ ...c, out: true }));
    const onEnter = () => setCursor((c) => ({ ...c, out: false }));
    document.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  // Hover-expand cursor on interactive elements
  useEffect(() => {
    const hov = () => setCursor((c) => ({ ...c, hov: true }));
    const unhov = () => setCursor((c) => ({ ...c, hov: false }));
    const els = document.querySelectorAll(
      "a, button, .pill, .coll-item, .pr-item",
    );
    els.forEach((el) => {
      el.addEventListener("mouseenter", hov);
      el.addEventListener("mouseleave", unhov);
    });
    return () => {
      els.forEach((el) => {
        el.removeEventListener("mouseenter", hov);
        el.removeEventListener("mouseleave", unhov);
      });
    };
  }, []);

  // Staggered scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const siblings =
              e.target.parentElement?.querySelectorAll(".sr:not(.on)");
            let delay = 0;
            siblings?.forEach((s, si) => {
              if (s === e.target) delay = si * 90;
            });
            setTimeout(() => e.target.classList.add("on"), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".sr").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Magnetic architects CTA
  const handleArchMagnet = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const btn = archMagnetRef.current;
      if (!btn) return;
      btn.classList.remove("leaving");
      const rect = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.25}px, ${(e.clientY - rect.top - rect.height / 2) * 0.25}px)`;
    },
    [],
  );

  const handleArchMagnetLeave = useCallback(() => {
    const btn = archMagnetRef.current;
    if (!btn) return;
    btn.classList.add("leaving");
    btn.style.transform = "";
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS BAR */}
      <div
        className='scroll-progress'
        style={{ width: `${scrollPct}%` }}
        aria-hidden='true'
      />
      {/* CURSOR DOT */}
      <div
        className={`cursor-dot${cursor.hov ? " hov" : ""}${cursor.out ? " out" : ""}`}
        style={{ left: cursor.x, top: cursor.y }}
        aria-hidden='true'
      />
      {/* NAV */}
      <nav className='fixed inset-x-0 top-0 z-[200] h-16 flex items-center justify-between px-10 bg-[rgba(244,243,240,0.88)] backdrop-blur-[16px] border-b border-[rgba(26,25,22,0.1)] max-[900px]:px-6'>
        <a
          href='#'
          className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
        >
          Hopla.studio
        </a>
        <ul className='flex gap-8 list-none max-[900px]:hidden'>
          {[
            { href: "#kolekcja", label: "Kolekcja" },
            { href: "#material", label: "Materiał" },
            { href: "#architekci", label: "Architekci" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className='text-[12px] font-normal tracking-[0.04em] text-[#6b6963] no-underline transition-colors duration-[180ms] hover:text-[#1a1916]'
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href='#kontakt'
          className='nav-cta text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-[9px] px-5 no-underline'
        >
          Kontakt
        </a>
      </nav>

      {/* HERO */}
      <section className='grid grid-cols-2 pt-16 h-[100svh] max-[900px]:grid-cols-1 max-[900px]:h-auto'>
        <div className='flex flex-col justify-between px-10 py-16 pb-12 bg-[#f4f3f0] overflow-hidden max-[900px]:px-6 max-[900px]:py-10 max-[900px]:gap-8'>
          <p className='hero-eyebrow text-[11px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0]'>
            Hopla.studio — Warszawa, PL
          </p>
          <h1 className='hero-h1 text-[clamp(44px,5.5vw,78px)] font-light leading-[1.04] tracking-[-0.03em] text-[#1a1916]'>
            Stal
            <br />
            definiowana
            <br />
            <span className='text-[#6b6963]'>
              przez
              <br />
              geometrię
            </span>
          </h1>
          <div className='hero-bottom flex justify-between items-end'>
            <p className='text-[13px] font-normal leading-[1.7] text-[#6b6963] max-w-[260px]'>
              Meble stalowe zaprojektowane z architektoniczną klarownością.
            </p>
            <a
              href='#kolekcja'
              className='hero-btn inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.1em] uppercase text-[#1a1916] no-underline border-b-[1.5px] border-[#1a1916] pb-[3px] whitespace-nowrap'
            >
              Zobacz kolekcję →
            </a>
          </div>
        </div>
        <div className='relative overflow-hidden max-[900px]:h-[55vw]'>
          <div
            ref={heroImgRef}
            className='absolute inset-0 will-change-transform'
          >
            <Image
              src='/landing/hero.jpeg'
              alt='Hopla studio — meble stalowe'
              fill
              className='object-cover object-center hero-img-zoom saturate-[0.75]'
              priority
            />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div
        className='h-11 bg-[#1a1916] flex items-center overflow-hidden'
        aria-hidden='true'
      >
        <div className='ticker-track flex whitespace-nowrap'>
          {[
            { text: "Szczotkowana stal", bold: true },
            { text: "·", bold: false },
            { text: "Cięcie laserowe", bold: false },
            { text: "·", bold: false },
            { text: "Bez nadmiaru", bold: true },
            { text: "·", bold: false },
            { text: "Produkcja lokalna", bold: false },
            { text: "·", bold: false },
            { text: "Ponadczasowy design", bold: true },
            { text: "·", bold: false },
            { text: "Polska", bold: false },
            { text: "·", bold: false },
            { text: "Szczotkowana stal", bold: true },
            { text: "·", bold: false },
            { text: "Cięcie laserowe", bold: false },
            { text: "·", bold: false },
            { text: "Bez nadmiaru", bold: true },
            { text: "·", bold: false },
            { text: "Produkcja lokalna", bold: false },
            { text: "·", bold: false },
            { text: "Ponadczasowy design", bold: true },
            { text: "·", bold: false },
            { text: "Polska", bold: false },
            { text: "·", bold: false },
          ].map((item, i) => (
            <span
              key={i}
              className='text-[10px] tracking-[0.22em] uppercase px-10 shrink-0'
              style={{
                color: item.bold
                  ? "rgba(244,243,240,0.9)"
                  : "rgba(244,243,240,0.45)",
                fontWeight: item.bold ? 500 : 400,
              }}
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section
        className='grid grid-cols-[1fr_2fr] border-b border-[rgba(26,25,22,0.1)] max-[900px]:grid-cols-1'
        id='o-marce'
      >
        <div className='flex flex-col justify-between px-10 py-[72px] border-r border-[rgba(26,25,22,0.1)] max-[900px]:hidden'>
          <span
            className='text-[11px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0]'
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            O marce
          </span>
          <span className='text-[80px] font-light text-[#eceae5] leading-none tracking-[-0.04em] select-none'>
            01
          </span>
        </div>
        <div className='flex flex-col gap-10 py-[72px] pr-[64px] pb-[72px] pl-[56px] max-[900px]:px-6 max-[900px]:py-12'>
          <p className='sr text-[clamp(20px,2.2vw,30px)] font-light leading-[1.55] tracking-[-0.02em] text-[#1a1916]'>
            Hopla.studio powstało z wieloletniego doświadczenia pracy ze stalą i
            przekonania, że materiał nie potrzebuje ozdobników. Tworzymy
            funkcjonalne obiekty ze szczotkowanej stali — ciętej laserowo i
            precyzyjnie giętej w najprostsze możliwe formy.
          </p>
          <div className='sr flex flex-wrap gap-2'>
            {PILLS.map((pill) => (
              <span
                key={pill}
                className='pill text-[11px] font-normal tracking-[0.1em] uppercase text-[#6b6963] border border-[rgba(26,25,22,0.1)] px-4 py-2 cursor-default'
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTION */}
      <section className='border-b border-[rgba(26,25,22,0.1)]' id='kolekcja'>
        <div className='flex items-baseline justify-between px-10 pt-12 pb-8 border-b border-[rgba(26,25,22,0.1)]'>
          <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1916]'>
            Kolekcja
          </span>
          <span className='text-[12px] font-normal text-[#b8b5b0]'>
            4 obiekty dostępne
          </span>
        </div>
        <div className='grid grid-cols-4 max-[900px]:grid-cols-2'>
          {COLLECTION.map(({ n, name, cat }) => (
            <a
              key={n}
              href='#'
              className='coll-item sr border-r border-[rgba(26,25,22,0.1)] last:border-r-0 relative overflow-hidden block no-underline text-inherit'
            >
              <div className='aspect-[3/4] overflow-hidden bg-[#eceae5] relative'>
                <span className='coll-num-overlay' aria-hidden='true'>
                  {String(n).padStart(2, "0")}
                </span>
                <Image
                  src={`/landing/collection-0${n}.jpeg`}
                  alt={name}
                  width={400}
                  height={533}
                  className='coll-img-inner'
                />
              </div>
              <div className='flex justify-between items-end px-6 pt-5 pb-7 border-t border-[rgba(26,25,22,0.1)]'>
                <div>
                  <p className='text-[14px] font-normal tracking-[-0.01em] text-[#1a1916] mb-1'>
                    {name}
                  </p>
                  <p className='text-[10px] font-normal tracking-[0.1em] uppercase text-[#b8b5b0]'>
                    {cat}
                  </p>
                </div>
                <span className='coll-arrow text-[16px] text-[#b8b5b0] transition-transform duration-200'>
                  ↗
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PRINCIPLES STRIP */}
      <section className='grid grid-cols-5 border-b border-[rgba(26,25,22,0.1)] bg-[#f4f3f0] max-[900px]:grid-cols-2 max-[900px]:overflow-hidden'>
        {PRINCIPLES.map(({ num, name, desc }, i) => (
          <div
            key={num}
            className={`value-card sr pr-item px-8 py-12 border-r border-[rgba(26,25,22,0.1)] cursor-default${i === 4 ? " max-[900px]:col-span-2 max-[900px]:border-r-0" : ""}`}
          >
            <span className='vc-num text-[11px] font-normal text-[#b8b5b0] tracking-[0.1em] mb-5 block'>
              {num}
            </span>
            <span className='vc-name text-[13px] font-medium tracking-[-0.01em] text-[#1a1916] mb-2.5 block'>
              {name}
            </span>
            <span className='vc-desc text-[12px] font-normal leading-[1.65] text-[#6b6963]'>
              {desc}
            </span>
          </div>
        ))}
      </section>

      {/* MATERIAL */}
      <section
        className='grid grid-cols-2 min-h-[80vh] border-b border-[rgba(26,25,22,0.1)] max-[900px]:grid-cols-1'
        id='material'
      >
        <div className='mat-img relative overflow-hidden max-[900px]:h-[50vw]'>
          <Image
            src='/landing/material.jpeg'
            alt='Materiał — stal nierdzewna'
            fill
            className='mat-img-inner'
          />
        </div>
        <div className='flex flex-col justify-between bg-[#fafaf8] px-14 py-[72px] max-[900px]:px-6 max-[900px]:py-12'>
          <div>
            <p className='sr text-[11px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0] mb-7'>
              Materiał i rzemiosło
            </p>
            <h2 className='sr text-[clamp(28px,3vw,44px)] font-light leading-[1.15] tracking-[-0.03em] text-[#1a1916] mb-6'>
              Stal, która starzeje się szlachetnie
            </h2>
            <p className='sr text-[14px] font-normal leading-[1.75] text-[#6b6963] max-w-[380px] text-justify'>
              Szczotkowana stal miękko odbija światło i szlachetnie starzeje się
              z&nbsp;czasem. Każdy element jest wycinany laserowo, gięty i
              wykańczany z najwyższą precyzją.
            </p>
          </div>
          <div className='border-t border-[rgba(26,25,22,0.1)] pt-8'>
            {MAT_SPECS.map(({ k, v }) => (
              <div
                key={k}
                className='mat-spec-row flex justify-between items-center py-3 border-b border-[rgba(26,25,22,0.1)]'
              >
                <span className='text-[11px] font-normal tracking-[0.1em] uppercase text-[#b8b5b0]'>
                  {k}
                </span>
                <span className='text-[13px] font-normal text-[#1a1916]'>
                  {v}
                </span>
              </div>
            ))}
          </div>
          <a
            href='#kontakt'
            className='mat-cta sr inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-[14px] px-6 no-underline self-start mt-10'
          >
            Zapytaj o materiał →
          </a>
        </div>
      </section>

      {/* ARCHITECTS */}
      <section
        className='grid grid-cols-2 border-b border-[rgba(26,25,22,0.1)] bg-[#1a1916] overflow-hidden max-[900px]:grid-cols-1'
        id='architekci'
      >
        <div className='sr flex flex-col justify-between px-14 py-20 max-[900px]:px-6 max-[900px]:py-14'>
          <p className='text-[11px] font-normal tracking-[0.14em] uppercase text-[rgba(244,243,240,0.35)]'>
            Dla architektów i projektantów
          </p>
          <div>
            <h2 className='text-[clamp(28px,3vw,46px)] font-light leading-[1.12] tracking-[-0.03em] text-[rgba(244,243,240,0.92)] mt-8 mb-5'>
              Projektujemy na wymiar. Dosłownie.
            </h2>
            <p className='text-[14px] font-normal leading-[1.75] text-[rgba(244,243,240,0.45)] max-w-[380px] mb-12'>
              Oferujemy indywidualne wymiarowanie, modyfikacje formy oraz
              współpracę przy projektach wymagających niestandartowych rozwiązań
              stalowych.
            </p>
            <a
              ref={archMagnetRef}
              href='#kontakt'
              className='magnetic-btn arch-btn inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.1em] uppercase text-[rgba(244,243,240,0.9)] no-underline border-b border-[rgba(244,243,240,0.3)] pb-1 w-fit'
              onMouseMove={handleArchMagnet}
              onMouseLeave={handleArchMagnetLeave}
            >
              Skontaktuj się w sprawie specyfikacji →
            </a>
          </div>
        </div>
        <div className='relative overflow-hidden max-[900px]:h-[50vw]'>
          <Image
            src='/landing/architects.jpeg'
            alt='Architekci i projektanci'
            fill
            className='object-cover object-center w-full h-full saturate-[0.4] brightness-90 mix-blend-luminosity opacity-60'
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className='pt-16 px-10 pb-10 bg-[#f4f3f0] max-[900px]:px-6 max-[900px]:pt-12 max-[900px]:pb-8'
        id='kontakt'
      >
        <div className='grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[rgba(26,25,22,0.1)] mb-8 max-[900px]:grid-cols-2'>
          <div>
            <a
              href='#'
              className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] block mb-3.5 no-underline'
            >
              Hopla.studio
            </a>
            <p className='text-[12px] font-normal leading-[1.7] text-[#6b6963]'>
              Minimalistyczne obiekty stalowe
              <br />
              Projektowane i produkowane w Polsce
            </p>
          </div>
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <span className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8b5b0] mb-5 block'>
                {col.title}
              </span>
              {col.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className='block text-[13px] font-normal text-[#6b6963] no-underline leading-[2.2] transition-colors duration-[180ms] hover:text-[#1a1916]'
                >
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>
        <div className='flex justify-between items-center'>
          <span className='text-[11px] font-normal text-[#b8b5b0] tracking-[0.04em]'>
            © 2025 Hopla.studio. Wszelkie prawa zastrzeżone.
          </span>
          <span className='text-[11px] font-normal text-[#b8b5b0] tracking-[0.04em]'>
            Warszawa, Polska
          </span>
        </div>
      </footer>
    </>
  );
}

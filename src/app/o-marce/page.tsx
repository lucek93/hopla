"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";

const VALUES = [
  {
    num: "01",
    name: "Inżynieryjna precyzja",
    desc: "Wieloletnie doświadczenie w pracy ze stalą przekłada się na dokładność do milimetra. Bez kompromisów.",
  },
  {
    num: "02",
    name: "Minimalistyczna geometria",
    desc: "Każda forma zredukowana do absolutnego minimum. Bez ozdobników. Tylko to, co konieczne.",
  },
  {
    num: "03",
    name: "Autentyczność materiału",
    desc: "Stal szczotkowana eksponowana zgodnie z jej naturą — bez lakierów, szczerze.",
  },
  {
    num: "04",
    name: "Ponadczasowa trwałość",
    desc: "Projektujemy poza trendami. Nasze obiekty pięknieją z czasem — jak dobra architektura.",
  },
  {
    num: "05",
    name: "Lokalne rzemiosło",
    desc: "Każdy element cięty laserowo, gięty i wykańczany z najwyższą precyzją w Polsce.",
  },
];

const PROCESS_STEPS = [
  { num: "01", label: "Projekt", desc: "Koncepcja i modelowanie 3D" },
  { num: "02", label: "Cięcie", desc: "Laser z dokładnością 0,1 mm" },
  { num: "03", label: "Gięcie", desc: "Precyzyjne formowanie CNC" },
  { num: "04", label: "Szczotkowanie", desc: "Ręczna obróbka powierzchni" },
  { num: "05", label: "Odbiór", desc: "Kontrola jakości i pakowanie" },
];

const STATS = [
  { value: 15, suffix: "+", unit: "", label: "Lat doświadczenia" },
  { value: 100, suffix: "%", unit: "", label: "Produkcja w Polsce" },
  { value: 4, suffix: "–8", unit: "tyg.", label: "Czas realizacji" },
];

const MARQUEE_WORDS = [
  "Polska produkcja",
  "·",
  "Stal nierdzewna",
  "·",
  "Cięcie laserowe",
  "·",
  "Minimalizm",
  "·",
  "Bez kompromisów",
  "·",
  "Warszawa",
  "·",
  "Dokładność 0,1mm",
  "·",
  "Ponadczasowy design",
  "·",
];

// Split headline into word spans for staggered slide-up animation
function WordReveal({
  text,
  className,
  baseDelay = 0,
}: {
  text: string;
  className?: string;
  baseDelay?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className='om-word-wrap'>
          <span
            className='om-word'
            style={{ transitionDelay: `${baseDelay + i * 80}ms` }}
          >
            {word}
            {i < words.length - 1 ? "\u00a0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}

function useCountUp(target: number, active: boolean, duration = 1800) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return value;
}

function StatItem({
  value,
  suffix,
  unit,
  label,
  active,
}: (typeof STATS)[0] & { active: boolean }) {
  const count = useCountUp(value, active);
  return (
    <div className='flex flex-col items-start gap-3 px-10 py-12 border-r border-[rgba(26,25,22,0.08)] last:border-r-0 max-[900px]:border-r-0 max-[900px]:border-b max-[900px]:last:border-b-0'>
      <span className='stat-num text-[clamp(52px,6vw,96px)] font-light tracking-[-0.04em] text-[#1a1916] leading-none'>
        {count}
        <span className='text-[0.45em] text-[#b8b5b0] ml-1'>
          {suffix}
          {unit ? <span className='text-[0.85em] ml-1'>{unit}</span> : null}
        </span>
      </span>
      <span className='text-[11px] font-normal tracking-[0.12em] uppercase text-[#6b6963]'>
        {label}
      </span>
    </div>
  );
}

const FOOTER_COLS = [
  {
    title: "Kolekcja",
    links: [
      { label: "Stoliki kawowe", href: "#" },
      { label: "Siedziska", href: "#" },
      { label: "Krzesła", href: "#" },
      { label: "Systemy półek", href: "#" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "O marce", href: "/o-marce" },
      { label: "Materiał", href: "/#material" },
      { label: "Dla architektów", href: "/#architekci" },
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

export default function OMarce() {
  const [scrollPct, setScrollPct] = useState(0);
  const [wordsOn, setWordsOn] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [cursor, setCursor] = useState({
    x: -200,
    y: -200,
    hov: false,
    out: false,
  });
  const heroImgRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLAnchorElement>(null);
  const heroMagnetRef = useRef<HTMLAnchorElement>(null);
  const processLineRef = useRef<HTMLDivElement>(null);

  // Scroll progress + parallax
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setScrollPct(
        Math.min(
          (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100,
          100,
        ),
      );
      if (heroImgRef.current && window.scrollY < window.innerHeight * 1.2) {
        heroImgRef.current.style.transform = `translateY(${window.scrollY * 0.14}px)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero word reveal on mount
  useEffect(() => {
    const t = setTimeout(() => {
      setWordsOn(true);
      document
        .querySelectorAll(".om-word")
        .forEach((el) => el.classList.add("on"));
    }, 250);
    return () => clearTimeout(t);
  }, []);

  // Stats count-up observer
  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Process line observer
  useEffect(() => {
    if (!processLineRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          processLineRef.current?.classList.add("on");
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(processLineRef.current);
    return () => obs.disconnect();
  }, []);

  // General scroll reveal with sibling stagger
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const siblings =
              e.target.parentElement?.querySelectorAll(".sr:not(.on)");
            let delay = 0;
            siblings?.forEach((s, si) => {
              if (s === e.target) delay = si * 80;
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
      "a, button, .pill, .value-card, .pr-item",
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

  // Magnetic CTA button
  const handleMagnet = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const btn = magnetRef.current;
    if (!btn) return;
    btn.classList.remove("leaving");
    const rect = btn.getBoundingClientRect();
    btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.28}px, ${(e.clientY - rect.top - rect.height / 2) * 0.28}px)`;
  }, []);

  const handleMagnetLeave = useCallback(() => {
    const btn = magnetRef.current;
    if (!btn) return;
    btn.classList.add("leaving");
    btn.style.transform = "";
  }, []);

  // Magnetic hero CTA button
  const handleHeroMagnet = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const btn = heroMagnetRef.current;
      if (!btn) return;
      btn.classList.remove("leaving");
      const rect = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.28}px, ${(e.clientY - rect.top - rect.height / 2) * 0.28}px)`;
    },
    [],
  );

  const handleHeroMagnetLeave = useCallback(() => {
    const btn = heroMagnetRef.current;
    if (!btn) return;
    btn.classList.add("leaving");
    btn.style.transform = "";
  }, []);

  void wordsOn;

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
        <Link
          href='/'
          className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
        >
          Hopla.studio
        </Link>
        <ul className='flex gap-8 list-none max-[900px]:hidden'>
          {[
            { href: "/#kolekcja", label: "Kolekcja" },
            { href: "/#material", label: "Materiał" },
            { href: "/#architekci", label: "Architekci" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='text-[12px] font-normal tracking-[0.04em] text-[#6b6963] no-underline transition-colors duration-[180ms] hover:text-[#1a1916]'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href='/#kontakt'
          className='nav-cta text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-[9px] px-5 no-underline'
        >
          Kontakt
        </Link>
      </nav>

      {/* HERO — word-by-word reveal + parallax image */}
      <section className='pt-16 grid grid-cols-2 min-h-[70vh] border-b border-[rgba(26,25,22,0.1)] max-[900px]:grid-cols-1'>
        <div className='flex flex-col justify-between px-10 py-[72px] bg-[#f4f3f0] overflow-hidden max-[900px]:px-6 max-[900px]:py-12'>
          <p className='hero-eyebrow text-[11px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0]'>
            Hopla.studio — O marce
          </p>
          <div>
            <h1 className='text-[clamp(40px,5vw,72px)] font-light leading-[1.1] tracking-[-0.03em] text-[#1a1916] mb-8'>
              <WordReveal text='Wykonanie bez' baseDelay={300} />
              <br />
              <WordReveal
                text='kompromisów'
                className='text-[#6b6963]'
                baseDelay={520}
              />
            </h1>
            <p className='hero-bottom text-[13px] font-normal leading-[1.7] text-[#6b6963] max-w-[320px]'>
              Hopla.studio powstało z pasji do stali i przekonania, że materiał
              nie potrzebuje ozdobników.
            </p>
          </div>
          <Link
            ref={heroMagnetRef}
            href='/#kontakt'
            className='magnetic-btn hero-btn inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.1em] uppercase text-[#1a1916] no-underline border-b-[1.5px] border-[#1a1916] pb-[3px] self-start'
            onMouseMove={handleHeroMagnet}
            onMouseLeave={handleHeroMagnetLeave}
          >
            Skontaktuj się →
          </Link>
        </div>
        <div className='relative overflow-hidden max-[900px]:h-[55vw]'>
          <div
            ref={heroImgRef}
            className='absolute inset-0 scale-[1.14] will-change-transform origin-center'
          >
            <Image
              src='/landing/material.jpeg'
              alt='Hopla.studio — stal szczotkowana'
              fill
              className='object-cover object-center saturate-[0.68] brightness-105'
              priority
            />
          </div>
        </div>
      </section>

      {/* STATS — animated count-up numbers */}
      <div
        ref={statsRef}
        className='grid grid-cols-3 border-b border-[rgba(26,25,22,0.1)] bg-[#fafaf8] max-[900px]:grid-cols-1'
      >
        {STATS.map((stat) => (
          <StatItem key={stat.label} {...stat} active={statsActive} />
        ))}
      </div>

      {/* STORY */}
      <section className='grid grid-cols-[1fr_2fr] border-b border-[rgba(26,25,22,0.1)] max-[900px]:grid-cols-1'>
        <div className='flex flex-col justify-between px-10 py-[72px] border-r border-[rgba(26,25,22,0.1)] max-[900px]:hidden'>
          <span
            className='text-[11px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0]'
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            Historia
          </span>
          <span className='text-[80px] font-light text-[#eceae5] leading-none tracking-[-0.04em] select-none'>
            02
          </span>
        </div>
        <div className='flex flex-col gap-10 py-[72px] pr-[64px] pb-[72px] pl-[56px] max-[900px]:px-6 max-[900px]:py-12'>
          <p className='sr text-[clamp(20px,2.2vw,30px)] font-light leading-[1.55] tracking-[-0.02em] text-[#1a1916]'>
            Hopla.studio powstało z wieloletniego doświadczenia pracy ze stalą i
            przekonania, że materiał nie potrzebuje ozdobników.
          </p>
          <div className='sr flex flex-col gap-6 text-[14px] font-normal leading-[1.75] text-[#6b6963] max-w-[520px]'>
            <p>
              Tworzymy funkcjonalne obiekty ze szczotkowanej stali — ciętej
              laserowo i precyzyjnie giętej w najprostsze możliwe formy. Każdy
              projekt zaczyna się od pytania: co można jeszcze odjąć?
            </p>
            <p>
              Nasze studio mieści się w Warszawie. Współpracujemy z lokalnymi
              zakładami obróbki metalu, zachowując pełną kontrolę nad każdym
              etapem produkcji — od projektu, przez cięcie laserowe, po końcowe
              szczotkowanie.
            </p>
            <p>
              Projektujemy dla tych, którzy rozumieją, że prawdziwy luksus to
              jakość materiału i precyzja wykonania — nie ozdobniki.
            </p>
          </div>
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <div
        className='h-12 bg-[#eceae5] flex items-center overflow-hidden border-b border-[rgba(26,25,22,0.1)]'
        aria-hidden='true'
      >
        <div className='om-marquee-track flex items-center'>
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((word, i) => (
            <span
              key={i}
              className='text-[10px] font-normal tracking-[0.2em] uppercase shrink-0 px-8'
              style={{
                color:
                  word === "·" ? "rgba(26,25,22,0.2)" : "rgba(26,25,22,0.5)",
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* VALUES — dark fill reveal on hover */}
      <section className='border-b border-[rgba(26,25,22,0.1)]'>
        <div className='flex items-baseline justify-between px-10 pt-12 pb-8 border-b border-[rgba(26,25,22,0.1)]'>
          <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1916]'>
            Wartości
          </span>
          <span className='text-[12px] font-normal text-[#b8b5b0]'>
            5 zasad, którymi się kierujemy
          </span>
        </div>
        <div className='grid grid-cols-5 bg-[#f4f3f0] max-[900px]:grid-cols-2 max-[900px]:overflow-hidden'>
          {VALUES.map(({ num, name, desc }, i) => (
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
        </div>
      </section>

      {/* PROCESS TIMELINE — line draws across on scroll */}
      <section className='border-b border-[rgba(26,25,22,0.1)] px-10 py-16 max-[900px]:px-6 max-[900px]:py-12'>
        <div className='flex items-baseline justify-between mb-14'>
          <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1916]'>
            Proces produkcji
          </span>
          <span className='text-[12px] font-normal text-[#b8b5b0]'>
            Od projektu do obiektu
          </span>
        </div>
        <div className='relative'>
          <div className='absolute top-[22px] left-[22px] right-[22px] h-px bg-[rgba(26,25,22,0.08)] max-[900px]:hidden' />
          <div
            ref={processLineRef}
            className='process-connector absolute top-[22px] left-[22px] right-[22px] h-px bg-[#1a1916] max-[900px]:hidden'
          />
          <div className='grid grid-cols-5 gap-6 max-[900px]:grid-cols-1 max-[900px]:gap-0'>
            {PROCESS_STEPS.map(({ num, label, desc }, i) => (
              <div
                key={num}
                className='sr flex flex-col gap-4 max-[900px]:flex-row max-[900px]:items-start max-[900px]:gap-6 max-[900px]:border-b max-[900px]:border-[rgba(26,25,22,0.08)] max-[900px]:py-6 max-[900px]:last:border-b-0'
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <div className='w-11 h-11 rounded-full border border-[rgba(26,25,22,0.14)] bg-[#f4f3f0] flex items-center justify-center shrink-0 relative z-10 transition-colors duration-300 hover:bg-[#1a1916] hover:border-[#1a1916] group/dot'>
                  <span className='text-[11px] font-medium text-[#6b6963] transition-colors duration-300 group-hover/dot:text-[#f4f3f0]'>
                    {num}
                  </span>
                </div>
                <div className='max-[900px]:pt-1'>
                  <p className='text-[13px] font-medium tracking-[-0.01em] text-[#1a1916] mb-1'>
                    {label}
                  </p>
                  <p className='text-[11px] font-normal leading-[1.6] text-[#6b6963]'>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MATERIAL DETAIL — slow zoom on hover */}
      <section className='grid grid-cols-2 min-h-[60vh] border-b border-[rgba(26,25,22,0.1)] max-[900px]:grid-cols-1'>
        <div className='relative overflow-hidden max-[900px]:h-[55vw] group'>
          <Image
            src='/landing/architects.jpeg'
            alt='Detal — stal szczotkowana'
            fill
            className='object-cover object-center saturate-[0.65] brightness-105 transition-transform duration-[8000ms] ease-linear group-hover:scale-[1.04]'
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
            <p className='sr text-[14px] font-normal leading-[1.75] text-[#6b6963] max-w-[380px]'>
              Każdy obiekt Hopla przechodzi przez ten sam rygorystyczny proces:
              projekt koncepcyjny, modelowanie 3D, cięcie laserowe z
              dokładnością do 0,1 mm, gięcie i formowanie, ręczne szczotkowanie
              powierzchni.
            </p>
          </div>
          <div className='sr border-t border-[rgba(26,25,22,0.1)] pt-8'>
            {[
              { k: "Projekt", v: "Warszawa, Polska" },
              { k: "Produkcja", v: "Lokalna, PL" },
              { k: "Technologia", v: "Cięcie laserowe, CNC" },
              { k: "Certyfikat", v: "ISO 9001" },
              { k: "Czas realizacji", v: "4–8 tygodni" },
            ].map(({ k, v }) => (
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
        </div>
      </section>

      {/* CTA — magnetic button effect */}
      <section className='bg-[#1a1916] px-10 py-24 flex flex-col items-center text-center gap-10 max-[900px]:px-6 max-[900px]:py-16'>
        <p className='sr text-[11px] font-normal tracking-[0.14em] uppercase text-[rgba(244,243,240,0.35)]'>
          Zacznijmy współpracę
        </p>
        <h2 className='sr text-[clamp(28px,4vw,60px)] font-light leading-[1.08] tracking-[-0.03em] text-[rgba(244,243,240,0.92)] max-w-[680px]'>
          Masz projekt, który wymaga stalowej precyzji?
        </h2>
        <Link
          ref={magnetRef}
          href='/#kontakt'
          className='magnetic-btn arch-btn sr inline-flex items-center gap-[12px] text-[13px] font-medium tracking-[0.1em] uppercase text-[rgba(244,243,240,0.9)] no-underline border-b border-[rgba(244,243,240,0.3)] pb-2'
          onMouseMove={handleMagnet}
          onMouseLeave={handleMagnetLeave}
        >
          Skontaktuj się →
        </Link>
      </section>

      {/* FOOTER */}
      <footer
        className='pt-16 px-10 pb-10 bg-[#f4f3f0] max-[900px]:px-6 max-[900px]:pt-12 max-[900px]:pb-8'
        id='kontakt'
      >
        <div className='grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[rgba(26,25,22,0.1)] mb-8 max-[900px]:grid-cols-2'>
          <div>
            <Link
              href='/'
              className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] block mb-3.5 no-underline'
            >
              Hopla.studio
            </Link>
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
                <Link
                  key={link.label}
                  href={link.href}
                  className='block text-[13px] font-normal text-[#6b6963] no-underline leading-[2.2] transition-colors duration-[180ms] hover:text-[#1a1916]'
                >
                  {link.label}
                </Link>
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

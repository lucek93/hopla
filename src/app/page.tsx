"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PILLS = [
  "Inżynieryjna precyzja",
  "Minimalistyczna geometria",
  "Autentyczność materiału",
  "Ponadczasowa trwałość",
  "Lokalne rzemiosło",
];

const COLLECTION = [
  {
    n: 1,
    name: "Plane 01",
    cat: "Stolik kawowy",
    desc: "Minimalistyczny stolik kawowy o perfekcyjnie płaskiej geometrii. Blat z litej stali szczotkowanej na precyzyjnie wyciętej ramie.",
    images: [
      "/landing/collection-01.jpeg",
      "/landing/collection-02.jpeg",
      "/landing/material.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "120 × 60 × 35 cm" },
      { k: "Grubość", v: "4 mm" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "4–6 tygodni" },
    ],
  },
  {
    n: 2,
    name: "Arc 01",
    cat: "Siedzisko",
    desc: "Siedzisko inspirowane łukiem architektonicznym. Jedna linia gięcia, zero spawów widocznych z zewnątrz.",
    images: [
      "/landing/collection-02.jpeg",
      "/landing/collection-03.jpeg",
      "/landing/collection-01.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "80 × 40 × 42 cm" },
      { k: "Nośność", v: "180 kg" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "5–7 tygodni" },
    ],
  },
  {
    n: 3,
    name: "Block 01",
    cat: "Krzesło",
    desc: "Krzesło definiowane przez czysty prostopadłościan. Surowe, ale precyzyjnie wyważone proporcje.",
    images: [
      "/landing/collection-03.jpeg",
      "/landing/collection-04.jpeg",
      "/landing/collection-02.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "46 × 52 × 78 cm" },
      { k: "Siedzisko", v: "46 × 42 cm" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "4–6 tygodni" },
    ],
  },
  {
    n: 4,
    name: "Grid 01",
    cat: "System półek",
    desc: "Modularny system półek oparty na siatce 30 mm. Konfigurowalny w nieskończoność, montaż bez narzędzi.",
    images: [
      "/landing/collection-04.jpeg",
      "/landing/collection-01.jpeg",
      "/landing/material.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Moduł bazowy", v: "90 × 30 × 30 cm" },
      { k: "Nośność półki", v: "25 kg" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "6–8 tygodni" },
    ],
  },
  {
    n: 5,
    name: "Mono 01",
    cat: "Stolik boczny",
    desc: "Stolik boczny zredukowany do jednej pionowej płaszczyzny z wyciętym otworem funkcyjnym.",
    images: [
      "/landing/material.jpeg",
      "/landing/collection-01.jpeg",
      "/landing/collection-04.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "40 × 35 × 55 cm" },
      { k: "Grubość", v: "3 mm" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "3–5 tygodni" },
    ],
  },
  {
    n: 6,
    name: "Frame 01",
    cat: "Konsola",
    desc: "Konsola-rama zawieszona na ścianie. Prosta linia, precyzyjny kąt prosty, zero kompromisów.",
    images: [
      "/landing/collection-02.jpeg",
      "/landing/material.jpeg",
      "/landing/collection-03.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "100 × 30 × 75 cm" },
      { k: "Montaż", v: "Ścienny, ukryty" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "5–7 tygodni" },
    ],
  },
  {
    n: 7,
    name: "Slab 01",
    cat: "Ławka",
    desc: "Ławka-monolith. Jedna forma bez przerwania linii — od nogi do siedziska.",
    images: [
      "/landing/collection-03.jpeg",
      "/landing/collection-01.jpeg",
      "/landing/collection-02.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "160 × 38 × 44 cm" },
      { k: "Nośność", v: "300 kg" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "5–8 tygodni" },
    ],
  },
  {
    n: 8,
    name: "Tower 01",
    cat: "Wieszak",
    desc: "Wieszak-kolumna. Minimalna forma, maksymalna funkcjonalność. Sześć punktów zawieszenia.",
    images: [
      "/landing/collection-04.jpeg",
      "/landing/collection-02.jpeg",
      "/landing/collection-03.jpeg",
    ],
    specs: [
      { k: "Materiał", v: "Stal nierdzewna 304" },
      { k: "Wymiary", v: "Ø 12 × 180 cm" },
      { k: "Punkty", v: "6 × stalowy hak" },
      { k: "Wykończenie", v: "Szczotkowane, satynowe" },
      { k: "Czas realizacji", v: "3–4 tygodnie" },
    ],
  },
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
      { label: "Architekci", href: "#architekci" },
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

  // Collection state
  const [showAllItems, setShowAllItems] = useState(false);
  const [cardImgIdx, setCardImgIdx] = useState<Record<number, number>>({});
  const [modalItem, setModalItem] = useState<
    (typeof COLLECTION)[number] | null
  >(null);
  const [modalImgIdx, setModalImgIdx] = useState(0);

  const openModal = useCallback(
    (item: (typeof COLLECTION)[number], startIdx: number) => {
      setModalItem(item);
      setModalImgIdx(startIdx);
      document.body.style.overflow = "hidden";
    },
    [],
  );

  const closeModal = useCallback(() => {
    setModalItem(null);
    document.body.style.overflow = "";
  }, []);

  const advanceCardImg = useCallback(
    (e: React.MouseEvent, n: number, dir: 1 | -1, len: number) => {
      e.preventDefault();
      e.stopPropagation();
      setCardImgIdx((prev) => ({
        ...prev,
        [n]: ((prev[n] ?? 0) + dir + len) % len,
      }));
    },
    [],
  );

  const advanceModalImg = useCallback(
    (dir: 1 | -1) => {
      if (!modalItem) return;
      const len = modalItem.images.length;
      setModalImgIdx((i) => (i + dir + len) % len);
    },
    [modalItem],
  );

  // Detect mobile/touch
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
      if (modalItem) {
        if (e.key === "ArrowRight") advanceModalImg(1);
        if (e.key === "ArrowLeft") advanceModalImg(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal, modalItem, advanceModalImg]);

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
        <ul className='flex gap-8 list-none max-[900px]:hidden'>
          {[
            { href: "#kolekcja", label: "Kolekcja" },
            { href: "#architekci", label: "Architekci" },
            { href: "/o-marce", label: "O marce" },
          ].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className='text-[12px] font-normal tracking-[0.04em] text-[#6b6963] no-underline transition-colors duration-[180ms] hover:text-[#1a1916] hover:font-semibold'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href='/'
          className='text-[15px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
        >
          Hopla<span className='text-[10px] font-normal'> studio</span>
        </Link>
        <Link
          href='/#kontakt'
          className='nav-cta text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-[9px] px-5 no-underline'
        >
          Kontakt
        </Link>
      </nav>

      {/* HERO */}
      <section className='grid grid-cols-2 pt-16 h-[100svh] max-[900px]:grid-cols-1 max-[900px]:h-auto'>
        <div className='flex flex-col justify-between px-10 py-16 pb-12 bg-[#f4f3f0] overflow-hidden max-[900px]:px-6 max-[900px]:py-10 max-[900px]:gap-8'>
          <p className='hero-eyebrow text-[11px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0]'></p>
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
          <div className='hero-bottom flex justify-between items-end max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-5'>
            <p className='text-[13px] font-normal leading-[1.7] text-[#6b6963] max-w-[260px] max-[480px]:max-w-none'>
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
        <div className='relative overflow-hidden max-[900px]:h-[60vw] max-[480px]:h-[72vw]'>
          <div
            ref={heroImgRef}
            className='absolute inset-0 will-change-transform'
          >
            <Image
              src='/landing/hero.png'
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
      {/* 
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
           */}

      {/* COLLECTION */}
      <section className='border-b border-[rgba(26,25,22,0.1)]' id='kolekcja'>
        <div className='flex items-baseline justify-between px-10 pt-12 pb-8 border-b border-[rgba(26,25,22,0.1)]'>
          <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1916]'>
            Kolekcja
          </span>
          <span className='text-[12px] font-normal text-[#b8b5b0]'>
            {COLLECTION.length} obiektów dostępnych
          </span>
        </div>

        <motion.div
          className='grid grid-cols-4 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1'
          layout
        >
          <AnimatePresence initial={false}>
            {(showAllItems ? COLLECTION : COLLECTION.slice(0, 4)).map(
              (item) => {
                const { n, name, cat, images } = item;
                const imgIdx = cardImgIdx[n] ?? 0;
                return (
                  <motion.div
                    key={n}
                    layout
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className='coll-item group sr border-r border-[rgba(26,25,22,0.1)] [&:nth-child(4n)]:border-r-0 max-[900px]:[&:nth-child(2n)]:border-r-0 max-[480px]:border-r-0 relative overflow-hidden'
                  >
                    {/* Image zone — click to open modal */}
                    <button
                      className='w-full text-left cursor-pointer bg-transparent border-0 p-0 block'
                      onClick={() => openModal(item, imgIdx)}
                      aria-label={`Otwórz galerię: ${name}`}
                    >
                      <div className='aspect-[3/4] overflow-hidden bg-[#eceae5] relative'>
                        {/* Number overlay */}
                        <span
                          className='coll-num-overlay z-50'
                          aria-hidden='true'
                        >
                          {String(n).padStart(2, "0")}
                        </span>

                        {/* Image with crossfade */}
                        <AnimatePresence mode='wait'>
                          <motion.div
                            key={imgIdx}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            className='absolute inset-0'
                          >
                            <Image
                              src={images[imgIdx]}
                              alt={`${name} — zdjęcie ${imgIdx + 1}`}
                              fill
                              className='coll-img-inner'
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Gallery dot indicators — always visible on mobile */}
                        {images.length > 1 && (
                          <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 max-[900px]:opacity-100 transition-opacity duration-300'>
                            {images.map((_, di) => (
                              <span
                                key={di}
                                className={`block w-1 h-1 rounded-full transition-all duration-300 ${di === imgIdx ? "bg-[#1a1916] scale-125" : "bg-[rgba(26,25,22,0.3)]"}`}
                              />
                            ))}
                          </div>
                        )}

                        {/* View overlay — visible on hover (desktop) or always subtle on mobile */}
                        <div className='absolute inset-0 flex items-end justify-end pb-3 pr-3 bg-[rgba(26,25,22,0)] group-hover:bg-[rgba(26,25,22,0.18)] max-[900px]:bg-transparent transition-colors duration-400 z-10'>
                          <span className='text-[10px] font-medium tracking-[0.18em] uppercase text-[#f4f3f0] opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hidden max-[900px]:hidden'>
                            Zobacz obiekt
                          </span>
                          {/* Mobile tap hint icon */}
                          <span
                            className='hidden max-[900px]:flex items-center justify-center w-8 h-8 bg-[rgba(26,25,22,0.55)] backdrop-blur-sm text-[#f4f3f0] text-[13px] rounded-full'
                            aria-hidden='true'
                          >
                            ↗
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Card footer with arrow nav */}
                    <div className='flex justify-between items-center px-4 max-[900px]:px-3 pt-4 pb-5 max-[900px]:pt-3 max-[900px]:pb-4 border-t border-[rgba(26,25,22,0.1)]'>
                      <div>
                        <p className='text-[13px] max-[900px]:text-[12px] font-normal tracking-[-0.01em] text-[#1a1916] mb-0.5'>
                          {name}
                        </p>
                        <p className='text-[10px] font-normal tracking-[0.1em] uppercase text-[#b8b5b0]'>
                          {cat}
                        </p>
                      </div>
                      <div className='flex items-center gap-1.5'>
                        {/* Image nav — hover on desktop, always visible on mobile */}
                        {images.length > 1 && (
                          <div className='flex gap-1 opacity-0 group-hover:opacity-100 max-[900px]:opacity-100 transition-opacity duration-300'>
                            <button
                              onClick={(e) =>
                                advanceCardImg(e, n, -1, images.length)
                              }
                              className='coll-nav-btn w-8 h-8 max-[900px]:w-9 max-[900px]:h-9 flex items-center justify-center border border-[rgba(26,25,22,0.15)] text-[#6b6963] hover:border-[#1a1916] hover:bg-[#1a1916] hover:text-[#f4f3f0] active:bg-[#1a1916] active:text-[#f4f3f0] transition-all duration-200 text-[11px]'
                              aria-label='Poprzednie zdjęcie'
                            >
                              ←
                            </button>
                            <button
                              onClick={(e) =>
                                advanceCardImg(e, n, 1, images.length)
                              }
                              className='coll-nav-btn w-8 h-8 max-[900px]:w-9 max-[900px]:h-9 flex items-center justify-center border border-[rgba(26,25,22,0.15)] text-[#6b6963] hover:border-[#1a1916] hover:bg-[#1a1916] hover:text-[#f4f3f0] active:bg-[#1a1916] active:text-[#f4f3f0] transition-all duration-200 text-[11px]'
                              aria-label='Następne zdjęcie'
                            >
                              →
                            </button>
                          </div>
                        )}
                        {/* Desktop: diagonal arrow. Hidden on mobile (image tap opens modal) */}
                        <button
                          onClick={() => openModal(item, imgIdx)}
                          className='coll-arrow max-[900px]:hidden text-[16px] text-[#b8b5b0] group-hover:text-[#1a1916] group-hover:translate-x-[3px] group-hover:translate-y-[-3px] transition-all duration-200 bg-transparent border-0 cursor-pointer px-1'
                          aria-label={`Otwórz ${name}`}
                        >
                          ↗
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              },
            )}
          </AnimatePresence>
        </motion.div>

        {/* SHOW MORE / LESS */}
        <div className='flex justify-center py-10 border-t border-[rgba(26,25,22,0.1)]'>
          <button
            onClick={() => setShowAllItems((v) => !v)}
            className='show-more-btn group relative inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.12em] uppercase text-[#1a1916] border border-[rgba(26,25,22,0.2)] px-8 py-4 overflow-hidden transition-colors duration-300 hover:border-[#1a1916] hover:bg-[#1a1916] hover:text-[#f4f3f0]'
          >
            <span className='relative z-10 flex items-center gap-3'>
              <span>
                {showAllItems ? "Pokaż mniej" : "Pokaż więcej obiektów"}
              </span>
              <motion.span
                animate={{ rotate: showAllItems ? 180 : 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className='text-[14px] inline-block'
              >
                ↓
              </motion.span>
            </span>
            <span className='show-more-bg' aria-hidden='true' />
          </button>
        </div>
      </section>

      {/* COLLECTION MODAL */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-[500] flex items-stretch max-[900px]:flex-col max-[900px]:justify-end bg-[rgba(10,10,9,0.82)] backdrop-blur-[6px]'
            onClick={closeModal}
          >
            <motion.div
              initial={
                isMobile ? { y: "100%", opacity: 1 } : { x: 60, opacity: 0 }
              }
              animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={
                isMobile ? { y: "100%", opacity: 1 } : { x: 60, opacity: 0 }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className='modal-panel ml-auto flex w-full max-w-[1080px] bg-[#f4f3f0] overflow-hidden max-[900px]:flex-col max-[900px]:max-w-full max-[900px]:mt-auto max-[900px]:max-h-[92dvh] max-[900px]:overflow-y-auto'
              onClick={(e) => e.stopPropagation()}
            >
              {/* LEFT — image gallery */}
              <div className='relative flex-1 bg-[#eceae5] overflow-hidden min-h-[480px] max-[900px]:flex-none max-[900px]:min-h-0 max-[900px]:h-[58vw]'>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={modalImgIdx}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute inset-0'
                  >
                    <Image
                      src={modalItem.images[modalImgIdx]}
                      alt={`${modalItem.name} — zdjęcie ${modalImgIdx + 1}`}
                      fill
                      className='object-cover object-center saturate-[0.8]'
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev/Next arrows — bigger on mobile */}
                {modalItem.images.length > 1 && (
                  <>
                    <button
                      onClick={() => advanceModalImg(-1)}
                      className='modal-arrow-btn absolute left-3 max-[900px]:left-2 top-1/2 -translate-y-1/2 w-10 h-10 max-[900px]:w-12 max-[900px]:h-12 flex items-center justify-center bg-[rgba(244,243,240,0.85)] backdrop-blur-sm text-[#1a1916] hover:bg-[#f4f3f0] active:bg-[#f4f3f0] transition-all duration-200 text-[16px] max-[900px]:text-[20px] z-20'
                      aria-label='Poprzednie zdjęcie'
                    >
                      ←
                    </button>
                    <button
                      onClick={() => advanceModalImg(1)}
                      className='modal-arrow-btn absolute right-3 max-[900px]:right-2 top-1/2 -translate-y-1/2 w-10 h-10 max-[900px]:w-12 max-[900px]:h-12 flex items-center justify-center bg-[rgba(244,243,240,0.85)] backdrop-blur-sm text-[#1a1916] hover:bg-[#f4f3f0] active:bg-[#f4f3f0] transition-all duration-200 text-[16px] max-[900px]:text-[20px] z-20'
                      aria-label='Następne zdjęcie'
                    >
                      →
                    </button>
                  </>
                )}

                {/* Thumbnails (desktop) / Dots (mobile) */}
                <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 px-4'>
                  {/* Desktop: thumbnail images */}
                  {modalItem.images.map((src, ti) => (
                    <button
                      key={ti}
                      onClick={() => setModalImgIdx(ti)}
                      className={`modal-thumb max-[900px]:hidden relative overflow-hidden transition-all duration-300 ${ti === modalImgIdx ? "w-14 h-9 ring-2 ring-[#f4f3f0]" : "w-9 h-9 opacity-60 hover:opacity-90"}`}
                      aria-label={`Zdjęcie ${ti + 1}`}
                    >
                      <Image src={src} alt='' fill className='object-cover' />
                    </button>
                  ))}
                  {/* Mobile: dot indicators */}
                  {modalItem.images.map((_, ti) => (
                    <button
                      key={`dot-${ti}`}
                      onClick={() => setModalImgIdx(ti)}
                      className={`hidden max-[900px]:block w-6 h-6 flex items-center justify-center`}
                      aria-label={`Zdjęcie ${ti + 1}`}
                    >
                      <span
                        className={`block rounded-full transition-all duration-300 ${ti === modalImgIdx ? "w-2.5 h-2.5 bg-[#f4f3f0]" : "w-1.5 h-1.5 bg-[rgba(244,243,240,0.45)]"}`}
                      />
                    </button>
                  ))}
                </div>

                {/* Image counter */}
                <div className='absolute top-4 left-4 z-20 text-[10px] font-medium tracking-[0.14em] uppercase text-[#f4f3f0] bg-[rgba(26,25,22,0.5)] px-3 py-1.5 backdrop-blur-sm'>
                  {modalImgIdx + 1} / {modalItem.images.length}
                </div>
              </div>

              {/* RIGHT — info & specs */}
              <div className='w-[380px] max-[900px]:w-full flex flex-col bg-[#fafaf8] overflow-y-auto max-[900px]:overflow-y-visible flex-shrink-0'>
                {/* Header */}
                <div className='flex items-start justify-between p-6 max-[900px]:p-5 border-b border-[rgba(26,25,22,0.1)]'>
                  <div>
                    <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0] mb-2'>
                      {modalItem.cat}
                    </p>
                    <h2 className='text-[26px] max-[900px]:text-[22px] font-light tracking-[-0.03em] text-[#1a1916] leading-none'>
                      {modalItem.name}
                    </h2>
                  </div>
                  <button
                    onClick={closeModal}
                    className='w-10 h-10 max-[900px]:w-12 max-[900px]:h-12 flex items-center justify-center text-[#6b6963] hover:text-[#1a1916] hover:bg-[rgba(26,25,22,0.06)] active:bg-[rgba(26,25,22,0.06)] transition-all duration-200 text-[20px] shrink-0 ml-4'
                    aria-label='Zamknij'
                  >
                    ×
                  </button>
                </div>

                {/* Description */}
                <div className='px-6 max-[900px]:px-5 py-5 border-b border-[rgba(26,25,22,0.1)]'>
                  <p className='text-[13px] font-normal leading-[1.75] text-[#6b6963]'>
                    {modalItem.desc}
                  </p>
                </div>

                {/* Specs */}
                <div className='px-6 max-[900px]:px-5 py-5 flex-1'>
                  <p className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8b5b0] mb-5'>
                    Specyfikacja
                  </p>
                  <div className='border-t border-[rgba(26,25,22,0.1)]'>
                    {modalItem.specs.map(({ k, v }) => (
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

                {/* CTA */}
                <div className='px-6 max-[900px]:px-5 pb-6 max-[900px]:pb-8'>
                  <a
                    href='#kontakt'
                    onClick={closeModal}
                    className='modal-cta w-full inline-flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.1em] uppercase bg-[#1a1916] text-[#f4f3f0] py-4 px-6 no-underline transition-opacity duration-200 hover:opacity-80'
                  >
                    Zapytaj o wycenę →
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRINCIPLES STRIP */}
      <section className='grid grid-cols-5 border-b border-[rgba(26,25,22,0.1)] bg-[#f4f3f0] max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 max-[900px]:overflow-hidden'>
        {PRINCIPLES.map(({ num, name, desc }, i) => (
          <div
            key={num}
            className={`value-card sr pr-item px-7 max-[900px]:px-6 py-10 max-[900px]:py-8 border-r border-[rgba(26,25,22,0.1)] cursor-default${i === 4 ? " max-[900px]:col-span-2 max-[480px]:col-span-1 max-[900px]:border-r-0" : ""}`}
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
      {/* 
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
        className='grid grid-cols-2 w-full border-b border-[rgba(26,25,22,0.1)] bg-[#1a1916] overflow-hidden h-[clamp(440px,55vh,680px)] max-[900px]:grid-cols-1 max-[900px]:h-auto'
        id='architekci'
      >
        <div className='sr flex flex-col justify-between px-14 py-14 max-[900px]:px-6 max-[900px]:py-14'>
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
              className='magnetic-btn arch-btn inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.1em] uppercase text-[rgba(244,243,240,0.9)] no-underline border-b border-[rgba(244,243,240,0.3)] pb-1 w-fit max-[900px]:!transform-none'
              onMouseMove={handleArchMagnet}
              onMouseLeave={handleArchMagnetLeave}
            >
              Skontaktuj się w sprawie specyfikacji →
            </a>
          </div>
        </div>
        <div className='relative overflow-hidden max-[900px]:h-[50vw]'>
          <Image
            src='/landing/architects.png'
            alt='Architekci i projektanci'
            fill
            className='object-cover [object-position:center_65%] saturate-[0.4] brightness-90 mix-blend-luminosity opacity-60'
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className='pt-16 px-10 pb-10 bg-[#f4f3f0] max-[900px]:px-6 max-[900px]:pt-12 max-[900px]:pb-8'
        id='kontakt'
      >
        <div className='grid grid-cols-[1.2fr_1fr_1fr_1fr] gap-12 pb-14 border-b border-[rgba(26,25,22,0.1)] mb-8 max-[900px]:grid-cols-2 max-[480px]:grid-cols-1 max-[900px]:gap-8'>
          <div>
            <a
              href='#'
              className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] block mb-3.5 no-underline'
            >
              Hopla <span className='text-[10px] font-normal'>studio</span>
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
        <div className='flex justify-between items-center max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-2'>
          <span className='text-[11px] font-normal text-[#b8b5b0] tracking-[0.04em]'>
            © 2026 <span className='uppercase'>Hopla</span>{" "}
            <span className='text-[9px] font-normal uppercase'>studio</span>.
            Wszelkie prawa zastrzeżone.
          </span>
          <span className='text-[11px] font-normal text-[#b8b5b0] tracking-[0.04em]'>
            Warszawa, Polska
          </span>
        </div>
      </footer>
    </>
  );
}

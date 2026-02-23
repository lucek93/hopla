"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight } from "lucide-react";

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formTopic, setFormTopic] = useState<string | null>(null);
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const openContactModal = useCallback(() => {
    setContactModalOpen(true);
    setFormState("idle");
    setFormData({ name: "", email: "", message: "" });
    setFormTopic(null);
    document.body.style.overflow = "hidden";
  }, []);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const handleFormSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Simulate sending — replace with real API call
    await new Promise((r) => setTimeout(r, 1600));
    setFormState("success");
  }, []);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const archMagnetRef = useRef<HTMLButtonElement>(null);
  const modalSwipeStartY = useRef<number | null>(null);
  const modalImageSwipeStartX = useRef<number | null>(null);

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
    [setModalImgIdx],
  );

  const closeModal = useCallback(() => {
    setModalItem(null);
    document.body.style.overflow = "";
  }, []);

  const openMobileMenu = useCallback(() => {
    setMobileMenuOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
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
    [modalItem, setModalImgIdx],
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
      if (e.key === "Escape") {
        closeModal();
        closeContactModal();
      }
      if (modalItem) {
        if (e.key === "ArrowRight") advanceModalImg(1);
        if (e.key === "ArrowLeft") advanceModalImg(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeModal, closeContactModal, modalItem, advanceModalImg]);

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
      setShowStickyBar(el.scrollTop > window.innerHeight * 0.55);
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
      <nav className='fixed inset-x-0 top-0 z-[200] h-16 grid grid-cols-3 items-center px-10 bg-[rgba(244,243,240,0.88)] backdrop-blur-[16px] border-b border-[rgba(26,25,22,0.1)] max-[900px]:px-5'>
        {/* LEFT — desktop links / mobile hamburger */}
        <div className='flex items-center'>
          {/* Desktop links */}
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
          {/* Mobile hamburger */}
          <button
            onClick={openMobileMenu}
            className='hidden max-[900px]:flex flex-col justify-center gap-[5px] w-10 h-10 -ml-2 bg-transparent border-0 cursor-pointer p-2'
            aria-label='Otwórz menu'
          >
            <span className='block w-5 h-[1.5px] bg-[#1a1916] transition-all duration-200' />
            <span className='block w-3.5 h-[1.5px] bg-[#1a1916] transition-all duration-200' />
          </button>
        </div>

        {/* CENTER — logo */}
        <div className='flex justify-center'>
          <Link
            href='/'
            className='text-[15px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
          >
            Hopla<span className='text-[10px] font-normal'> studio</span>
          </Link>
        </div>

        {/* RIGHT — contact CTA */}
        {isMobile ? null : (
          <div className='flex justify-end'>
            <button
              onClick={openContactModal}
              className='nav-cta text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-[9px] px-5 cursor-pointer border-0 max-[480px]:py-[8px] max-[480px]:px-4'
            >
              Kontakt
            </button>
          </div>
        )}
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key='mobile-backdrop'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className='fixed inset-0 z-[300] bg-[rgba(10,10,9,0.5)] backdrop-blur-[2px]'
              onClick={closeMobileMenu}
            />
            {/* Drawer */}
            <motion.div
              key='mobile-drawer'
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className='fixed top-0 left-0 bottom-0 z-[400] w-[80vw] max-w-[320px] bg-[#f4f3f0] flex flex-col'
            >
              {/* Drawer header */}
              <div className='flex items-center justify-between h-16 px-6 border-b border-[rgba(26,25,22,0.1)]'>
                <Link
                  href='/'
                  onClick={closeMobileMenu}
                  className='text-[15px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
                >
                  Hopla<span className='text-[10px] font-normal'> studio</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className='w-10 h-10 flex items-center justify-center text-[#6b6963] hover:text-[#1a1916] text-[22px] bg-transparent border-0 cursor-pointer -mr-2'
                  aria-label='Zamknij menu'
                >
                  ×
                </button>
              </div>

              {/* Drawer links */}
              <nav className='flex flex-col flex-1 px-6 pt-8 pb-10 gap-0'>
                {[
                  { href: "#kolekcja", label: "Kolekcja", sub: "8 obiektów" },
                  {
                    href: "#architekci",
                    label: "Architekci",
                    sub: "Współpraca",
                  },
                  {
                    href: "/o-marce",
                    label: "O marce",
                    sub: "Historia i filozofia",
                  },
                ].map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.12 + i * 0.07,
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className='flex items-center justify-between py-5 border-b border-[rgba(26,25,22,0.08)] no-underline group'
                  >
                    <div>
                      <span className='block text-[18px] font-light tracking-[-0.02em] text-[#1a1916] group-hover:font-normal transition-all duration-200'>
                        {link.label}
                      </span>
                      <span className='block text-[11px] font-normal tracking-[0.06em] text-[#b8b5b0] mt-0.5'>
                        {link.sub}
                      </span>
                    </div>
                    <span className='text-[16px] text-[#b8b5b0] group-hover:text-[#1a1916] group-hover:translate-x-1 transition-all duration-200'>
                      →
                    </span>
                  </motion.a>
                ))}

                {/* Spacer */}
                <div className='flex-1' />

                {/* Bottom CTA */}
                <motion.button
                  onClick={() => {
                    closeMobileMenu();
                    openContactModal();
                  }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.36,
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className='w-full inline-flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.1em] uppercase bg-[#1a1916] text-[#f4f3f0] py-4 px-6 cursor-pointer border-0'
                >
                  Zapytaj o wycenę →
                </motion.button>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.44, duration: 0.5 }}
                  className='text-center text-[11px] text-[#b8b5b0] tracking-[0.04em] mt-5'
                >
                  hello@hopla.studio
                </motion.p>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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
        <div className='relative overflow-hidden max-[900px]:h-[70vw] max-[480px]:h-[80vw]'>
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
          {/* Mobile scroll indicator */}
          <div className='scroll-hint absolute bottom-5 left-1/2 hidden max-[900px]:flex items-center justify-center z-10'>
            <div className='w-9 h-9 flex items-center justify-center bg-[rgba(244,243,240,0.82)] backdrop-blur-sm rounded-full text-[15px] text-[#1a1916] shadow-sm'>
              ↓
            </div>
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
        <div className='flex items-baseline justify-between px-10 max-[900px]:px-5 pt-12 pb-8 border-b border-[rgba(26,25,22,0.1)]'>
          <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1916]'>
            Kolekcja
          </span>
          <div className='flex items-center gap-3'>
            <span className='hidden max-[900px]:flex items-center gap-1 text-[10px] font-normal tracking-[0.1em] uppercase text-[#b8b5b0]'>
              przesuwaj <span className='opacity-60'>→</span>
            </span>
            <span className='text-[12px] font-normal text-[#b8b5b0] max-[900px]:hidden'>
              {COLLECTION.length} obiektów
            </span>
          </div>
        </div>

        <div className='coll-carousel-wrap max-[900px]:relative'>
          <motion.div
            className='grid grid-cols-4 max-[900px]:flex max-[900px]:overflow-x-auto max-[900px]:snap-x max-[900px]:snap-mandatory mobile-carousel coll-carousel-track'
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
                      className='coll-item group sr border-r border-[rgba(26,25,22,0.1)] [&:nth-child(4n)]:border-r-0 max-[900px]:flex-none max-[900px]:w-[84vw] max-[900px]:snap-center relative overflow-hidden'
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
                              transition={{ duration: 0.5 }}
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

                          {/* Gallery dot indicators — desktop hover only, hidden on mobile */}
                          {images.length > 1 && (
                            <div className='absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 opacity-0 group-hover:opacity-100 max-[900px]:hidden transition-opacity duration-500'>
                              {images.map((_, di) => (
                                <span
                                  key={di}
                                  className={`block w-1 h-1 rounded-full transition-all duration-300 ${di === imgIdx ? "bg-[#1a1916] scale-125" : "bg-[rgba(26,25,22,0.3)]"}`}
                                />
                              ))}
                            </div>
                          )}

                          {/* View overlay — visible on hover (desktop) */}
                          <div className='absolute inset-0 bg-[rgba(26,25,22,0)] group-hover:bg-[rgba(26,25,22,0.18)] max-[900px]:bg-transparent transition-colors duration-400 z-10' />
                          {/* Mobile tap hint icon — top right corner */}
                          <span
                            className='hidden max-[900px]:flex absolute top-3 right-3 z-20 items-center justify-center w-8 h-8 bg-[rgba(26,25,22,0.55)] backdrop-blur-sm text-[#f4f3f0] rounded-full'
                            aria-hidden='true'
                          >
                            <MoveUpRight className='w-3 h-3' />
                          </span>
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
                            <div className='flex gap-1 opacity-0 group-hover:opacity-100 max-[900px]:hidden transition-opacity duration-300'>
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
            {/* Carousel leading/trailing spacers for snap-center edge cards */}
            <div
              className='hidden max-[900px]:block flex-none w-[8vw] shrink-0 order-first'
              aria-hidden='true'
            />
            <div
              className='hidden max-[900px]:block flex-none w-[8vw] shrink-0'
              aria-hidden='true'
            />
          </motion.div>
        </div>

        {/* SHOW MORE / LESS */}
        {/* Desktop */}
        <div className='max-[900px]:hidden flex justify-center py-10 border-t border-[rgba(26,25,22,0.1)]'>
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

        {/* Mobile — full-width strip */}
        <div className='hidden max-[900px]:block border-t border-[rgba(26,25,22,0.1)]'>
          {/* Progress bar */}
          <div className='h-[2px] bg-[rgba(26,25,22,0.06)]'>
            <motion.div
              className='h-full bg-[#1a1916]'
              animate={{
                width: showAllItems
                  ? "100%"
                  : `${(4 / COLLECTION.length) * 100}%`,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className='flex items-center justify-between px-5 py-4'>
            <div>
              <p className='text-[10px] font-normal tracking-[0.12em] uppercase text-[#b8b5b0] mb-0.5'>
                Kolekcja
              </p>
              <p className='text-[13px] font-light text-[#1a1916]'>
                <AnimatePresence mode='wait'>
                  <motion.span
                    key={showAllItems ? "all" : "some"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25 }}
                    className='inline-block'
                  >
                    {showAllItems
                      ? `Wszystkie ${COLLECTION.length}`
                      : `4 z ${COLLECTION.length}`}{" "}
                    <span className='text-[#b8b5b0]'>obiektów</span>
                  </motion.span>
                </AnimatePresence>
              </p>
            </div>
            <button
              onClick={() => setShowAllItems((v) => !v)}
              className='flex items-center bg-[#1a1916] text-[#f4f3f0] text-[11px] font-medium tracking-[0.1em] uppercase px-5 py-3.5 active:opacity-70 transition-opacity duration-100 border-0 cursor-pointer'
            >
              <AnimatePresence mode='wait'>
                <motion.span
                  key={showAllItems ? "less" : "more"}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  {showAllItems
                    ? "Pokaż mniej"
                    : `+${COLLECTION.length - 4} więcej`}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </section>

      {/* COLLECTION MODAL */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
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
              onTouchStart={(e) => {
                modalSwipeStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                if (modalSwipeStartY.current === null) return;
                const dy =
                  e.changedTouches[0].clientY - modalSwipeStartY.current;
                modalSwipeStartY.current = null;
                if (dy > 72) closeModal();
              }}
            >
              {/* Mobile drag handle */}
              <div className='hidden max-[900px]:block bg-[#f4f3f0] pt-1 pb-0 shrink-0'>
                <div className='modal-drag-handle' aria-hidden='true' />
              </div>
              {/* LEFT — image gallery */}
              <div
                className='relative flex-1 bg-[#eceae5] overflow-hidden min-h-[480px] max-[900px]:flex-none max-[900px]:min-h-0 max-[900px]:h-[58vw]'
                onTouchStart={(e) => {
                  modalImageSwipeStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (modalImageSwipeStartX.current === null) return;
                  const dx =
                    e.changedTouches[0].clientX - modalImageSwipeStartX.current;
                  modalImageSwipeStartX.current = null;
                  if (Math.abs(dx) > 40) advanceModalImg(dx < 0 ? 1 : -1);
                }}
              >
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
                      className='object-cover object-center'
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev/Next arrows — desktop only */}
                {modalItem.images.length > 1 && (
                  <>
                    <button
                      onClick={() => advanceModalImg(-1)}
                      className='modal-arrow-btn max-[900px]:hidden absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[rgba(244,243,240,0.85)] backdrop-blur-sm text-[#1a1916] hover:bg-[#f4f3f0] transition-all duration-200 text-[16px] z-20'
                      aria-label='Poprzednie zdjęcie'
                    >
                      ←
                    </button>
                    <button
                      onClick={() => advanceModalImg(1)}
                      className='modal-arrow-btn max-[900px]:hidden absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[rgba(244,243,240,0.85)] backdrop-blur-sm text-[#1a1916] hover:bg-[#f4f3f0] transition-all duration-200 text-[16px] z-20'
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
                </div>

                {/* Image counter */}
                <div className='absolute top-4 left-4 z-20 text-[10px] font-medium tracking-[0.14em] uppercase text-[#f4f3f0] bg-[rgba(26,25,22,0.5)] px-3 py-1.5 backdrop-blur-sm'>
                  {modalImgIdx + 1} / {modalItem.images.length}
                </div>
              </div>

              {/* Mobile — dots + swipe hint strip */}
              {modalItem.images.length > 1 && (
                <div className='hidden max-[900px]:flex items-center justify-between px-5 py-3 bg-[#f4f3f0] border-b border-[rgba(26,25,22,0.08)] shrink-0'>
                  <div className='flex items-center gap-1.5'>
                    {modalItem.images.map((_, ti) => (
                      <button
                        key={ti}
                        onClick={() => setModalImgIdx(ti)}
                        className='flex items-center justify-center w-4 h-4'
                        aria-label={`Zdjęcie ${ti + 1}`}
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ${ti === modalImgIdx ? "w-1.5 h-1.5 bg-[#1a1916]" : "w-1 h-1 bg-[rgba(26,25,22,0.25)]"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className='text-[10px] font-normal tracking-[0.12em] uppercase text-[#b8b5b0]'>
                    ← przesuń →
                  </span>
                </div>
              )}

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
                  <button
                    onClick={() => {
                      closeModal();
                      openContactModal();
                    }}
                    className='modal-cta w-full inline-flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.1em] uppercase bg-[#1a1916] text-[#f4f3f0] py-4 px-6 cursor-pointer border-0 transition-opacity duration-200 hover:opacity-80'
                  >
                    Zapytaj o wycenę →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PRINCIPLES STRIP */}
      <section className='grid grid-cols-5 border-b border-[rgba(26,25,22,0.1)] bg-[#f4f3f0] max-[900px]:flex max-[900px]:overflow-x-auto max-[900px]:snap-x max-[900px]:snap-mandatory mobile-carousel'>
        {PRINCIPLES.map(({ num, name, desc }, i) => (
          <div
            key={num}
            className={`value-card sr pr-item px-7 max-[900px]:px-7 py-10 max-[900px]:py-10 border-r border-[rgba(26,25,22,0.1)] cursor-default max-[900px]:flex-none max-[900px]:w-[78vw] max-[900px]:snap-start max-[900px]:shrink-0${i === 4 ? " max-[900px]:border-r-0" : ""}`}
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
          <button
            onClick={openContactModal}
            className='mat-cta sr inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-[14px] px-6 self-start mt-10 cursor-pointer border-0'
          >
            Zapytaj o materiał →
          </button>
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
            <button
              ref={archMagnetRef as React.RefObject<HTMLButtonElement>}
              onClick={openContactModal}
              className='magnetic-btn arch-btn inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.1em] uppercase text-[rgba(244,243,240,0.9)] border-b border-[rgba(244,243,240,0.3)] pb-1 w-fit max-[900px]:!transform-none bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer'
              onMouseMove={
                handleArchMagnet as unknown as React.MouseEventHandler<HTMLButtonElement>
              }
              onMouseLeave={handleArchMagnetLeave}
            >
              Skontaktuj się w sprawie specyfikacji →
            </button>
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

      {/* CONTACT MODAL */}
      <AnimatePresence>
        {contactModalOpen && (
          <motion.div
            key='contact-backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-[600] flex items-end justify-center max-[900px]:items-end min-[901px]:items-center bg-[rgba(10,10,9,0.75)] backdrop-blur-[8px]'
            onClick={closeContactModal}
          >
            <motion.div
              key='contact-panel'
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className='relative w-full max-w-[960px] max-h-[96dvh] flex max-[900px]:flex-col min-[901px]:flex-row overflow-hidden bg-[#f4f3f0] max-[900px]:rounded-t-2xl min-[901px]:rounded-none'
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                modalSwipeStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                if (modalSwipeStartY.current === null) return;
                const dy =
                  e.changedTouches[0].clientY - modalSwipeStartY.current;
                modalSwipeStartY.current = null;
                if (dy > 72) closeContactModal();
              }}
            >
              {/* Mobile drag handle */}
              <div className='hidden max-[900px]:flex absolute top-0 left-0 right-0 z-10 justify-center pt-2.5'>
                <div className='modal-drag-handle mx-auto' />
              </div>

              {/* Close button */}
              <button
                onClick={closeContactModal}
                className='absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-[20px] text-[#6b6963] hover:text-[#1a1916] hover:bg-[rgba(26,25,22,0.06)] transition-all duration-200 bg-transparent border-0 cursor-pointer rounded-sm'
                aria-label='Zamknij'
              >
                ×
              </button>

              {/* LEFT — dark info panel */}
              <div className='bg-[#1a1916] flex flex-col justify-between px-10 py-12 max-[900px]:px-6 max-[900px]:py-10 max-[900px]:pt-14 min-[901px]:w-[300px] min-[901px]:shrink-0'>
                <div>
                  <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[rgba(244,243,240,0.3)] mb-8'>
                    Kontakt
                  </p>
                  <h2 className='text-[clamp(22px,2.8vw,36px)] font-light leading-[1.12] tracking-[-0.03em] text-[rgba(244,243,240,0.92)] mb-4'>
                    Zacznijmy tworzyć razem.
                  </h2>
                  <p className='text-[13px] font-normal leading-[1.75] text-[rgba(244,243,240,0.4)] max-[900px]:hidden'>
                    Opisz projekt — odpiszemy w ciągu 24h z wyceną.
                  </p>
                </div>
                <div className='mt-8 space-y-1 max-[900px]:hidden'>
                  {[
                    {
                      label: "Email",
                      value: "hello@hopla.studio",
                      href: "mailto:hello@hopla.studio",
                    },
                    { label: "Instagram", value: "@hopla.studio", href: "#" },
                    {
                      label: "Lokalizacja",
                      value: "Warszawa, Polska",
                      href: null,
                    },
                  ].map(({ label, value, href }) => (
                    <div
                      key={label}
                      className='flex justify-between items-center py-3 border-b border-[rgba(244,243,240,0.07)]'
                    >
                      <span className='text-[10px] tracking-[0.12em] uppercase text-[rgba(244,243,240,0.28)]'>
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className='text-[12px] text-[rgba(244,243,240,0.6)] no-underline hover:text-[rgba(244,243,240,0.9)] transition-colors duration-150 flex items-center gap-1.5 group'
                        >
                          {" "}
                          <MoveUpRight className='w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity' />
                          {value}
                        </a>
                      ) : (
                        <span className='text-[12px] text-[rgba(244,243,240,0.6)]'>
                          {value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT — form */}
              <div className='flex-1 overflow-y-auto bg-[#fafaf8] px-10 py-12 max-[900px]:px-6 max-[900px]:py-8'>
                <AnimatePresence mode='wait'>
                  {formState === "success" ? (
                    <motion.div
                      key='success'
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className='flex flex-col items-center justify-center text-center py-16 gap-6 h-full'
                    >
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.1,
                          duration: 0.6,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className='w-16 h-16 rounded-full bg-[#1a1916] flex items-center justify-center'
                      >
                        <motion.svg
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='#f4f3f0'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <motion.polyline
                            points='20 6 9 17 4 12'
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{
                              delay: 0.4,
                              duration: 0.5,
                              ease: "easeOut",
                            }}
                          />
                        </motion.svg>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                      >
                        <p className='text-[22px] font-light tracking-[-0.02em] text-[#1a1916] mb-2'>
                          Wiadomość wysłana
                        </p>
                        <p className='text-[13px] font-normal leading-[1.7] text-[#6b6963]'>
                          Odpiszemy w ciągu 24 godzin.
                        </p>
                      </motion.div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.3 }}
                        onClick={closeContactModal}
                        className='text-[11px] font-medium tracking-[0.1em] uppercase text-[#b8b5b0] hover:text-[#1a1916] transition-colors duration-200 mt-1 bg-transparent border-0 cursor-pointer'
                      >
                        Zamknij →
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key='form'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      onSubmit={handleFormSubmit}
                      className='flex flex-col gap-7'
                    >
                      <div>
                        <p className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8b5b0] mb-3'>
                          Temat zapytania
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {[
                            "Mebel na wymiar",
                            "Projekt architektoniczny",
                            "Współpraca",
                            "Inne",
                          ].map((topic) => (
                            <button
                              key={topic}
                              type='button'
                              onClick={() =>
                                setFormTopic((t) =>
                                  t === topic ? null : topic,
                                )
                              }
                              className={`contact-topic-pill text-[11px] font-normal tracking-[0.08em] px-4 py-2 border transition-all duration-200 ${
                                formTopic === topic
                                  ? "bg-[#1a1916] text-[#f4f3f0] border-[#1a1916]"
                                  : "bg-transparent text-[#6b6963] border-[rgba(26,25,22,0.15)] hover:border-[#1a1916] hover:text-[#1a1916]"
                              }`}
                            >
                              {topic}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className='grid grid-cols-2 gap-6 max-[480px]:grid-cols-1'>
                        <div className='contact-field-wrap'>
                          <input
                            type='text'
                            name='name'
                            id='cm-name'
                            placeholder=' '
                            required
                            value={formData.name}
                            onChange={handleFormChange}
                            className='contact-field peer'
                          />
                          <label htmlFor='cm-name' className='contact-label'>
                            Imię i nazwisko
                          </label>
                        </div>
                        <div className='contact-field-wrap'>
                          <input
                            type='email'
                            name='email'
                            id='cm-email'
                            placeholder=' '
                            required
                            value={formData.email}
                            onChange={handleFormChange}
                            className='contact-field peer'
                          />
                          <label htmlFor='cm-email' className='contact-label'>
                            Adres email
                          </label>
                        </div>
                      </div>

                      <div className='contact-field-wrap'>
                        <textarea
                          name='message'
                          id='cm-message'
                          placeholder=' '
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleFormChange}
                          className='contact-field peer resize-none'
                        />
                        <label htmlFor='cm-message' className='contact-label'>
                          Opisz projekt
                        </label>
                      </div>

                      <div className='flex items-center justify-between gap-4 max-[480px]:flex-col max-[480px]:items-start'>
                        <p className='text-[11px] font-normal leading-[1.6] text-[#b8b5b0] max-w-[220px] max-[480px]:max-w-none'>
                          Dane używane wyłącznie do kontaktu w sprawie projektu.
                        </p>
                        <button
                          type='submit'
                          disabled={formState === "sending"}
                          className='contact-submit shrink-0 relative inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.1em] uppercase bg-[#1a1916] text-[#f4f3f0] py-4 px-8 overflow-hidden disabled:opacity-70 transition-opacity duration-200 max-[480px]:w-full max-[480px]:justify-center'
                        >
                          <AnimatePresence mode='wait'>
                            {formState === "sending" ? (
                              <motion.span
                                key='sending'
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                className='flex items-center gap-2'
                              >
                                <span className='contact-spinner' />
                                Wysyłanie…
                              </motion.span>
                            ) : (
                              <motion.span
                                key='idle'
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                              >
                                Wyślij wiadomość →
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer
        className='pt-16 px-10 pb-10 bg-[#f4f3f0] max-[900px]:px-6 max-[900px]:pt-12 max-[900px]:pb-32'
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
      {/* MOBILE STICKY CTA BAR */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            key='sticky-bar'
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className='fixed bottom-0 inset-x-0 z-[150] hidden max-[900px]:flex flex-col mobile-sticky-bar'
          >
            <div className='bg-[rgba(244,243,240,0.96)] backdrop-blur-[16px] border-t border-[rgba(26,25,22,0.12)] px-5 py-3.5 flex items-center gap-4'>
              <div className='flex-1 min-w-0'>
                <p className='text-[10px] font-medium tracking-[0.12em] uppercase text-[#b8b5b0] mb-0.5'>
                  Hopla Studio
                </p>
                <p className='text-[12px] font-light tracking-[-0.01em] text-[#1a1916] truncate'>
                  Meble stalowe na wymiar
                </p>
              </div>
              <button
                onClick={openContactModal}
                className='touch-press shrink-0 inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.08em] uppercase bg-[#1a1916] text-[#f4f3f0] py-3 px-5 border-0 cursor-pointer active:opacity-70 transition-opacity duration-100'
              >
                Kontakt →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

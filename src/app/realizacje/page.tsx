"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import { SiteFooter } from "@/components/SiteFooter";

const PROJECTS = [
  {
    id: 1,
    title: "Apartament Mokotów",
    location: "Warszawa",
    year: "2025",
    category: "Rezydencja prywatna",
    desc: "Kompletne umeblowanie salonu i jadalni. Stolik kawowy Plane 01, ławka Slab 01 oraz system półek Grid 01.",
    images: ["/landing/collection-01.jpeg", "/landing/collection-02.jpeg"],
    items: ["Plane 01", "Slab 01", "Grid 01 ×3"],
  },
  {
    id: 2,
    title: "Biuro architektoniczne",
    location: "Kraków",
    year: "2025",
    category: "Przestrzeń biurowa",
    desc: "Strefa recepcji i open space. Konsola Frame 01 na ścianie wejściowej, wieszak Tower 01.",
    images: ["/landing/collection-02.jpeg", "/landing/collection-03.jpeg"],
    items: ["Frame 01 ×2", "Tower 01"],
  },
  {
    id: 3,
    title: "Dom jednorodzinny",
    location: "Poznań",
    year: "2024",
    category: "Rezydencja prywatna",
    desc: "Projekt sypialni i gabinetu. Zestaw stolików bocznych Mono 01 oraz elementy na wymiar.",
    images: ["/landing/collection-03.jpeg", "/landing/collection-04.jpeg"],
    items: ["Mono 01 ×2", "Projekt custom"],
  },
  {
    id: 4,
    title: "Penthouse Śródmieście",
    location: "Warszawa",
    year: "2024",
    category: "Rezydencja prywatna",
    desc: "Realizacja na wymiar dla piętrowego apartamentu. Balustrada stalowa i meble towarzyszące z kolekcji.",
    images: ["/landing/collection-04.jpeg", "/landing/collection-01.jpeg"],
    items: ["Arc 01 ×4", "Balustrada custom", "Plane 01"],
  },
  {
    id: 5,
    title: "Showroom odzieżowy",
    location: "Gdańsk",
    year: "2024",
    category: "Komercja",
    desc: "Zestaw ekspozycyjny do showroomu marki modowej. Wieszaki Tower 01 i system półek Grid 01.",
    images: ["/landing/material.jpeg", "/landing/collection-02.jpeg"],
    items: ["Tower 01 ×6", "Grid 01 ×4"],
  },
  {
    id: 6,
    title: "Loft Wola",
    location: "Warszawa",
    year: "2023",
    category: "Rezydencja prywatna",
    desc: "Adaptacja poprzemysłowej przestrzeni. Stalowe elementy uzupełniające surową architekturę budynku.",
    images: ["/landing/collection-01.jpeg", "/landing/material.jpeg"],
    items: ["Block 01 ×6", "Slab 01 ×2", "Frame 01"],
  },
  {
    id: 7,
    title: "Apartament Żoliborz",
    location: "Warszawa",
    year: "2023",
    category: "Rezydencja prywatna",
    desc: "Minimalistyczna aranżacja sypialni i gabinetu z elementami stalowymi na wymiar.",
    images: ["/landing/collection-02.jpeg", "/landing/collection-04.jpeg"],
    items: ["Mono 01", "Frame 01 ×2"],
  },
  {
    id: 8,
    title: "Pracownia projektowa",
    location: "Wrocław",
    year: "2022",
    category: "Przestrzeń biurowa",
    desc: "System organizacji przestrzeni roboczej oparty na modularnym Grid 01.",
    images: ["/landing/collection-03.jpeg", "/landing/collection-01.jpeg"],
    items: ["Grid 01 ×8", "Tower 01 ×2"],
  },
];

const CATEGORIES = ["Rezydencja prywatna", "Przestrzeń biurowa", "Komercja"];

export default function RealizacjePage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalKey, setContactModalKey] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);
  const [projectImgIdx, setProjectImgIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [cardImgIdx, setCardImgIdx] = useState<Record<number, number>>({});
  const modalSwipeStartY = useRef<number | null>(null);
  const modalImageSwipeStartX = useRef<number | null>(null);
  const cardSwipeStartX = useRef<number | null>(null);
  const cardDidSwipe = useRef(false);

  const openContactModal = useCallback(() => {
    setContactModalKey((k) => k + 1);
    setContactModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  const openProject = useCallback((project: (typeof PROJECTS)[0]) => {
    setSelectedProject(project);
    setProjectImgIdx(0);
    document.body.style.overflow = "hidden";
  }, []);

  const closeProject = useCallback(() => {
    setSelectedProject(null);
    document.body.style.overflow = "";
  }, []);

  const advanceProjectImg = useCallback(
    (dir: 1 | -1) => {
      if (!selectedProject) return;
      const len = selectedProject.images.length;
      setProjectImgIdx((i) => (i + dir + len) % len);
    },
    [selectedProject],
  );

  const advanceCardImg = useCallback(
    (e: React.MouseEvent, id: number, dir: 1 | -1, len: number) => {
      e.preventDefault();
      e.stopPropagation();
      setCardImgIdx((prev) => ({
        ...prev,
        [id]: ((prev[id] ?? 0) + dir + len) % len,
      }));
    },
    [],
  );

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeProject();
        closeContactModal();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeProject, closeContactModal]);

  const filtered = activeCategory
    ? PROJECTS.filter((p) => p.category === activeCategory)
    : PROJECTS;

  // Scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            if (e.target.classList.contains("sr")) {
              const siblings =
                e.target.parentElement?.querySelectorAll(".sr:not(.on)");
              let delay = 0;
              siblings?.forEach((s, si) => {
                if (s === e.target) delay = si * 90;
              });
              setTimeout(() => e.target.classList.add("on"), delay);
            } else {
              e.target.classList.add("on");
            }
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".sr, .stat-block, .section-enter")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [filtered]);

  return (
    <>
      {/* NAV */}
      <nav className='fixed inset-x-0 top-0 z-[200] h-16 grid grid-cols-3 items-center px-10 bg-[rgba(244,243,240,0.88)] backdrop-blur-[16px] border-b border-[rgba(26,25,22,0.1)] max-[900px]:px-5'>
        <div>
          <Link
            href='/'
            className='text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b6963] no-underline hover:text-[#1a1916] transition-colors duration-200 flex items-center gap-2'
          >
            ← Powrót
          </Link>
        </div>
        <div className='flex justify-center'>
          <Link
            href='/'
            className='text-[15px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
          >
            Hopla<span className='text-[10px] font-normal'> studio</span>
          </Link>
        </div>
        <div />
      </nav>

      <main className='bg-[#f4f3f0] min-h-screen pt-16'>
        {/* SECTION HEADER — same pattern as kolekcja on main page */}
        <div className='section-enter flex items-baseline justify-between px-10 max-[900px]:px-5 pt-12 pb-8 border-b border-[rgba(26,25,22,0.1)]'>
          <span className='text-[11px] font-medium tracking-[0.14em] uppercase text-[#1a1916]'>
            Realizacje
          </span>
          <div className='flex items-center gap-6'>
            <span className='stat-block text-[12px] font-normal text-[#b8b5b0]'>
              {PROJECTS.length} projektów
            </span>
            <span className='text-[11px] font-normal text-[#b8b5b0]'>
              2022–2025
            </span>
          </div>
        </div>

        {/* FILTER BAR */}
        <div className='flex items-center px-10 max-[900px]:px-5 border-b border-[rgba(26,25,22,0.1)] overflow-hidden'>
          <button
            onClick={() => setActiveCategory(null)}
            className={`shrink-0 text-[10px] font-medium tracking-[0.14em] uppercase py-4 mr-8 border-0 bg-transparent cursor-pointer transition-colors duration-200 border-b-[1.5px] -mb-px ${
              activeCategory === null
                ? "text-[#1a1916] border-[#1a1916]"
                : "text-[#b8b5b0] border-transparent hover:text-[#6b6963]"
            }`}
          >
            Wszystkie
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={`shrink-0 text-[10px] font-medium tracking-[0.14em] uppercase py-4 mr-8 border-0 bg-transparent cursor-pointer transition-colors duration-200 border-b-[1.5px] -mb-px ${
                activeCategory === cat
                  ? "text-[#1a1916] border-[#1a1916]"
                  : "text-[#b8b5b0] border-transparent hover:text-[#6b6963]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PROJECT GRID */}
        <section className='border-b border-[rgba(26,25,22,0.1)]'>
          <div className='grid grid-cols-4 max-[900px]:grid-cols-2 max-[900px]:gap-px max-[900px]:bg-[rgba(26,25,22,0.1)]'>
            {filtered.map((project, idx) => {
              const imgIdx = cardImgIdx[project.id] ?? 0;
              return (
                <div
                  key={project.id}
                  className='coll-item group sr border-r border-[rgba(26,25,22,0.1)] [&:nth-child(4n)]:border-r-0 max-[900px]:border-0 max-[900px]:bg-[#f4f3f0] relative overflow-hidden flex flex-col'
                >
                  {/* Image zone — click opens modal */}
                  <button
                    className='w-full text-left cursor-pointer bg-transparent border-0 p-0 block'
                    onClick={() => {
                      if (cardDidSwipe.current) {
                        cardDidSwipe.current = false;
                        return;
                      }
                      openProject(project);
                    }}
                    aria-label={`Otwórz: ${project.title}`}
                  >
                    <div
                      className='aspect-[3/4] overflow-hidden bg-[#eceae5] relative'
                      onTouchStart={(e) => {
                        cardSwipeStartX.current = e.touches[0].clientX;
                        cardDidSwipe.current = false;
                      }}
                      onTouchEnd={(e) => {
                        if (cardSwipeStartX.current === null) return;
                        const dx =
                          e.changedTouches[0].clientX - cardSwipeStartX.current;
                        cardSwipeStartX.current = null;
                        if (Math.abs(dx) > 40 && project.images.length > 1) {
                          cardDidSwipe.current = true;
                          setCardImgIdx((prev) => ({
                            ...prev,
                            [project.id]:
                              ((prev[project.id] ?? 0) +
                                (dx < 0 ? 1 : -1) +
                                project.images.length) %
                              project.images.length,
                          }));
                        }
                      }}
                    >
                      {/* Number overlay */}
                      <span className='coll-num-overlay' aria-hidden='true'>
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Image crossfade */}
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
                            src={project.images[imgIdx]}
                            alt={`${project.title} - zdjęcie ${imgIdx + 1}`}
                            fill
                            className='coll-img-inner'
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Dot indicators */}
                      {project.images.length > 1 && (
                        <div className='absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1 z-20 max-[900px]:opacity-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500'>
                          {project.images.map((_, di) => (
                            <span
                              key={di}
                              className={`block rounded-full transition-all duration-300 ${
                                di === imgIdx
                                  ? "w-1.5 h-1.5 bg-[#1a1916]"
                                  : "w-1 h-1 bg-[rgba(26,25,22,0.35)]"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Hover overlay */}
                      <div className='absolute inset-0 bg-[rgba(26,25,22,0)] group-hover:bg-[rgba(26,25,22,0.18)] max-[900px]:bg-transparent transition-colors duration-400 z-10' />

                      {/* Mobile tap hint */}
                      <span
                        className='hidden max-[900px]:flex absolute top-2 right-2 z-20 items-center justify-center w-6 h-6 bg-[rgba(26,25,22,0.5)] backdrop-blur-sm text-[#f4f3f0] rounded-full'
                        aria-hidden='true'
                      >
                        <MoveUpRight className='w-2.5 h-2.5' />
                      </span>
                    </div>
                  </button>

                  {/* Card footer */}
                  <div className='flex justify-between items-center px-4 max-[900px]:px-3 h-[72px] max-[900px]:h-[58px] shrink-0 border-t border-[rgba(26,25,22,0.1)]'>
                    <div>
                      <p className='text-[13px] max-[900px]:text-[11px] font-normal tracking-[-0.01em] text-[#1a1916] mb-0.5'>
                        {project.title}
                      </p>
                      <p className='text-[10px] font-normal tracking-[0.1em] uppercase text-[#b8b5b0]'>
                        {project.location} · {project.year}
                      </p>
                    </div>
                    <div className='flex items-center gap-1.5'>
                      {project.images.length > 1 && (
                        <div className='flex gap-1 opacity-0 group-hover:opacity-100 max-[900px]:hidden transition-opacity duration-300'>
                          <button
                            onClick={(e) =>
                              advanceCardImg(
                                e,
                                project.id,
                                -1,
                                project.images.length,
                              )
                            }
                            className='coll-nav-btn w-8 h-8 flex items-center justify-center border border-[rgba(26,25,22,0.15)] text-[#6b6963] hover:border-[#1a1916] hover:bg-[#1a1916] hover:text-[#f4f3f0] transition-all duration-200 text-[11px] cursor-pointer bg-transparent'
                            aria-label='Poprzednie zdjęcie'
                          >
                            ←
                          </button>
                          <button
                            onClick={(e) =>
                              advanceCardImg(
                                e,
                                project.id,
                                1,
                                project.images.length,
                              )
                            }
                            className='coll-nav-btn w-8 h-8 flex items-center justify-center border border-[rgba(26,25,22,0.15)] text-[#6b6963] hover:border-[#1a1916] hover:bg-[#1a1916] hover:text-[#f4f3f0] transition-all duration-200 text-[11px] cursor-pointer bg-transparent'
                            aria-label='Następne zdjęcie'
                          >
                            →
                          </button>
                        </div>
                      )}
                      <button
                        onClick={() => openProject(project)}
                        className='coll-arrow max-[900px]:hidden text-[16px] text-[#b8b5b0] group-hover:text-[#1a1916] group-hover:translate-x-[3px] group-hover:translate-y-[-3px] transition-all duration-200 bg-transparent border-0 cursor-pointer px-1'
                        aria-label={`Otwórz ${project.title}`}
                      >
                        ↗
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DARK CTA — same style as architects panel */}
        <section className='grid grid-cols-2 w-full border-b border-[rgba(26,25,22,0.1)] bg-[#1a1916] overflow-hidden min-h-[360px] max-[700px]:grid-cols-1'>
          <div className='flex flex-col justify-between px-14 py-14 max-[900px]:px-8 max-[700px]:py-12'>
            <p className='text-[11px] font-normal tracking-[0.14em] uppercase text-[rgba(244,243,240,0.35)]'>
              Twój projekt
            </p>
            <div>
              <h2 className='text-[clamp(24px,3vw,42px)] font-light leading-[1.12] tracking-[-0.03em] text-[rgba(244,243,240,0.92)] mt-8 mb-5'>
                Planujecie nową przestrzeń?
              </h2>
              <p className='text-[14px] font-normal leading-[1.75] text-[rgba(244,243,240,0.45)] max-w-[380px] mb-10'>
                Chętnie stworzymy ofertę skrojoną pod Wasz projekt — zarówno
                produkty z kolekcji, jak i elementy wykonywane na wymiar.
              </p>
              <button
                onClick={openContactModal}
                className='inline-flex items-center gap-[10px] text-[11px] font-medium tracking-[0.1em] uppercase text-[rgba(244,243,240,0.9)] border-b border-[rgba(244,243,240,0.3)] pb-1 w-fit bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer'
              >
                Omów projekt →
              </button>
            </div>
          </div>

          <div className='grid grid-cols-2 border-l border-[rgba(244,243,240,0.08)] max-[700px]:border-l-0 max-[700px]:border-t border-[rgba(244,243,240,0.08)]'>
            {[
              { v: "15+", l: "Lat realizacji" },
              { v: "40+", l: "Projektów" },
              { v: "100%", l: "Polska produkcja" },
              { v: "4.9★", l: "Średnia ocena" },
            ].map(({ v, l }, i) => (
              <div
                key={l}
                className={`flex flex-col justify-end px-10 py-10 max-[900px]:px-7 ${
                  i % 2 === 0 ? "border-r border-[rgba(244,243,240,0.08)]" : ""
                } ${i < 2 ? "border-b border-[rgba(244,243,240,0.08)]" : ""}`}
              >
                <span className='block text-[32px] font-light tracking-[-0.03em] text-[rgba(244,243,240,0.9)] leading-none mb-2'>
                  {v}
                </span>
                <span className='text-[10px] font-normal tracking-[0.12em] uppercase text-[rgba(244,243,240,0.3)]'>
                  {l}
                </span>
              </div>
            ))}
          </div>
        </section>

        <SiteFooter onContact={openContactModal} />
      </main>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='fixed inset-0 z-[500] flex items-stretch max-[900px]:flex-col max-[900px]:justify-end bg-[rgba(10,10,9,0.82)] backdrop-blur-[6px]'
            onClick={closeProject}
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
              className='ml-auto flex w-full max-w-[1080px] bg-[#f4f3f0] overflow-hidden max-[900px]:flex-col max-[900px]:max-w-full max-[900px]:mt-auto max-[900px]:max-h-[92dvh] max-[900px]:overflow-y-auto'
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => {
                modalSwipeStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                if (modalSwipeStartY.current === null) return;
                const dy =
                  e.changedTouches[0].clientY - modalSwipeStartY.current;
                modalSwipeStartY.current = null;
                if (dy > 72) closeProject();
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
                  if (Math.abs(dx) > 40) advanceProjectImg(dx < 0 ? 1 : -1);
                }}
              >
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={projectImgIdx}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className='absolute inset-0'
                  >
                    <Image
                      src={selectedProject.images[projectImgIdx]}
                      alt={`${selectedProject.title} - zdjęcie ${projectImgIdx + 1}`}
                      fill
                      className='object-cover object-center'
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Prev/Next arrows — desktop */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => advanceProjectImg(-1)}
                      className='max-[900px]:hidden absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[rgba(244,243,240,0.85)] backdrop-blur-sm text-[#1a1916] hover:bg-[#f4f3f0] transition-all duration-200 text-[16px] z-20 border-0 cursor-pointer'
                      aria-label='Poprzednie zdjęcie'
                    >
                      ←
                    </button>
                    <button
                      onClick={() => advanceProjectImg(1)}
                      className='max-[900px]:hidden absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[rgba(244,243,240,0.85)] backdrop-blur-sm text-[#1a1916] hover:bg-[#f4f3f0] transition-all duration-200 text-[16px] z-20 border-0 cursor-pointer'
                      aria-label='Następne zdjęcie'
                    >
                      →
                    </button>
                  </>
                )}

                {/* Desktop thumbnails */}
                <div className='absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20 px-4'>
                  {selectedProject.images.map((src, ti) => (
                    <button
                      key={ti}
                      onClick={() => setProjectImgIdx(ti)}
                      className={`max-[900px]:hidden relative overflow-hidden transition-all duration-300 border-0 cursor-pointer ${
                        ti === projectImgIdx
                          ? "w-14 h-9 ring-2 ring-[#f4f3f0]"
                          : "w-9 h-9 opacity-60 hover:opacity-90"
                      }`}
                      aria-label={`Zdjęcie ${ti + 1}`}
                    >
                      <Image src={src} alt='' fill className='object-cover' />
                    </button>
                  ))}
                </div>

                {/* Image counter */}
                <div className='absolute top-4 left-4 z-20 text-[10px] font-medium tracking-[0.14em] uppercase text-[#f4f3f0] bg-[rgba(26,25,22,0.5)] px-3 py-1.5 backdrop-blur-sm'>
                  {projectImgIdx + 1} / {selectedProject.images.length}
                </div>
              </div>

              {/* Mobile dots strip */}
              {selectedProject.images.length > 1 && (
                <div className='hidden max-[900px]:flex items-center justify-center gap-4 px-5 py-3 bg-[#f4f3f0] border-b border-[rgba(26,25,22,0.08)] shrink-0'>
                  <span className='text-[10px] font-normal tracking-[0.12em] uppercase text-[#b8b5b0]'>
                    ←
                  </span>
                  <div className='flex items-center gap-1.5'>
                    {selectedProject.images.map((_, ti) => (
                      <button
                        key={ti}
                        onClick={() => setProjectImgIdx(ti)}
                        className='flex items-center justify-center w-4 h-4 border-0 bg-transparent cursor-pointer'
                        aria-label={`Zdjęcie ${ti + 1}`}
                      >
                        <span
                          className={`block rounded-full transition-all duration-300 ${ti === projectImgIdx ? "w-1.5 h-1.5 bg-[#1a1916]" : "w-1 h-1 bg-[rgba(26,25,22,0.25)]"}`}
                        />
                      </button>
                    ))}
                  </div>
                  <span className='text-[10px] font-normal tracking-[0.12em] uppercase text-[#b8b5b0]'>
                    →
                  </span>
                </div>
              )}

              {/* RIGHT — info panel */}
              <div className='w-[380px] max-[900px]:w-full flex flex-col bg-[#fafaf8] overflow-y-auto max-[900px]:overflow-y-visible shrink-0'>
                {/* Header */}
                <div className='flex items-start justify-between p-6 max-[900px]:p-5 border-b border-[rgba(26,25,22,0.1)]'>
                  <div>
                    <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#b8b5b0] mb-2'>
                      {selectedProject.category}
                    </p>
                    <h2 className='text-[26px] max-[900px]:text-[22px] font-light tracking-[-0.03em] text-[#1a1916] leading-none'>
                      {selectedProject.title}
                    </h2>
                  </div>
                  <button
                    onClick={closeProject}
                    className='w-10 h-10 max-[900px]:w-12 max-[900px]:h-12 flex items-center justify-center text-[#6b6963] hover:text-[#1a1916] hover:bg-[rgba(26,25,22,0.06)] transition-all duration-200 text-[20px] shrink-0 ml-4 border-0 bg-transparent cursor-pointer'
                    aria-label='Zamknij'
                  >
                    ×
                  </button>
                </div>

                {/* Description */}
                <div className='px-6 max-[900px]:px-5 py-5 border-b border-[rgba(26,25,22,0.1)]'>
                  <p className='text-[13px] font-normal leading-[1.75] text-[#6b6963]'>
                    {selectedProject.desc}
                  </p>
                </div>

                {/* Specs */}
                <div className='px-6 max-[900px]:px-5 py-5 flex-1'>
                  <p className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8b5b0] mb-5'>
                    Szczegóły projektu
                  </p>
                  <div className='border-t border-[rgba(26,25,22,0.1)]'>
                    {(
                      [
                        ["Lokalizacja", selectedProject.location],
                        ["Rok", selectedProject.year],
                        ["Typ", selectedProject.category],
                      ] as [string, string][]
                    ).map(([k, v]) => (
                      <div
                        key={k}
                        className='flex justify-between items-center py-3 border-b border-[rgba(26,25,22,0.1)]'
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
                  <p className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8b5b0] mt-6 mb-3'>
                    Użyte produkty
                  </p>
                  <div className='flex flex-wrap gap-1.5'>
                    {selectedProject.items.map((item) => (
                      <span
                        key={item}
                        className='text-[10px] font-normal tracking-[0.08em] uppercase text-[#6b6963] border border-[rgba(26,25,22,0.12)] px-2.5 py-1'
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className='px-6 max-[900px]:px-5 pb-6 max-[900px]:pb-8'>
                  <button
                    onClick={() => {
                      closeProject();
                      openContactModal();
                    }}
                    className='w-full inline-flex items-center justify-center gap-3 text-[11px] font-medium tracking-[0.1em] uppercase bg-[#1a1916] text-[#f4f3f0] py-4 px-6 cursor-pointer border-0 transition-opacity duration-200 hover:opacity-80'
                  >
                    Zapytaj o podobny projekt →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        key={contactModalKey}
        isOpen={contactModalOpen}
        onClose={closeContactModal}
      />
    </>
  );
}

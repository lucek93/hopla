"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ContactModal } from "@/components/ContactModal";
import { SiteFooter } from "@/components/SiteFooter";

const STEPS = [
  {
    num: "01",
    title: "Złożenie zamówienia",
    content: (
      <>
        <p>
          Zamówienia przyjmujemy drogą mailową, telefonicznie lub przez
          formularz kontaktowy na stronie.
        </p>
        <p className='mt-3'>W wiadomości prosimy podać:</p>
        <ul className='mt-3 space-y-2'>
          {[
            "wybrany produkt oraz jego wymiary (jeśli dotyczy)",
            "preferowany kolor / wykończenie",
            "adres dostawy",
            "dane do faktury (jeśli potrzebna)",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-1.5 w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "02",
    title: "Potwierdzenie i faktura proforma",
    content: (
      <>
        <p>
          Po przyjęciu zamówienia skontaktujemy się z Tobą w celu potwierdzenia
          szczegółów. Następnie wystawiamy fakturę proforma.
        </p>
        <ul className='mt-3 space-y-2'>
          {[
            "realizacja zamówienia rozpoczyna się po zaksięgowaniu wpłaty",
            "dane do przelewu podane są na fakturze proforma",
            "potwierdzenie przyjęcia do realizacji wysyłamy mailowo",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-1.5 w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "03",
    title: "Czas realizacji",
    content: (
      <>
        <p>
          Standardowy czas realizacji wynosi <strong>14 dni roboczych</strong>{" "}
          od momentu zaksięgowania płatności.
        </p>
        <p className='mt-3'>
          W przypadku produktów niestandardowych lub złożonych projektów czas
          realizacji jest ustalany indywidualnie - informujemy o tym przed
          potwierdzeniem zamówienia.
        </p>
      </>
    ),
  },
  {
    num: "04",
    title: "Pakowanie i wysyłka",
    content: (
      <p>
        Każdy produkt pakujemy starannie, zapewniając bezpieczny transport. Po
        nadaniu przesyłki przesyłamy numer do śledzenia paczki. Meble większych
        gabarytów przewożone są przez wyspecjalizowanych przewoźników.
      </p>
    ),
  },
];

export default function ZamowieniaPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalKey, setContactModalKey] = useState(0);

  const openContactModal = useCallback(() => {
    setContactModalKey((k) => k + 1);
    setContactModalOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeContactModal = useCallback(() => {
    setContactModalOpen(false);
    document.body.style.overflow = "";
  }, []);

  return (
    <>
      {/* NAV */}
      <nav className='fixed inset-x-0 top-0 z-[200] h-16 grid grid-cols-3 items-center px-10 bg-[rgba(244,243,240,0.88)] backdrop-blur-[16px] border-b border-[rgba(26,25,22,0.1)] max-[900px]:px-6'>
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

      <main className='bg-[#f4f3f0] min-h-screen pt-[72px]'>
        {/* HERO */}
        <section className='px-8 pt-16 pb-12 max-[480px]:px-5 max-[480px]:pt-10 border-b border-[rgba(26,25,22,0.08)]'>
          <div className='max-w-[900px]'>
            <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#6b6963] mb-5'>
              Informacje
            </p>
            <h1 className='text-[clamp(36px,6vw,72px)] font-light leading-[1.05] tracking-[-0.02em] text-[#1a1916] mb-7'>
              Zamówienia
              <br />
              <span className='text-[#6b6963]'>i realizacja</span>
            </h1>
            <p className='text-[15px] font-normal leading-[1.7] text-[#1a1916] max-w-[540px]'>
              Wyjaśniamy krok po kroku, jak przebiega realizacja zamówienia,
              jakie są opcje dostawy oraz zasady zwrotów i odstąpienia od umowy.
            </p>
          </div>
        </section>

        {/* PROCESS STEPS */}
        <section className='px-8 py-14 max-[480px]:px-5 border-b border-[rgba(26,25,22,0.08)]'>
          <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#6b6963] mb-10'>
            Proces zamówienia
          </p>
          <div className='grid grid-cols-4 gap-px bg-[rgba(26,25,22,0.1)] border border-[rgba(26,25,22,0.1)] max-[900px]:grid-cols-2 max-[480px]:grid-cols-1'>
            {STEPS.map((step) => (
              <div key={step.num} className='bg-[#f4f3f0] p-7 max-[480px]:p-5'>
                <span className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#6b6963] block mb-4'>
                  {step.num}
                </span>
                <h3 className='text-[15px] font-normal text-[#1a1916] mb-4 leading-[1.3]'>
                  {step.title}
                </h3>
                <div className='text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                  {step.content}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DELIVERY */}
        <section className='px-8 py-14 max-[480px]:px-5 border-b border-[rgba(26,25,22,0.08)]'>
          <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#6b6963] mb-10'>
            Dostawa
          </p>
          <div className='grid grid-cols-2 gap-px bg-[rgba(26,25,22,0.1)] border border-[rgba(26,25,22,0.1)] max-[600px]:grid-cols-1'>
            {/* Kurier */}
            <div className='bg-[#f4f3f0] p-8 max-[480px]:p-5'>
              <div className='flex items-start justify-between gap-4 mb-5'>
                <h3 className='text-[16px] font-normal text-[#1a1916]'>
                  Kurier
                </h3>
                <span className='text-[10px] font-normal tracking-[0.1em] uppercase text-[#6b6963] border border-[rgba(26,25,22,0.15)] px-2.5 py-1 shrink-0'>
                  Standardowa
                </span>
              </div>
              <p className='text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                Przesyłki kurierskie są realizowane w&nbsp;
                <strong className='text-[#1a1916] font-normal'>
                  1 dzień roboczy
                </strong>{" "}
                od nadania, maksymalnie 2 dni robocze. W&nbsp;okresie
                świątecznym i&nbsp;wzmożonego ruchu czas dostawy może wynosić
                3–4 dni robocze.
              </p>
            </div>
            {/* Paczkomaty */}
            <div className='bg-[#f4f3f0] p-8 max-[480px]:p-5'>
              <div className='flex items-start justify-between gap-4 mb-5'>
                <h3 className='text-[16px] font-normal text-[#1a1916]'>
                  Paczkomaty InPost
                </h3>
                <span className='text-[10px] font-normal tracking-[0.1em] uppercase text-[#6b6963] border border-[rgba(26,25,22,0.15)] px-2.5 py-1 shrink-0'>
                  Alternatywna
                </span>
              </div>
              <p className='text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                Dostawy do paczkomatów realizowane są w&nbsp;
                <strong className='text-[#1a1916] font-normal'>
                  1–2 dni robocze
                </strong>
                . Opcja dostępna dla produktów o&nbsp;odpowiednich wymiarach.
                Przy zamówieniu podaj wybrany paczkomat.
              </p>
            </div>
          </div>
        </section>

        {/* RETURNS */}
        <section className='px-8 py-14 max-[480px]:px-5 border-b border-[rgba(26,25,22,0.08)]'>
          <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[#6b6963] mb-10'>
            Zwroty i odstąpienie
          </p>
          <div className='space-y-0 border border-[rgba(26,25,22,0.1)]'>
            {/* Right to withdraw */}
            <div className='grid grid-cols-[200px_1fr] gap-0 border-b border-[rgba(26,25,22,0.08)] max-[600px]:grid-cols-1'>
              <div className='p-7 border-r border-[rgba(26,25,22,0.08)] max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:pb-0 max-[600px]:p-5'>
                <span className='text-[11px] font-normal tracking-[0.08em] uppercase text-[#6b6963]'>
                  Prawo do odstąpienia
                </span>
              </div>
              <div className='p-7 max-[600px]:p-5'>
                <p className='text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                  Zgodnie z&nbsp;obowiązującymi przepisami mają Państwo prawo
                  odstąpić od umowy bez podania przyczyny w&nbsp;terminie{" "}
                  <strong className='text-[#1a1916] font-normal'>14 dni</strong>{" "}
                  od dnia otrzymania produktu.
                </p>
              </div>
            </div>

            {/* How to withdraw */}
            <div className='grid grid-cols-[200px_1fr] gap-0 border-b border-[rgba(26,25,22,0.08)] max-[600px]:grid-cols-1'>
              <div className='p-7 border-r border-[rgba(26,25,22,0.08)] max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:pb-0 max-[600px]:p-5'>
                <span className='text-[11px] font-normal tracking-[0.08em] uppercase text-[#6b6963]'>
                  Jak odstąpić
                </span>
              </div>
              <div className='p-7 max-[600px]:p-5'>
                <div className='text-[13px] font-normal leading-[1.7] text-[#1a1916] space-y-2'>
                  {[
                    "Prześlij na nasz adres e-mail oświadczenie o odstąpieniu od umowy",
                    "Dołącz numer zamówienia oraz dane kontaktowe",
                    "Odeślij produkt w ciągu 14 dni od daty oświadczenia",
                    "Produkt powinien być zapakowany w sposób chroniący go przed uszkodzeniem",
                  ].map((item, i) => (
                    <div key={i} className='flex items-start gap-4'>
                      <span className='text-[10px] tracking-[0.08em] text-[#6b6963] shrink-0 mt-0.5 min-w-[18px]'>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment return */}
            <div className='grid grid-cols-[200px_1fr] gap-0 border-b border-[rgba(26,25,22,0.08)] max-[600px]:grid-cols-1'>
              <div className='p-7 border-r border-[rgba(26,25,22,0.08)] max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:pb-0 max-[600px]:p-5'>
                <span className='text-[11px] font-normal tracking-[0.08em] uppercase text-[#6b6963]'>
                  Zwrot płatności
                </span>
              </div>
              <div className='p-7 max-[600px]:p-5'>
                <p className='text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                  Zwrot należności następuje w&nbsp;ciągu{" "}
                  <strong className='text-[#1a1916] font-normal'>14 dni</strong>{" "}
                  od otrzymania oświadczenia o&nbsp;odstąpieniu, przy czym
                  możemy wstrzymać zwrot do momentu otrzymania towaru lub
                  potwierdzenia jego odesłania.
                </p>
              </div>
            </div>

            {/* Return costs */}
            <div className='grid grid-cols-[200px_1fr] gap-0 border-b border-[rgba(26,25,22,0.08)] max-[600px]:grid-cols-1'>
              <div className='p-7 border-r border-[rgba(26,25,22,0.08)] max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:pb-0 max-[600px]:p-5'>
                <span className='text-[11px] font-normal tracking-[0.08em] uppercase text-[#6b6963]'>
                  Koszty zwrotu
                </span>
              </div>
              <div className='p-7 max-[600px]:p-5'>
                <p className='text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                  Koszty odesłania produktu pokrywa klient. Zalecamy
                  skorzystanie z&nbsp;usługi przewoźnika z&nbsp;ubezpieczeniem
                  przesyłki - nie ponosimy odpowiedzialności za uszkodzenia
                  powstałe podczas transportu zwrotnego.
                </p>
              </div>
            </div>

            {/* Condition */}
            <div className='grid grid-cols-[200px_1fr] gap-0 border-b border-[rgba(26,25,22,0.08)] max-[600px]:grid-cols-1'>
              <div className='p-7 border-r border-[rgba(26,25,22,0.08)] max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:pb-0 max-[600px]:p-5'>
                <span className='text-[11px] font-normal tracking-[0.08em] uppercase text-[#6b6963]'>
                  Stan zwracanego produktu
                </span>
              </div>
              <div className='p-7 max-[600px]:p-5'>
                <ul className='space-y-2 text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                  {[
                    "produkt powinien być nieużywany lub używany wyłącznie w celu sprawdzenia jego charakteru i funkcji",
                    "kompletne oryginalne opakowanie",
                    "brak śladów trwałego użytkowania, zarysowań, uszkodzeń mechanicznych",
                    "dołącz dowód zakupu",
                  ].map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <span className='mt-1.5 w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Exclusions */}
            <div className='grid grid-cols-[200px_1fr] gap-0 max-[600px]:grid-cols-1'>
              <div className='p-7 border-r border-[rgba(26,25,22,0.08)] max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:pb-0 max-[600px]:p-5'>
                <span className='text-[11px] font-normal tracking-[0.08em] uppercase text-[#6b6963]'>
                  Wyłączenia prawa zwrotu
                </span>
              </div>
              <div className='p-7 max-[600px]:p-5'>
                <ul className='space-y-2 text-[13px] font-normal leading-[1.7] text-[#1a1916]'>
                  {[
                    "produkty wykonane na indywidualne zamówienie (niestandardowe wymiary, kolory, wykończenia)",
                    "produkty spersonalizowane lub z naniesioną modyfikacją na życzenie klienta",
                    "produkty noszące wyraźne ślady użytkowania wykraczające poza sprawdzenie towaru",
                  ].map((item) => (
                    <li key={item} className='flex items-start gap-3'>
                      <span className='mt-1.5 w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA - dark panel */}
        <section className='bg-[#1a1916] px-8 py-16 max-[480px]:px-5 max-[480px]:py-12'>
          <div className='max-w-[700px] mx-auto text-center'>
            <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[rgba(244,243,240,0.35)] mb-6'>
              Dodatkowe informacje
            </p>
            <h2 className='text-[clamp(22px,3.5vw,36px)] font-light leading-[1.2] tracking-[-0.01em] text-[#f4f3f0] mb-5'>
              Masz pytania dotyczące zamówienia?
            </h2>
            <p className='text-[13px] font-normal leading-[1.7] text-[#f4f3f0] mb-10 max-w-[420px] mx-auto'>
              Chętnie pomożemy - odpowiemy na każde pytanie dotyczące
              realizacji, dostawy lub zwrotów.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <button
                onClick={openContactModal}
                className='inline-flex items-center gap-2 text-[12px] font-normal tracking-[0.1em] uppercase text-[#1a1916] bg-[#f4f3f0] px-7 py-3.5 cursor-pointer hover:bg-white transition-colors duration-200'
              >
                Napisz do nas
              </button>
              {/* <Link
                href='/'
                className='inline-flex items-center gap-2 text-[12px] font-normal tracking-[0.1em] uppercase text-[#6b6963] no-underline hover:text-[#f4f3f0] transition-colors duration-200'
              >
                ← Wróć na stronę główną
              </Link> */}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <SiteFooter onContact={openContactModal} />
      </main>
      <ContactModal
        key={contactModalKey}
        isOpen={contactModalOpen}
        onClose={closeContactModal}
      />
    </>
  );
}

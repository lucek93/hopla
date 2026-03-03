import Link from "next/link";

const SECTIONS = [
  {
    num: "01",
    title: "Informacje ogólne",
    content: (
      <>
        <p>
          Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony
          danych osobowych użytkowników korzystających ze strony internetowej{" "}
          <a
            href='https://www.hoplastudio.cc'
            className='text-[#1a1916] underline decoration-[rgba(26,25,22,0.2)] underline-offset-2 hover:decoration-[#1a1916] transition-all'
          >
            www.hoplastudio.cc
          </a>
        </p>
        <p className='mt-4'>Administratorem danych osobowych jest:</p>
        <div className='mt-4 pl-6 border-l border-[rgba(26,25,22,0.12)] space-y-1'>
          <p className='font-medium text-[#1a1916]'>Hopla Kordian Nowak</p>
          <p>adres: Armii Krajowej 42, 35-307, Rzeszów</p>
          <p>
            e-mail:{" "}
            <a
              href='mailto:hoplastudioo@gmail.com'
              className='text-[#1a1916] underline decoration-[rgba(26,25,22,0.2)] underline-offset-2 hover:decoration-[#1a1916] transition-all'
            >
              hoplastudioo@gmail.com
            </a>
          </p>
          <p>telefon: 792 174 420</p>
          <p>NIP: 8133839852</p>
        </div>
        <p className='mt-4'>
          Administrator dokłada szczególnej staranności w celu ochrony
          prywatności użytkowników oraz przekazywanych informacji.
        </p>
      </>
    ),
  },
  {
    num: "02",
    title: "Zakres zbieranych danych",
    content: (
      <>
        <p>
          Podczas korzystania ze strony możemy przetwarzać następujące dane:
        </p>
        <ul className='mt-4 space-y-2'>
          {[
            "imię i nazwisko",
            "adres e-mail",
            "numer telefonu",
            "treść wiadomości przesłanej przez formularz kontaktowy lub e-mail",
            "dane niezbędne do przygotowania oferty lub realizacji zamówienia",
            "adres IP",
            "dane zapisywane w plikach cookies",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className='mt-4'>
          Podanie danych jest dobrowolne, jednak niezbędne do kontaktu lub
          realizacji zapytania.
        </p>
      </>
    ),
  },
  {
    num: "03",
    title: "Cel przetwarzania danych",
    content: (
      <>
        <p>Dane osobowe przetwarzane są w celu:</p>
        <ul className='mt-4 space-y-2'>
          {[
            "udzielenia odpowiedzi na zapytanie przesłane przez formularz lub e-mail,",
            "przygotowania oferty handlowej,",
            "realizacji zamówienia produktów,",
            "prowadzenia korespondencji związanej ze współpracą,",
            "marketingu własnych usług (jeżeli użytkownik wyrazi zgodę),",
            "zapewnienia prawidłowego działania strony i jej analizy statystycznej.",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "04",
    title: "Podstawa prawna przetwarzania",
    content: (
      <>
        <p>Dane przetwarzane są zgodnie z art. 6 ust. 1 RODO:</p>
        <ul className='mt-4 space-y-2'>
          {[
            "lit. A - zgoda użytkownika,",
            "lit. B - działania zmierzające do zawarcia umowy lub realizacja zamówienia,",
            "lit. F - prawnie uzasadniony interes administratora (kontakt, zabezpieczenie roszczeń, marketing własnych usług).",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "05",
    title: "Odbiorcy danych",
    content: (
      <>
        <p>
          Dane mogą być przekazywane podmiotom wspierającym administratora w
          prowadzeniu działalności, takim jak:
        </p>
        <ul className='mt-4 space-y-2'>
          {[
            "dostawca hostingu strony,",
            "dostawca poczty elektronicznej,",
            "biuro księgowe,",
            "firmy IT obsługujące systemy informatyczne.",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className='mt-4'>
          Dane nie są sprzedawane ani udostępniane podmiotom trzecim w celach
          marketingowych.
        </p>
        <p className='mt-3'>
          Jeśli wykorzystywane są narzędzia analityczne lub usługi dostawców
          spoza Europejskiego Obszaru Gospodarczego, dane mogą być przekazywane
          poza EOG zgodnie z obowiązującymi przepisami.
        </p>
      </>
    ),
  },
  {
    num: "06",
    title: "Okres przechowywania danych",
    content: (
      <>
        <p>Dane przechowywane są:</p>
        <ul className='mt-4 space-y-2'>
          {[
            "przez czas niezbędny do udzielenia odpowiedzi i prowadzenia korespondencji,",
            "przez okres realizacji współpracy lub zamówienia,",
            "przez okres wymagany przepisami prawa (np. podatkowymi),",
            "do momentu cofnięcia zgody - w przypadku przetwarzania na jej podstawie.",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    num: "07",
    title: "Prawa użytkownika",
    content: (
      <>
        <p>Użytkownik ma prawo do:</p>
        <ul className='mt-4 space-y-2'>
          {[
            "dostępu do swoich danych,",
            "sprostowania danych,",
            "usunięcia danych,",
            "ograniczenia przetwarzania,",
            "przenoszenia danych,",
            "wniesienia sprzeciwu wobec przetwarzania,",
            "cofnięcia zgody w dowolnym momencie,",
            "wniesienia skargi do Urząd Ochrony Danych Osobowych.",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className='mt-4'>
          W celu realizacji swoich praw należy skontaktować się z
          administratorem.
        </p>
      </>
    ),
  },
  {
    num: "08",
    title: "Pliki cookies",
    content: (
      <>
        <p>Strona wykorzystuje pliki cookies w celu:</p>
        <ul className='mt-4 space-y-2'>
          {[
            "zapewnienia prawidłowego działania strony,",
            "poprawy funkcjonalności,",
            "prowadzenia statystyk odwiedzin.",
          ].map((item) => (
            <li key={item} className='flex items-start gap-3'>
              <span className='mt-[6px] w-1 h-1 rounded-full bg-[#6b6963] shrink-0' />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className='mt-4'>
          Użytkownik może zarządzać plikami cookies poprzez ustawienia swojej
          przeglądarki internetowej.
        </p>
      </>
    ),
  },
  {
    num: "09",
    title: "Zabezpieczenie danych",
    content: (
      <p>
        Administrator stosuje odpowiednie środki techniczne i organizacyjne
        zapewniające ochronę przetwarzanych danych osobowych przed ich utratą,
        nieuprawnionym dostępem lub ujawnieniem.
      </p>
    ),
  },
  {
    num: "10",
    title: "Zmiany polityki prywatności",
    content: (
      <p>
        Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce
        Prywatności. Aktualna wersja dokumentu jest zawsze dostępna na stronie
        internetowej.
      </p>
    ),
  },
];

export const metadata = {
  title: "Polityka Prywatności - Hopla Studio",
  description:
    "Zasady przetwarzania i ochrony danych osobowych w Hopla Studio.",
};

export default function PolitykaPrywatnosci() {
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

      <main className='min-h-screen bg-[#f4f3f0] pt-16'>
        {/* HERO */}
        <div className='border-b border-[rgba(26,25,22,0.1)] px-10 pt-20 pb-16 max-[900px]:px-6 max-[900px]:pt-14 max-[900px]:pb-12'>
          <p className='text-[10px] font-medium tracking-[0.18em] uppercase text-[#6b6963] mb-6'>
            Dokument prawny
          </p>
          <h1 className='text-[clamp(36px,5vw,80px)] font-light leading-[1.04] tracking-[-0.04em] text-[#1a1916] mb-6'>
            Polityka
            <br />
            Prywatności
          </h1>
          <p className='text-[13px] font-normal leading-[1.7] text-[#1a1916] max-w-[440px]'>
            Dokument określający zasady przetwarzania i ochrony danych osobowych
            użytkowników serwisu.
          </p>
          {/* <p className="mt-5 text-[11px] font-normal text-[#6b6963] tracking-[0.04em]">
            Ostatnia aktualizacja: marzec 2026
          </p> */}
        </div>

        {/* QUICK NAV */}
        <div className='border-b border-[rgba(26,25,22,0.1)] px-10 py-6 max-[900px]:px-6'>
          <div className='grid grid-cols-5 max-[900px]:grid-cols-3 max-[480px]:grid-cols-2 gap-px border border-[rgba(26,25,22,0.08)]'>
            {SECTIONS.map((s) => (
              <a
                key={s.num}
                href={`#section-${s.num}`}
                className='group flex flex-col gap-1.5 px-4 py-4 no-underline hover:bg-[rgba(26,25,22,0.03)] transition-colors duration-200 border-r border-b border-[rgba(26,25,22,0.08)] last:border-r-0'
              >
                <span className='text-[10px] font-normal tabular-nums text-[#d4d1cc] group-hover:text-[#6b6963] transition-colors duration-200'>
                  {s.num}
                </span>
                <span className='text-[11px] font-medium leading-[1.35] text-[#6b6963] group-hover:text-[#1a1916] transition-colors duration-200'>
                  {s.title}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className='px-10 max-[900px]:px-6 pb-24'>
          {SECTIONS.map((section) => (
            <section
              key={section.num}
              id={`section-${section.num}`}
              className='grid grid-cols-[200px_1fr] gap-16 py-12 border-b border-[rgba(26,25,22,0.08)] max-[700px]:grid-cols-1 max-[700px]:gap-5 max-[900px]:gap-8 scroll-mt-20'
            >
              {/* Left - section header */}
              <div className='pt-0.5'>
                <span className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#6b6963] block mb-2'>
                  {section.num}
                </span>
                <h2 className='text-[15px] font-medium leading-[1.4] tracking-[-0.01em] text-[#1a1916]'>
                  {section.title}
                </h2>
              </div>

              {/* Right - content */}
              <div className='text-[13px] font-normal leading-[1.85] text-[#1a1916]'>
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* FOOTER */}
        <footer className='border-t border-[rgba(26,25,22,0.1)] px-10 py-10 max-[900px]:px-6 bg-[#f4f3f0]'>
          <div className='flex justify-between items-center max-[480px]:flex-col max-[480px]:items-start max-[480px]:gap-3'>
            <div className='flex items-center gap-6'>
              <Link
                href='/'
                className='text-[13px] font-medium tracking-[0.06em] uppercase text-[#1a1916] no-underline'
              >
                Hopla <span className='text-[10px] font-normal'>studio</span>
              </Link>
              <span className='text-[11px] font-normal text-[#6b6963] tracking-[0.04em]'>
                © 2026. Wszelkie prawa zastrzeżone.
              </span>
            </div>
            <Link
              href='/'
              className='text-[11px] font-medium tracking-[0.08em] uppercase text-[#6b6963] no-underline hover:text-[#1a1916] transition-colors duration-200'
            >
              ← Wróć na stronę główną
            </Link>
          </div>
        </footer>
      </main>
    </>
  );
}

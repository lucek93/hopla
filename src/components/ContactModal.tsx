"use client";
import { useState, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formTopic, setFormTopic] = useState<string | null>(null);
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formErrors, setFormErrors] = useState<{
    email?: string;
    message?: string;
  }>({});
  const swipeStartY = useRef<number | null>(null);

  const handleFormChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (name === "email" || name === "message") {
        setFormErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [],
  );

  const handleFormSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errors: { email?: string; message?: string } = {};
      if (!formData.email.trim()) errors.email = "Podaj adres email.";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
        errors.email = "Nieprawidłowy adres email.";
      if (!formData.message.trim())
        errors.message = "Treść wiadomości jest wymagana.";
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
      setFormErrors({});
      setFormState("sending");
      try {
        const res = await fetch("https://submit-form.com/HAESIou89", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ ...formData, topic: formTopic ?? "" }),
        });
        if (res.ok) {
          setFormState("success");
        } else {
          setFormState("error");
        }
      } catch {
        setFormState("error");
      }
    },
    [formData, formTopic],
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='contact-backdrop'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-[600] flex items-end justify-center max-[900px]:items-end min-[901px]:items-center bg-[rgba(10,10,9,0.75)] backdrop-blur-[8px]'
          onClick={onClose}
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
              swipeStartY.current = e.touches[0].clientY;
            }}
            onTouchEnd={(e) => {
              if (swipeStartY.current === null) return;
              const dy = e.changedTouches[0].clientY - swipeStartY.current;
              swipeStartY.current = null;
              if (dy > 72) onClose();
            }}
          >
            {/* Mobile drag handle */}
            <div className='hidden max-[900px]:flex absolute top-0 left-0 right-0 z-10 justify-center pt-2.5'>
              <div className='modal-drag-handle mx-auto' />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className='absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-[20px] text-[#6b6963] hover:text-[#1a1916] hover:bg-[rgba(26,25,22,0.06)] transition-all duration-200 bg-transparent border-0 cursor-pointer rounded-sm'
              aria-label='Zamknij'
            >
              ×
            </button>

            {/* LEFT - dark info panel */}
            <div className='bg-[#1a1916] flex flex-col justify-between px-10 py-12 max-[900px]:px-6 max-[900px]:py-10 max-[900px]:pt-14 min-[901px]:w-[300px] min-[901px]:shrink-0'>
              <div>
                <p className='text-[10px] font-normal tracking-[0.14em] uppercase text-[rgba(244,243,240,0.3)] mb-8'>
                  Kontakt
                </p>
                <h2 className='text-[clamp(22px,2.8vw,36px)] font-light leading-[1.12] tracking-[-0.03em] text-[rgba(244,243,240,0.92)] mb-4'>
                  Zacznijmy tworzyć razem.
                </h2>
                <p className='text-[13px] font-normal leading-[1.75] text-[rgba(244,243,240,0.4)] max-[900px]:hidden'>
                  Wyślij zapytanie - odpiszemy w ciągu 24h z wyceną.
                </p>
              </div>
              <div className='mt-8 space-y-1 max-[900px]:hidden'>
                {[
                  {
                    label: "Email",
                    value: "hello@hopla.studio",
                    href: "mailto:hello@hopla.studio",
                  },
                  {
                    label: "Instagram",
                    value: "@hoplastudioo",
                    href: "https://www.instagram.com/hopla.studioo/",
                    openInNewTab: true,
                  },
                  {
                    label: "Telefon",
                    value: "+48 792 174 420",
                    href: "tel:+48792174420",
                  },
                ].map(({ label, value, href, openInNewTab }) => (
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
                        target={openInNewTab ? "_blank" : undefined}
                        rel={openInNewTab ? "noopener noreferrer" : undefined}
                        className='text-[12px] text-[rgba(244,243,240,0.6)] no-underline hover:text-[rgba(244,243,240,0.9)] transition-colors duration-150 flex items-center gap-1.5 group'
                      >
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

            {/* RIGHT - form */}
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
                      onClick={onClose}
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
                    <input type='hidden' name='topic' value={formTopic ?? ""} />
                    <div>
                      <p className='text-[10px] font-medium tracking-[0.14em] uppercase text-[#b8b5b0] mb-3'>
                        Temat zapytania
                      </p>
                      <div className='flex flex-wrap gap-2'>
                        {["Produkt", "Projekt", "Współpraca", "Inne"].map(
                          (topic) => (
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
                          ),
                        )}
                      </div>
                    </div>

                    <div className='grid grid-cols-2 gap-6 max-[480px]:grid-cols-1'>
                      <div className='contact-field-wrap'>
                        <input
                          type='text'
                          name='name'
                          id='contact-name'
                          placeholder=' '
                          value={formData.name}
                          onChange={handleFormChange}
                          className='contact-field peer'
                        />
                        <label htmlFor='contact-name' className='contact-label'>
                          Imię i nazwisko
                        </label>
                      </div>
                      <div className='contact-field-wrap'>
                        <input
                          type='text'
                          name='email'
                          id='contact-email'
                          placeholder=' '
                          value={formData.email}
                          onChange={handleFormChange}
                          className='contact-field peer'
                        />
                        <label
                          htmlFor='contact-email'
                          className='contact-label'
                        >
                          Adres email*
                        </label>
                        {formErrors.email && (
                          <p className='mt-1.5 text-[11px] text-red-500 font-normal'>
                            {formErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className='contact-field-wrap'>
                      <textarea
                        name='message'
                        id='contact-message'
                        placeholder=' '
                        rows={4}
                        value={formData.message}
                        onChange={handleFormChange}
                        className='contact-field peer resize-none'
                      />
                      <label
                        htmlFor='contact-message'
                        className='contact-label'
                      >
                        Treść wiadomości:*
                      </label>
                      {formErrors.message && (
                        <p className='mt-1.5 text-[11px] text-red-500 font-normal'>
                          {formErrors.message}
                        </p>
                      )}
                    </div>

                    <div className='flex items-center justify-between gap-4 max-[480px]:flex-col max-[480px]:items-start'>
                      <p className='text-[11px] font-normal leading-[1.6] text-[#b8b5b0] max-w-[220px] max-[480px]:max-w-none'>
                        Dane używane wyłącznie do realizacji zamówienia.
                      </p>
                      <button
                        type='submit'
                        disabled={
                          formState === "sending" || formState === "error"
                        }
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
                          ) : formState === "error" ? (
                            <motion.span
                              key='error'
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              className='flex items-center gap-2'
                            >
                              Błąd — spróbuj ponownie
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
  );
}

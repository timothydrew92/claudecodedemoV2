import { useState, useRef, useEffect } from "react";
import { LANGUAGES } from "../i18n";

export default function Header({ lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find((l) => l.code === lang);

  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <span className="header-icon">🏆</span>
          <span className="header-title">{t.appName}</span>
        </div>
        <div className="lang-picker" ref={ref}>
          <button
            className="lang-btn"
            onClick={() => setOpen((o) => !o)}
            aria-label={t.language}
          >
            <span>{current.flag}</span>
            <span className="lang-label">{current.label}</span>
            <svg
              className={`lang-chevron${open ? " open" : ""}`}
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {open && (
            <div className="lang-dropdown">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  className={`lang-option${l.code === lang ? " active" : ""}`}
                  onClick={() => { setLang(l.code); setOpen(false); }}
                >
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

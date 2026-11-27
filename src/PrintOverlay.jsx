import { useCallback, useEffect, useRef, useState } from "react";

const FONT = "'DM Sans', system-ui, sans-serif";

function safeFileName(title) {
  const base = String(title || "moral-maps-export")
    .replace(/[^\w\s-–—]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
  return `${base || "moral-maps-export"}.html`;
}

export default function PrintOverlay({ open, html, title, onClose }) {
  const iframeRef = useRef(null);
  const closeRef = useRef(null);
  const prevBodyOverflow = useRef("");
  const [printHint, setPrintHint] = useState(false);
  const [showHtmlDownload, setShowHtmlDownload] = useState(false);

  const handleClose = useCallback(() => {
    document.body.style.overflow = prevBodyOverflow.current;
    onClose?.();
  }, [onClose]);

  useEffect(() => {
    if (!open) return undefined;
    setPrintHint(false);
    setShowHtmlDownload(false);
    prevBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const t = setTimeout(() => closeRef.current?.focus(), 50);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prevBodyOverflow.current;
    };
  }, [open, html]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  const handlePrint = () => {
    const frame = iframeRef.current;
    const win = frame?.contentWindow;
    if (!win) {
      setShowHtmlDownload(true);
      return;
    }
    try {
      win.focus();
      if (typeof win.print === "function") {
        win.print();
        setPrintHint(true);
        window.setTimeout(() => setShowHtmlDownload(true), 2500);
      } else {
        setShowHtmlDownload(true);
      }
    } catch {
      setShowHtmlDownload(true);
    }
  };

  const handleHtmlDownload = () => {
    if (!html) return;
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = safeFileName(title);
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open || !html) return null;

  return (
  <>
    <style>{`
      @media print {
        .mm-print-overlay-chrome { display: none !important; }
        .mm-print-overlay-backdrop { background: #fff !important; }
        .mm-print-overlay-frame { position: static !important; inset: auto !important; }
      }
    `}</style>
    <div
      className="mm-print-overlay-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mm-print-overlay-titel"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "#f1f5f9",
        display: "flex",
        flexDirection: "column",
        fontFamily: FONT,
      }}
    >
      <div
        className="mm-print-overlay-chrome"
        style={{
          flexShrink: 0,
          padding: "12px 16px 14px",
          background: "#fff",
          borderBottom: "1px solid #e2e8f0",
          boxShadow: "0 4px 20px rgba(15,23,42,.06)",
        }}
      >
        <h2
          id="mm-print-overlay-titel"
          style={{ margin: 0, fontSize: 16, fontWeight: 900, color: "#0f172a" }}
        >
          {title || "Bekijk je verslag"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              minHeight: 48,
              padding: "12px 18px",
              borderRadius: 12,
              border: "none",
              background: "#1b9e77",
              color: "#fff",
              fontWeight: 800,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >
            Opslaan als PDF / printen
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={handleClose}
            style={{
              minHeight: 48,
              padding: "12px 18px",
              borderRadius: 12,
              border: "1.5px solid #e2e8f0",
              background: "#fff",
              color: "#334155",
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >
            Sluit
          </button>
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "#64748b", lineHeight: 1.65 }}>
          Kies in het venster dat opent &lsquo;Opslaan als PDF&rsquo; of &lsquo;Print&rsquo;. Op een
          iPhone: tik op Delen en kies &lsquo;Bewaar in Bestanden&rsquo;.
        </p>
        {printHint ? (
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "#0f766e", lineHeight: 1.5 }}>
            Zie je geen menu? Gebruik de knop hieronder om het bestand te downloaden.
          </p>
        ) : null}
        {showHtmlDownload ? (
          <button
            type="button"
            onClick={handleHtmlDownload}
            style={{
              marginTop: 12,
              minHeight: 48,
              width: "100%",
              padding: "12px 18px",
              borderRadius: 12,
              border: "1.5px solid #cbd5e1",
              background: "#f8fafc",
              color: "#0f172a",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              fontFamily: FONT,
            }}
          >
            Download als HTML-bestand
          </button>
        ) : null}
      </div>
      <iframe
        ref={iframeRef}
        className="mm-print-overlay-frame"
        title={title || "Printvoorbeeld"}
        srcDoc={html}
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          background: "#fff",
          minHeight: 0,
        }}
      />
    </div>
  </>
  );
}

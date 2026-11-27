/** @font-face regels voor PDF/print-HTML in iframe (absolute font-URL's). */
export function pdfPrintFontCss(origin) {
  const base =
    origin || (typeof window !== "undefined" ? window.location.origin : "");
  const url = (path) => `${base}${path}`;
  return `
      @font-face{font-family:'DM Sans';src:url('${url("/fonts/dm-sans-400.woff2")}') format('woff2');font-weight:400;font-style:normal;font-display:swap}
      @font-face{font-family:'DM Sans';src:url('${url("/fonts/dm-sans-500.woff2")}') format('woff2');font-weight:500;font-style:normal;font-display:swap}
      @font-face{font-family:'DM Sans';src:url('${url("/fonts/dm-sans-700.woff2")}') format('woff2');font-weight:700;font-style:normal;font-display:swap}
      @font-face{font-family:'DM Sans';src:url('${url("/fonts/dm-sans-900.woff2")}') format('woff2');font-weight:900;font-style:normal;font-display:swap}
    `;
}
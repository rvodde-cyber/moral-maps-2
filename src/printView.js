/** @typedef {{ html: string, title: string, returnFocusRef?: { current?: HTMLElement | null } | HTMLElement | null }} PrintJob */

let openHandler = null;

export function registerOpenPrintView(handler) {
  openHandler = handler;
}

/**
 * @param {string} html
 * @param {string} title
 * @param {{ current?: HTMLElement | null } | HTMLElement | null} [returnFocusRef]
 */
export function openPrintView(html, title, returnFocusRef) {
  if (!openHandler) {
    console.warn("PrintOverlay niet geregistreerd");
    return;
  }
  openHandler({ html, title, returnFocusRef });
}
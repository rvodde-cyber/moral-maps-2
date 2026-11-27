import { useLayoutEffect } from "react";

function scrollNaarBoven() {
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  const root = document.getElementById("root");
  if (root) root.scrollTop = 0;
}

/**
 * Scrollt bij echte navigatie (scherm/fase/stap) naar boven.
 * @param {unknown[]} deps — alleen waarden die bij schermwissel veranderen
 */
export function useScrollNaarBoven(deps) {
  useLayoutEffect(() => {
    scrollNaarBoven();
  }, deps);
}
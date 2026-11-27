import { useMemo, useState } from "react";
import {
  OPENING,
  STAP_OHNE_DELEN,
  STAP1,
  STAP2,
  STAP3,
  STAP4,
  STAP5,
  STAP6,
  STAP7,
  TERUGBLIK3M,
  PECH,
  KNOPPEN,
  STAP_LABELS,
  DEEL4_TITEL,
  OVERSLAAN,
  STEUNTJE,
} from "./tegenwind-teksten.js";

const TEAL = "#1b9e77";
const TEAL_DARK = "#147a5c";
const TEAL_LIGHT = "#e6f5f0";
const FONT = "'DM Sans',system-ui,sans-serif";
const MAX_LEN = 400;

const FASE_BADGE = {
  Zien: { bg: "#DBEAFE", color: "#1E3A8A", border: "#3B82F6" },
  Voelen: { bg: "#FEF3C7", color: "#92400e", border: "#F59E0B" },
  Wegen: { bg: "#FCE7F3", color: "#9D174D", border: "#EC4899" },
  Handelen: { bg: TEAL_LIGHT, color: TEAL_DARK, border: TEAL },
  Volhouden: { bg: "#FFEDD5", color: "#9A3412", border: "#F97316" },
};

function FaseBadges({ fase, extra }) {
  const items = extra ? [fase, extra] : [fase];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
      {items.map((f) => {
        const badge = FASE_BADGE[f] || FASE_BADGE.Handelen;
        return (
          <span
            key={f}
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: 1.2,
              textTransform: "uppercase",
              padding: "4px 10px",
              borderRadius: 99,
              background: badge.bg,
              color: badge.color,
              border: `1px solid ${badge.border}`,
            }}
          >
            {f}
          </span>
        );
      })}
    </div>
  );
}

function Veld({
  id,
  label,
  value,
  onChange,
  onSkip,
  hint,
  optioneel,
  rows = 3,
}) {
  return (
    <div style={{ marginBottom: 14 }}>
      <p style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 700, color: "#0f172a", lineHeight: 1.5, fontFamily: FONT }}>
        {label}
        {optioneel ? (
          <span style={{ fontWeight: 600, color: "#94a3b8", fontSize: 12 }}> (optioneel)</span>
        ) : null}
      </p>
      <textarea
        id={id}
        value={value ?? ""}
        maxLength={MAX_LEN}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "10px 12px",
          borderRadius: 10,
          border: "1.5px solid #e2e8f0",
          fontSize: 14,
          lineHeight: 1.6,
          resize: "vertical",
          outline: "none",
          fontFamily: FONT,
        }}
        onFocus={(e) => {
          e.target.style.borderColor = TEAL;
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#e2e8f0";
        }}
      />
      {hint ? (
        <p style={{ margin: "8px 0 0", fontSize: 12, color: "#64748b", lineHeight: 1.6, fontFamily: FONT }}>{hint}</p>
      ) : null}
      <button
        type="button"
        onClick={() => onSkip?.()}
        style={{
          marginTop: 10,
          padding: 0,
          border: "none",
          background: "none",
          fontSize: 12,
          fontWeight: 600,
          color: "#64748b",
          cursor: "pointer",
          textDecoration: "underline",
          fontFamily: FONT,
        }}
      >
        {OVERSLAAN}
      </button>
    </div>
  );
}

function SteuntjeBlok() {
  return (
    <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.65, margin: "14px 0 0", fontFamily: FONT }}>{STEUNTJE}</p>
  );
}

function PechLink({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        marginTop: 16,
        padding: 0,
        border: "none",
        background: "none",
        fontSize: 12,
        fontWeight: 600,
        color: TEAL_DARK,
        cursor: "pointer",
        textDecoration: "underline",
        fontFamily: FONT,
      }}
    >
      {PECH.link}
    </button>
  );
}

function TegenwindHero({ children }) {
  const [heroFailed, setHeroFailed] = useState(false);
  const bg = heroFailed
    ? "linear-gradient(165deg,#0f172a 0%,#1e293b 55%,#334155 100%)"
    : `linear-gradient(165deg,rgba(15,23,42,.88) 0%,rgba(15,23,42,.72) 45%,rgba(30,41,59,.55) 100%), url(/images/tegenwind-hero.jpg) center/cover no-repeat`;

  return (
    <div
      style={{
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 16,
        minHeight: 220,
        background: bg,
        position: "relative",
      }}
    >
      {!heroFailed && (
        <img
          src="/images/tegenwind-hero.jpg"
          alt=""
          aria-hidden
          style={{ display: "none" }}
          onError={() => setHeroFailed(true)}
        />
      )}
      <div style={{ padding: "28px 22px", position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
}

export function TegenwindPech({
  OpdrachtkaartIntro,
  deel4,
  setDeel4,
  onClose,
  onPersist,
  HaltePauze,
  voet,
}) {
  const patch = (fields) => {
    const next = { ...deel4, ...fields };
    setDeel4(next);
    onPersist?.(next);
  };
  const skip = (key) => patch({ [key]: OVERSLAAN });

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 60px" }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 999,
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: 700,
            color: "#334155",
            fontFamily: FONT,
            marginBottom: 14,
          }}
        >
          ← Terug
        </button>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px 22px" }}>
          <p style={{ margin: 0, fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1 }}>
            {PECH.titel}
          </p>
          <h2 style={{ margin: "6px 0 14px", fontSize: 22, fontWeight: 900, color: "#0f172a" }}>{PECH.ondertitel}</h2>
          <OpdrachtkaartIntro watGaJeDoen={PECH.wat} waarom={PECH.waarom} zoPakJeAan={PECH.hoe} />
          <Veld
            id="pech1"
            label={PECH.vraag1}
            value={deel4.pechVertrouwen}
            onChange={(v) => patch({ pechVertrouwen: v })}
            onSkip={() => skip("pechVertrouwen")}
          />
          <Veld
            id="pech2"
            label={PECH.vraag2}
            value={deel4.pechJaar}
            onChange={(v) => patch({ pechJaar: v })}
            onSkip={() => skip("pechJaar")}
          />
          <Veld
            id="pech3"
            label={PECH.vraag3}
            value={deel4.pechNodig}
            onChange={(v) => patch({ pechNodig: v })}
            onSkip={() => skip("pechNodig")}
          />
          <SteuntjeBlok />
        </div>
        {HaltePauze}
        {voet}
      </div>
    </div>
  );
}

export function TegenwindTerugblik3m({
  OpdrachtkaartIntro,
  deel4,
  setDeel4,
  onBack,
  onPersist,
  voet,
}) {
  const t3 = deel4.terugblik3m || {};
  const patchT3 = (fields) => {
    const terugblik3m = { ...t3, ...fields };
    const next = { ...deel4, terugblik3m };
    setDeel4(next);
    onPersist?.(next);
  };
  const skip = (key) => patchT3({ [key]: OVERSLAAN });

  const afgerondLabel = deel4.afgerondOp
    ? new Date(deel4.afgerondOp).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 60px" }}>
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 999,
            padding: "8px 14px",
            cursor: "pointer",
            fontWeight: 700,
            color: "#334155",
            fontFamily: FONT,
            marginBottom: 14,
          }}
        >
          ← {KNOPPEN.terugMenu}
        </button>
        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px 22px" }}>
          <h2 style={{ margin: "0 0 14px", fontSize: 22, fontWeight: 900, color: "#0f172a" }}>{TERUGBLIK3M.titel}</h2>
          <OpdrachtkaartIntro
            watGaJeDoen={TERUGBLIK3M.wat}
            waarom={TERUGBLIK3M.waarom}
            zoPakJeAan={TERUGBLIK3M.hoe}
          />
          {(deel4.alsDan || afgerondLabel) && (
            <div
              style={{
                background: "#f8fafc",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                padding: "14px 16px",
                marginBottom: 16,
              }}
            >
              {deel4.alsDan ? (
                <p style={{ margin: "0 0 8px", fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
                  <strong>Je als-dan-plan:</strong> {deel4.alsDan}
                </p>
              ) : null}
              {afgerondLabel ? (
                <p style={{ margin: 0, fontSize: 12, color: "#64748b" }}>
                  <strong>Afgerond op:</strong> {afgerondLabel}
                </p>
              ) : null}
            </div>
          )}
          <Veld
            id="t3gebeurd"
            label={TERUGBLIK3M.vraag1}
            value={t3.gebeurd}
            onChange={(v) => patchT3({ gebeurd: v, ingevuldOp: new Date().toISOString() })}
            onSkip={() => skip("gebeurd")}
          />
          <Veld
            id="t3werkte"
            label={TERUGBLIK3M.vraag2}
            value={t3.werkte}
            onChange={(v) => patchT3({ werkte: v, ingevuldOp: new Date().toISOString() })}
            onSkip={() => skip("werkte")}
          />
          <Veld
            id="t3anders"
            label={TERUGBLIK3M.vraag3}
            value={t3.anders}
            onChange={(v) => patchT3({ anders: v, ingevuldOp: new Date().toISOString() })}
            onSkip={() => skip("anders")}
          />
          <Veld
            id="t3energie"
            label={TERUGBLIK3M.vraag4}
            value={t3.energie}
            onChange={(v) => patchT3({ energie: v, ingevuldOp: new Date().toISOString() })}
            onSkip={() => skip("energie")}
          />
          <SteuntjeBlok />
        </div>
        {voet}
      </div>
    </div>
  );
}

export default function Tegenwind({
  OpdrachtkaartIntro,
  deel4,
  setDeel4,
  deel4Step,
  setDeel4Step,
  coreVals,
  weekdoel,
  deel3Grow,
  toonOhneDelen,
  onPersist,
  onBackHome,
  onDownloadIcs,
  onExportPdf,
  HaltePauze,
  voet,
  onOpenPech,
  pechOpen,
  onClosePech,
}) {
  const startDoel = useMemo(() => {
    const g = (deel3Grow?.goal || "").trim();
    if (g) return g;
    return (weekdoel || "").trim();
  }, [deel3Grow?.goal, weekdoel]);

  const patch = (fields, stepOverride) => {
    const next = { ...deel4, ...fields };
    setDeel4(next);
    const step = stepOverride ?? deel4Step;
    onPersist?.(next, step);
  };

  const setField = (key, val) => patch({ [key]: val });
  const skipField = (key) => patch({ [key]: OVERSLAAN });

  const goStep = (step) => {
    setDeel4Step(step);
    onPersist?.(deel4, step);
  };

  const finishStep7 = (withIcs) => {
    const afgerondOp = deel4.afgerondOp || new Date().toISOString();
    const next = { ...deel4, afgerondOp };
    setDeel4(next);
    if (withIcs) onDownloadIcs?.(afgerondOp);
    onPersist?.(next, 8);
    setDeel4Step(8);
  };

  const stepIndicators = (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
        padding: "12px 16px",
        marginBottom: 16,
        display: "flex",
        gap: 6,
      }}
    >
      {STAP_LABELS.map((l, i) => {
        const idx = i + 1;
        const active = deel4Step === idx;
        const done = deel4Step > idx;
        return (
          <div key={l} style={{ flex: 1, textAlign: "center" }}>
            <div
              style={{
                height: 4,
                borderRadius: 99,
                background: active || done ? TEAL : "#f1f5f9",
                marginBottom: 4,
                transition: "background .3s",
              }}
            />
            <span style={{ fontSize: 8, fontWeight: 700, color: active || done ? TEAL_DARK : "#94a3b8" }}>{l}</span>
          </div>
        );
      })}
    </div>
  );

  const cardShell = (children) => (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: "20px 22px", marginBottom: 12 }}>
      {children}
    </div>
  );

  const nextBtn = (onClick, label = KNOPPEN.volgende) => (
    <button
      type="button"
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px",
        borderRadius: 999,
        border: "none",
        background: TEAL,
        color: "#fff",
        fontWeight: 700,
        fontSize: 14,
        cursor: "pointer",
        fontFamily: FONT,
        marginTop: 14,
      }}
    >
      {label}
    </button>
  );

  if (pechOpen) {
    return (
      <TegenwindPech
        OpdrachtkaartIntro={OpdrachtkaartIntro}
        deel4={deel4}
        setDeel4={setDeel4}
        onClose={onClosePech}
        onPersist={(next) => onPersist?.(next, deel4Step)}
        HaltePauze={HaltePauze}
        voet={voet}
      />
    );
  }

  return (
    <div style={{ background: "#f8fafc", minHeight: "100vh", fontFamily: FONT }}>
      <div style={{ maxWidth: 680, margin: "0 auto", padding: "16px 16px 60px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
          <button
            type="button"
            onClick={() => (deel4Step > 0 ? goStep(Math.max(0, deel4Step - 1)) : onBackHome())}
            style={{
              background: "#fff",
              border: "1px solid #e2e8f0",
              borderRadius: 999,
              padding: "8px 14px",
              cursor: "pointer",
              fontWeight: 700,
              color: "#334155",
              fontFamily: FONT,
            }}
          >
            ← {deel4Step > 0 ? "Terug" : "Menu"}
          </button>
          <div>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: -0.4 }}>{DEEL4_TITEL}</h2>
            <p style={{ margin: 0, fontSize: 11, color: "#64748b" }}>
              {deel4Step === 0 ? "Opening" : deel4Step >= 8 ? "Afgerond" : `Stap ${deel4Step} van 7`}
            </p>
          </div>
        </div>

        {deel4Step >= 1 && deel4Step <= 7 ? stepIndicators : null}

        {deel4Step === 0 && (
          <>
            <TegenwindHero>
              <FaseBadges fase={OPENING.fase} />
              <p style={{ margin: 0, fontSize: 16, color: "#e2e8f0", lineHeight: 1.75, fontFamily: FONT }}>{OPENING.verhaal}</p>
            </TegenwindHero>
            {cardShell(
              <>
                <OpdrachtkaartIntro
                  fase={OPENING.fase}
                  watGaJeDoen={OPENING.wat}
                  waarom={OPENING.waarom}
                  zoPakJeAan={OPENING.hoe}
                />
                <p style={{ margin: "0 0 14px", fontSize: 13, color: "#64748b", lineHeight: 1.65, fontFamily: FONT }}>
                  {OPENING.regel}
                </p>
                {nextBtn(() => goStep(1), "Begin stap 1 →")}
                <PechLink onClick={onOpenPech} />
                <SteuntjeBlok />
              </>
            )}
          </>
        )}

        {deel4Step === 1 && (
          <>
            {toonOhneDelen ? (
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.65, margin: "0 0 12px", fontFamily: FONT }}>
                {STAP_OHNE_DELEN}
              </p>
            ) : null}
            {cardShell(
              <>
                <FaseBadges fase={STAP1.fase} />
                <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP1.titel}</h3>
                <OpdrachtkaartIntro
                  fase={STAP1.fase}
                  watGaJeDoen={STAP1.wat}
                  waarom={STAP1.waarom}
                  zoPakJeAan={STAP1.hoe}
                />
                <div
                  style={{
                    background: "#f8fafc",
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    padding: "14px 16px",
                    marginBottom: 14,
                  }}
                >
                  <p style={{ fontSize: 10, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 10px" }}>
                    Uit je reis
                  </p>
                  {coreVals?.length > 0 ? (
                    <p style={{ fontSize: 12, color: "#334155", margin: "0 0 8px", lineHeight: 1.5 }}>
                      <strong>Kernwaarden:</strong> {coreVals.map((c) => c.name).join(", ")}
                    </p>
                  ) : null}
                  {(weekdoel || "").trim() ? (
                    <p style={{ fontSize: 12, color: "#334155", margin: "0 0 8px", lineHeight: 1.5 }}>
                      <strong>Weekdoel:</strong> {weekdoel}
                    </p>
                  ) : null}
                  {(deel3Grow?.goal || "").trim() ? (
                    <p style={{ fontSize: 12, color: "#334155", margin: 0, lineHeight: 1.5 }}>
                      <strong>GROW-doel:</strong> {deel3Grow.goal}
                    </p>
                  ) : null}
                  {!coreVals?.length && !(weekdoel || "").trim() && !(deel3Grow?.goal || "").trim() ? (
                    <p style={{ fontSize: 13, color: "#64748b", margin: 0, lineHeight: 1.6 }}>{STAP1.leeg}</p>
                  ) : null}
                </div>
                <Veld
                  id="tw-plan"
                  label={STAP1.vraag1}
                  value={deel4.terugblikPlan}
                  onChange={(v) => setField("terugblikPlan", v)}
                  onSkip={() => skipField("terugblikPlan")}
                />
                <Veld
                  id="tw-lukte"
                  label={STAP1.vraag2}
                  value={deel4.terugblikLukte}
                  onChange={(v) => setField("terugblikLukte", v)}
                  onSkip={() => skipField("terugblikLukte")}
                  hint={STAP1.hint}
                />
                {nextBtn(() => goStep(2))}
                <PechLink onClick={onOpenPech} />
                <SteuntjeBlok />
              </>
            )}
          </>
        )}

        {deel4Step === 2 && cardShell(
          <>
            <FaseBadges fase={STAP2.fase} extra={STAP2.faseExtra} />
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP2.titel}</h3>
            <OpdrachtkaartIntro
              fase={STAP2.fase}
              watGaJeDoen={STAP2.wat}
              waarom={STAP2.waarom}
              zoPakJeAan={STAP2.hoe}
            />
            <Veld
              id="tw-sit"
              label={STAP2.vraag1}
              value={deel4.situatie}
              onChange={(v) => setField("situatie", v)}
              onSkip={() => skipField("situatie")}
            />
            <Veld
              id="tw-precies"
              label={STAP2.vraag2}
              value={deel4.gebeurtPrecies}
              onChange={(v) => setField("gebeurtPrecies", v)}
              onSkip={() => skipField("gebeurtPrecies")}
              hint={STAP2.hintVraag2}
            />
            <Veld
              id="tw-gedachte"
              label={STAP2.vraag3}
              value={deel4.gedachte}
              onChange={(v) => setField("gedachte", v)}
              onSkip={() => skipField("gedachte")}
              hint={STAP2.voorbeelden}
            />
            {nextBtn(() => goStep(3))}
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {deel4Step === 3 && cardShell(
          <>
            <FaseBadges fase={STAP3.fase} />
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP3.titel}</h3>
            <OpdrachtkaartIntro
              fase={STAP3.fase}
              watGaJeDoen={STAP3.wat}
              waarom={STAP3.waarom}
              zoPakJeAan={STAP3.hoe}
            />
            <Veld
              id="tw-advies"
              label={STAP3.vraag1}
              value={deel4.afstandAdvies}
              onChange={(v) => setField("afstandAdvies", v)}
              onSkip={() => skipField("afstandAdvies")}
            />
            <Veld
              id="tw-jaar"
              label={STAP3.vraag2}
              value={deel4.afstandJaar}
              onChange={(v) => setField("afstandJaar", v)}
              onSkip={() => skipField("afstandJaar")}
            />
            <Veld
              id="tw-afstand-g"
              label={STAP3.vraag3}
              value={deel4.afstandGedachte}
              onChange={(v) => setField("afstandGedachte", v)}
              onSkip={() => skipField("afstandGedachte")}
              hint={STAP3.hint}
              optioneel
            />
            <p style={{ fontSize: 12, color: "#92400e", background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "10px 12px", lineHeight: 1.6, margin: "0 0 8px" }}>
              {STAP3.waarschuwing}
            </p>
            {nextBtn(() => goStep(4))}
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {deel4Step === 4 && cardShell(
          <>
            <FaseBadges fase={STAP4.fase} />
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP4.titel}</h3>
            <OpdrachtkaartIntro
              fase={STAP4.fase}
              watGaJeDoen={STAP4.wat}
              waarom={STAP4.waarom}
              zoPakJeAan={STAP4.hoe}
            />
            {startDoel ? (
              <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px", lineHeight: 1.6 }}>
                <strong>Startpunt uit je reis:</strong> {startDoel}
              </p>
            ) : null}
            <Veld
              id="tw-uitkomst"
              label={STAP4.vraag1}
              value={deel4.besteUitkomst}
              onChange={(v) => setField("besteUitkomst", v)}
              onSkip={() => skipField("besteUitkomst")}
            />
            <Veld
              id="tw-obstakel"
              label={STAP4.vraag2}
              value={deel4.obstakel}
              onChange={(v) => setField("obstakel", v)}
              onSkip={() => skipField("obstakel")}
            />
            <Veld
              id="tw-alsdan"
              label={`${STAP4.vraag3} Vorm: ${STAP4.vorm}`}
              value={deel4.alsDan}
              onChange={(v) => setField("alsDan", v)}
              onSkip={() => skipField("alsDan")}
              hint={`Voorbeeld: ${STAP4.voorbeeld}\n${STAP4.hint}`}
            />
            {nextBtn(() => goStep(5))}
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {deel4Step === 5 && cardShell(
          <>
            <FaseBadges fase={STAP5.fase} />
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP5.titel}</h3>
            <OpdrachtkaartIntro
              fase={STAP5.fase}
              watGaJeDoen={STAP5.wat}
              waarom={STAP5.waarom}
              zoPakJeAan={STAP5.hoe}
            />
            <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, margin: "0 0 14px", fontFamily: FONT }}>{STAP5.intro}</p>
            <Veld
              id="tw-toets"
              label={STAP5.hoofdvraag}
              value={deel4.toets}
              onChange={(v) => setField("toets", v)}
              onSkip={() => skipField("toets")}
              rows={4}
            />
            <Veld
              id="tw-twaarden"
              label={STAP5.hulp1}
              value={deel4.toetsWaarden}
              onChange={(v) => setField("toetsWaarden", v)}
              onSkip={() => skipField("toetsWaarden")}
            />
            <Veld
              id="tw-tbaat"
              label={STAP5.hulp2}
              value={deel4.toetsBaat}
              onChange={(v) => setField("toetsBaat", v)}
              onSkip={() => skipField("toetsBaat")}
            />
            <Veld
              id="tw-tmotief"
              label={STAP5.hulp3}
              value={deel4.toetsMotief}
              onChange={(v) => setField("toetsMotief", v)}
              onSkip={() => skipField("toetsMotief")}
            />
            <p style={{ fontSize: 12, color: "#64748b", margin: "4px 0 0", fontStyle: "italic" }}>{STAP5.geenOordeel}</p>
            {nextBtn(() => goStep(6))}
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {deel4Step === 6 && cardShell(
          <>
            <FaseBadges fase={STAP6.fase} extra={STAP6.faseExtra} />
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP6.titel}</h3>
            <OpdrachtkaartIntro
              fase={STAP6.fase}
              watGaJeDoen={STAP6.wat}
              waarom={STAP6.waarom}
              zoPakJeAan={STAP6.hoe}
            />
            <Veld
              id="tw-plan-aan"
              label={STAP6.vraag1}
              value={deel4.planAanscherpen}
              onChange={(v) => setField("planAanscherpen", v)}
              onSkip={() => skipField("planAanscherpen")}
            />
            <Veld
              id="tw-proef"
              label={STAP6.vraag2}
              value={deel4.proef}
              onChange={(v) => setField("proef", v)}
              onSkip={() => skipField("proef")}
              hint={STAP6.hint}
              optioneel
            />
            {nextBtn(() => goStep(7))}
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {deel4Step === 7 && cardShell(
          <>
            <FaseBadges fase={STAP7.fase} />
            <h3 style={{ margin: "0 0 12px", fontSize: 20, fontWeight: 900, color: "#0f172a" }}>{STAP7.titel}</h3>
            <OpdrachtkaartIntro
              fase={STAP7.fase}
              watGaJeDoen={STAP7.wat}
              waarom={STAP7.waarom}
              zoPakJeAan={STAP7.hoe}
            />
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: "0 0 16px", fontFamily: FONT }}>{STAP7.tekst}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <button
                type="button"
                onClick={() => finishStep7(true)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 999,
                  border: "none",
                  background: TEAL,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: FONT,
                }}
              >
                {STAP7.knopAgenda}
              </button>
              <button
                type="button"
                onClick={() => finishStep7(false)}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: 999,
                  border: "1.5px solid #e2e8f0",
                  background: "#fff",
                  color: "#334155",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  fontFamily: FONT,
                }}
              >
                {STAP7.knopNiet}
              </button>
            </div>
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {deel4Step >= 8 && cardShell(
          <>
            <p style={{ fontSize: 15, color: "#334155", lineHeight: 1.7, margin: "0 0 16px", fontFamily: FONT }}>
              Je afspraak met jezelf staat in je reis. Je kunt altijd terugkomen via het startscherm.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <button
                type="button"
                onClick={onExportPdf}
                style={{
                  flex: "1 1 200px",
                  padding: "11px",
                  borderRadius: 999,
                  border: "none",
                  background: "#0f172a",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: FONT,
                }}
              >
                {KNOPPEN.pdfDeel4}
              </button>
              <button
                type="button"
                onClick={onBackHome}
                style={{
                  flex: "1 1 200px",
                  padding: "11px",
                  borderRadius: 999,
                  border: "1.5px solid #e2e8f0",
                  background: "#fff",
                  color: "#334155",
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                  fontFamily: FONT,
                }}
              >
                {KNOPPEN.terugMenu}
              </button>
            </div>
            <PechLink onClick={onOpenPech} />
            <SteuntjeBlok />
          </>
        )}

        {HaltePauze}
        {voet}
      </div>
    </div>
  );
}
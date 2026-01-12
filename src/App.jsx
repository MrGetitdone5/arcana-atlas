import { useMemo, useState } from "react";

const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const TAROT = [
  { id: "fool", name: "The Fool", keywords: "beginnings • leap of faith • curiosity", meaning: "A new chapter. Try the brave option, but stay aware of risks." },
  { id: "magician", name: "The Magician", keywords: "focus • skill • will", meaning: "You have the tools. Commit to one plan and act." },
  { id: "high_priestess", name: "The High Priestess", keywords: "intuition • mystery • inner knowing", meaning: "Pause and listen. The answer is already inside you." },
  { id: "empress", name: "The Empress", keywords: "care • growth • abundance", meaning: "Nurture what you want to grow—time, rest, and consistency." },
  { id: "emperor", name: "The Emperor", keywords: "structure • boundaries • leadership", meaning: "Create a rule, a schedule, or a boundary that supports you." },
  { id: "lovers", name: "The Lovers", keywords: "choice • values • connection", meaning: "Choose what matches your values, not just what feels good today." },
  { id: "chariot", name: "The Chariot", keywords: "drive • momentum • victory", meaning: "Pick a direction and keep going—discipline beats mood." },
  { id: "strength", name: "Strength", keywords: "courage • patience • calm power", meaning: "Gentle persistence. Don’t force it—tame it." },
  { id: "hermit", name: "The Hermit", keywords: "reflection • solitude • guidance", meaning: "Step back. Clarity comes from quiet and honesty." },
  { id: "wheel", name: "Wheel of Fortune", keywords: "cycles • luck • change", meaning: "Things are shifting. Stay flexible and take the opportunity." }
];

function pickUnique(arr, n) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

function todayKey() {
  // same “daily card” for everyone, changes each day (simple deterministic key)
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function dailyCard() {
  const key = todayKey();
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return TAROT[hash % TAROT.length];
}

export default function App() {
  const [sign, setSign] = useState("Scorpio");
  const [mode, setMode] = useState("daily"); // daily | spread3
  const [cards, setCards] = useState(() => [dailyCard()]);

  const zodiacLine = useMemo(() => {
    // lightweight “horoscope-ish” line (non-medical, non-financial)
    const vibe = {
      Aries: "Move first, refine later.",
      Taurus: "Stability is power—slow progress still counts.",
      Gemini: "Ask the second question. Curiosity unlocks it.",
      Cancer: "Protect your peace; respond, don’t react.",
      Leo: "Be seen for what you truly want to create.",
      Virgo: "One small fix changes everything.",
      Libra: "Choose balance over people-pleasing.",
      Scorpio: "Go deep—truth beats comfort.",
      Sagittarius: "Say yes to the new route.",
      Capricorn: "Build the system, then trust it.",
      Aquarius: "Be different on purpose—innovate.",
      Pisces: "Let intuition lead, then add boundaries."
    };
    return vibe[sign] ?? "Trust your inner compass.";
  }, [sign]);

  const draw = () => {
    if (mode === "daily") setCards([dailyCard()]);
    else setCards(pickUnique(TAROT, 3));
  };

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <header style={styles.header}>
          <div>
            <div style={styles.kicker}>Arcana Atlas</div>
            <h1 style={styles.h1}>Zodiac + Tarot Readings</h1>
            <div style={styles.sub}>For fun and reflection (not facts).</div>
          </div>
        </header>

        <section style={styles.panel}>
          <div style={styles.row}>
            <label style={styles.label}>
              Zodiac sign
              <select value={sign} onChange={(e) => setSign(e.target.value)} style={styles.select}>
                {SIGNS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Reading type
              <select value={mode} onChange={(e) => setMode(e.target.value)} style={styles.select}>
                <option value="daily">Daily (1 card)</option>
                <option value="spread3">3-card (Past/Present/Future)</option>
              </select>
            </label>

            <button onClick={draw} style={styles.button}>Draw</button>
          </div>

          <div style={styles.zodiacBox}>
            <div style={styles.zodiacTitle}>{sign} vibe</div>
            <div style={styles.zodiacText}>{zodiacLine}</div>
          </div>

          <div style={styles.cardsGrid}>
            {cards.map((c, i) => (
              <article key={c.id + i} style={styles.card}>
                <div style={styles.cardTop}>
                  <div style={styles.cardLabel}>
                    {mode === "spread3"
                      ? (["Past", "Present", "Future"][i] ?? `Card ${i + 1}`)
                      : "Today"}
                  </div>
                  <div style={styles.cardName}>{c.name}</div>
                  <div style={styles.cardKeywords}>{c.keywords}</div>
                </div>
                <div style={styles.cardMeaning}>{c.meaning}</div>
              </article>
            ))}
          </div>

          <div style={styles.disclaimer}>
            Disclaimer: This app is for entertainment and self-reflection only—no medical, legal, or financial advice.
          </div>
        </section>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 700px at 20% 10%, #2a1456 0%, #0b0716 35%, #07040f 100%)",
    color: "#e9e7ff",
    padding: 18,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
  },
  shell: { maxWidth: 980, margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "end", marginBottom: 14 },
  kicker: { letterSpacing: 2, fontSize: 12, opacity: 0.8, textTransform: "uppercase" },
  h1: { margin: "6px 0 6px", fontSize: 28, lineHeight: 1.15 },
  sub: { opacity: 0.8, fontSize: 14 },

  panel: {
    background: "rgba(10, 8, 18, 0.55)",
    border: "1px solid rgba(167, 139, 250, 0.25)",
    borderRadius: 18,
    padding: 16,
    backdropFilter: "blur(10px)"
  },

  row: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "end" },
  label: { display: "grid", gap: 6, fontSize: 13, opacity: 0.95 },
  select: {
    background: "rgba(255,255,255,0.06)",
    color: "#efeaff",
    border: "1px solid rgba(167, 139, 250, 0.25)",
    padding: "10px 12px",
    borderRadius: 12,
    outline: "none"
  },
  button: {
    padding: "11px 14px",
    borderRadius: 12,
    border: "1px solid rgba(236, 72, 153, 0.35)",
    background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(167,139,250,0.2))",
    color: "#fff",
    cursor: "pointer"
  },

  zodiacBox: {
    marginTop: 14,
    borderRadius: 14,
    border: "1px solid rgba(167, 139, 250, 0.18)",
    background: "rgba(255,255,255,0.04)",
    padding: 12
  },
  zodiacTitle: { fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", opacity: 0.85, marginBottom: 6 },
  zodiacText: { fontSize: 15, lineHeight: 1.4 },

  cardsGrid: {
    marginTop: 14,
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12
  },
  card: {
    borderRadius: 16,
    border: "1px solid rgba(167, 139, 250, 0.22)",
    background: "rgba(0,0,0,0.25)",
    padding: 14
  },
  cardTop: { marginBottom: 10 },
  cardLabel: { fontSize: 12, opacity: 0.8, marginBottom: 6 },
  cardName: { fontSize: 18, fontWeight: 700, marginBottom: 6 },
  cardKeywords: { fontSize: 12, opacity: 0.85 },
  cardMeaning: { fontSize: 14, lineHeight: 1.45, opacity: 0.95 },

  disclaimer: { marginTop: 14, fontSize: 12, opacity: 0.7 }
};

import { useState, useEffect, useRef } from "react";

function useParallax(factor = 0.18) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const isMobile = () => window.innerWidth < 640;
    const calc = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const vMid = window.innerHeight / 2;
      const f = isMobile() ? factor * 0.3 : factor;
      setOffset((mid - vMid) * f);
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true });
    window.addEventListener("resize", calc, { passive: true });
    return () => {
      window.removeEventListener("scroll", calc);
      window.removeEventListener("resize", calc);
    };
  }, [factor]);
  return [ref, offset];
}

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}


const WA_URL = "https://wa.me/13058126231";

export default function FernandaTorcida() {
  const [scrolled, setScrolled] = useState(false);

  const [heroRef, heroOffset] = useParallax(0.22);

  const [prRef, prVis] = useFadeIn(0.1);
  const [clRef, clVis] = useFadeIn(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ background: C.canvas, color: C.ink, fontFamily: FONT.body, overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 20px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(245,245,245,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.hairline}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
        <span style={{
          fontFamily: FONT.display, fontSize: 18, fontWeight: 300,
          letterSpacing: "-0.02em", color: C.ink,
        }}>F T</span>

        <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: FONT.body, fontSize: 15, fontWeight: 500,
          textDecoration: "none",
          background: scrolled ? C.ink : "transparent",
          color: scrolled ? "#ffffff" : C.ink,
          border: scrolled ? "none" : `1px solid ${C.hairlineStrong}`,
          borderRadius: 9999, padding: "9px 20px", height: 40,
          display: "inline-flex", alignItems: "center",
          transition: "all 0.35s",
        }}>Get in touch</a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        position: "relative", height: "100svh", minHeight: 560,
        overflow: "hidden", display: "flex", alignItems: "flex-end",
        background: "#ffffff",
      }}>
        {/* Parallax background — layered grays */}
        <div ref={heroRef} style={{
          position: "absolute", inset: "-15% 0",
          transform: `translateY(${heroOffset}px)`, willChange: "transform",
          background: "linear-gradient(160deg, #ececec 0%, #f7f7f7 35%, #ffffff 60%, #f0f0f0 100%)",
        }}>
          <div style={{ position: "absolute", top: "10%", left: "-5%", width: "65%", height: "70%", background: "radial-gradient(ellipse, #e2e2e2 0%, transparent 65%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", bottom: "5%", right: "-8%", width: "55%", height: "60%", background: "radial-gradient(ellipse, #e8e8e8 0%, transparent 65%)", borderRadius: "50%" }} />
          <div style={{ position: "absolute", top: "40%", right: "15%", width: "30%", height: "40%", background: "radial-gradient(ellipse, #f2f2f2 0%, transparent 70%)", borderRadius: "50%" }} />
        </div>

        {/* Atmospheric orbs */}
        <div style={{ position: "absolute", top: "12%", right: "8%", width: 280, height: 280, background: `radial-gradient(circle, ${C.gradientMint}35 0%, transparent 70%)`, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "35%", left: "4%", width: 200, height: 200, background: `radial-gradient(circle, ${C.gradientLavender}30 0%, transparent 70%)`, zIndex: 2, pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 3, padding: "0 20px 52px", width: "100%" }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 500,
            fontSize: "clamp(36px, 12vw, 64px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            color: C.ink, margin: 0,
          }}>
            Fernanda<br /><em>Torcida</em>
          </h1>

          <div style={{
            fontFamily: FONT.body, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.96px", textTransform: "uppercase",
            color: C.muted, marginTop: 16, marginBottom: 0,
          }}>
            Curator · Art Consultant · Cultural Strategist
          </div>

          <div style={{ marginTop: 12 }}>
            <span style={{ fontFamily: FONT.body, fontSize: 14, letterSpacing: "0.15px", color: C.muted }}>Miami, FL — Madrid, ESP</span>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 20, right: 20, zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{
            fontFamily: FONT.body, fontSize: 10, fontWeight: 600, letterSpacing: "0.96px",
            textTransform: "uppercase", color: C.mutedSoft, writingMode: "vertical-rl",
          }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: C.hairlineStrong, animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>


      {/* ── PRACTICE ── */}
      <section id="practice" ref={prRef} style={{
        padding: "80px 20px",
        background: C.canvas, color: C.ink,
        position: "relative", overflow: "hidden",
        opacity: prVis ? 1 : 0,
        transform: prVis ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}>
        <div style={{ position: "absolute", bottom: "5%", right: "-6%", width: 320, height: 320, background: `radial-gradient(circle, ${C.gradientLavender}55 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>

          <h2 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(30px, 7vw, 48px)",
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 44, color: C.ink,
          }}>
            Areas of<br />Expertise
          </h2>

          {[
            { n: "01", title: "Curatorial Direction",  desc: "Exhibition concept and development, gallery programming, artist relations, and participation in international art fairs including Design Miami/ and Zona MACO." },
            { n: "02", title: "Collection Strategy",   desc: "Acquisitions, collection management, and long-term advisory for private, corporate, and institutional clients — including Blackstone, Crescent Heights, and Royal Caribbean." },
            { n: "03", title: "Cultural Programming",  desc: "Art-focused tours, institutional collaborations, and cross-cultural exchange programs. Deep expertise in the Latin American contemporary scene and Havana's cultural landscape." },
            { n: "04", title: "Art Consulting",        desc: "Onboard collection curation, hospitality art programs, and bespoke advisory services that place contemporary art at the center of spatial and brand experience." },
          ].map(({ n, title, desc }, i) => (
            <div key={n}>
              <div style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0 16px", padding: "24px 0" }}>
                <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, color: C.muted, letterSpacing: "0.1em", paddingTop: 3 }}>{n}</span>
                <div>
                  <div style={{ fontFamily: FONT.display, fontSize: "clamp(20px, 5vw, 24px)", fontStyle: "italic", fontWeight: 300, marginBottom: 10, letterSpacing: "-0.01em", color: C.ink }}>
                    {title}
                  </div>
                  <p style={{ fontFamily: FONT.body, fontSize: 16, lineHeight: 1.65, letterSpacing: "0.15px", color: C.body, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
              {i < 3 && <div style={{ height: 1, background: C.hairline }} />}
            </div>
          ))}
        </div>
      </section>


      {/* ── COLLABORATIONS ── */}
      <section ref={clRef} style={{
        padding: "80px 20px",
        background: C.canvas,
        opacity: clVis ? 1 : 0,
        transform: clVis ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>

          <h2 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(28px, 6.5vw, 38px)",
            lineHeight: 1.15, letterSpacing: "-0.01em", marginBottom: 32,
          }}>
            Institutions &amp;<br />Collections
          </h2>

          <div className="clients-grid">
            {[
              { name: "Pérez Art Museum Miami",  type: "Institution"        },
              { name: "The Bass Museum",          type: "Institution"        },
              { name: "De La Cruz Collection",    type: "Private Collection" },
              { name: "Galbut Institute",          type: "Institution"        },
              { name: "Blackstone",               type: "Corporate Advisory" },
              { name: "Crescent Heights",         type: "Corporate Advisory" },
              { name: "Royal Caribbean",          type: "Hospitality Art"    },
              { name: "Frost Art Museum",         type: "Museum"             },
            ].map(({ name, type }, i, arr) => (
              <div key={name} style={{
                padding: "17px 0",
                borderBottom: i < arr.length - 1 ? `1px solid ${C.hairline}` : "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: FONT.display, fontSize: "clamp(17px, 4.5vw, 21px)", fontStyle: "italic", fontWeight: 300 }}>
                  {name}
                </span>
                <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.4em", textTransform: "uppercase", color: C.mutedSoft, flexShrink: 0, marginLeft: 12 }}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        background: C.canvas,
        padding: "80px 20px 64px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "8%", right: "-6%", width: 280, height: 280, background: `radial-gradient(circle, ${C.gradientSky}45 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "-8%", width: 260, height: 260, background: `radial-gradient(circle, ${C.gradientRose}45 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>

          <h2 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "normal",
            fontSize: "clamp(36px, 10vw, 64px)",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            color: C.ink, marginBottom: 12,
          }}>
            Let's <em>uncork</em><br />
            something great.
          </h2>

          <p style={{ fontFamily: FONT.body, fontSize: 17, lineHeight: 1.65, letterSpacing: "0.15px", color: C.body, marginBottom: 36 }}>
            Available for curatorial projects, collection advisory, and cultural programming engagements.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Email", value: "fernanda@detorcida.com", href: "mailto:fernanda@detorcida.com" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} style={{
                textDecoration: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "18px 0",
                borderBottom: `1px solid ${C.hairline}`,
              }}
                onMouseEnter={e => e.currentTarget.querySelector(".cv").style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.querySelector(".cv").style.opacity = "0.7"}
              >
                <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>
                  {label}
                </span>
                <span className="cv" style={{
                  fontFamily: FONT.display, fontSize: "clamp(16px, 4vw, 20px)",
                  fontStyle: "italic", fontWeight: 300,
                  color: C.ink, opacity: 0.7,
                  transition: "opacity 0.2s",
                }}>{value}</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", textDecoration: "none",
              fontFamily: FONT.body, fontSize: 16, fontWeight: 500,
              background: C.ink, color: "#ffffff",
              borderRadius: 9999, padding: "12px 28px", height: 44,
            }}>Send a message</a>
          </div>

          <div style={{ marginTop: 96, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 300, color: C.ink }}>F T</span>
            <span style={{ fontFamily: FONT.body, fontSize: 13, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>
              Miami · Madrid · 2026
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── ElevenLabs design tokens ── */
const C = {
  canvas:              "#ffffff",
  canvasSoft:          "#ffffff",
  canvasDeep:          "#0c0a09",
  surfaceCard:         "#ffffff",
  surfaceStrong:       "#f0efed",
  surfaceDark:         "#0c0a09",
  surfaceDarkElevated: "#1c1917",
  ink:                 "#0c0a09",
  primary:             "#292524",
  body:                "#4e4e4e",
  bodyStrong:          "#292524",
  muted:               "#777169",
  mutedSoft:           "#a8a29e",
  hairline:            "#e7e5e4",
  hairlineSoft:        "#f0efed",
  hairlineStrong:      "#d6d3d1",
  onPrimary:           "#ffffff",
  onDark:              "#ffffff",
  onDarkSoft:          "#a8a29e",
  gradientMint:        "#a7e5d3",
  gradientPeach:       "#f4c5a8",
  gradientLavender:    "#c8b8e0",
  gradientSky:         "#a8c8e8",
  gradientRose:        "#e8b8c4",
};

const FONT = {
  display: "'EB Garamond', 'Times New Roman', serif",
  body:    "'Inter', sans-serif",
};

const btnReset = {
  background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit",
};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=EB+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { -webkit-font-smoothing: antialiased; }
  ::selection { background: #a7e5d340; }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50%       { opacity: 1;   transform: scaleY(1.15); }
  }

  /* Mobile first */
  .nav-mobile  { display: flex !important; }
  .nav-desktop { display: none !important; }

  .work-block-1,
  .work-block-2 { padding: 0 20px; }

  @media (min-width: 640px) {
    .nav-mobile  { display: none !important; }
    .nav-desktop { display: flex !important; }
    .work-block-1 { padding: 0 40px 0 0; }
    .work-block-2 { padding: 0 0 0 40px; }
  }

  @media (min-width: 768px) {
    .clients-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 80px;
      align-items: center;
    }
    .clients-grid > div {
      border-bottom: 1px solid #e7e5e4;
      padding: 17px 0;
    }
  }
`;

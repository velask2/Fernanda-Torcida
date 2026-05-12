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

const IMG_HERO  = "https://images.unsplash.com/photo-1631573359763-367ea2a89ad8?q=80&w=2070&auto=format&fit=crop";
const IMG_WORK1 = "https://picsum.photos/seed/gallery2024/800/1100";
const IMG_WORK2 = "https://picsum.photos/seed/miamidesign/1000/680";

const WA_URL = "https://wa.me/13058126231";

export default function FernandaTorcida() {
  const [scrolled, setScrolled] = useState(false);

  const [heroRef, heroOffset]   = useParallax(0.22);
  const [work1Ref, work1Offset] = useParallax(0.14);
  const [work2Ref, work2Offset] = useParallax(0.12);

  const [stRef, stVis] = useFadeIn(0.1);
  const [prRef, prVis] = useFadeIn(0.1);
  const [wrRef, wrVis] = useFadeIn(0.08);
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
          fontFamily: FONT.display, fontSize: 18, fontWeight: 300, fontStyle: "italic",
          letterSpacing: "-0.02em",
          color: scrolled ? C.ink : C.onDark,
          transition: "color 0.35s",
        }}>F.T.</span>

        <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
          fontFamily: FONT.body, fontSize: 15, fontWeight: 500,
          textDecoration: "none",
          background: scrolled ? C.primary : "transparent",
          color: scrolled ? C.onPrimary : C.onDark,
          border: scrolled ? "none" : `1px solid rgba(255,255,255,0.35)`,
          borderRadius: 9999, padding: "9px 20px", height: 40,
          display: "inline-flex", alignItems: "center",
          transition: "all 0.35s",
        }}>Get in touch</a>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" style={{
        position: "relative", height: "100svh", minHeight: 560,
        overflow: "hidden", display: "flex", alignItems: "flex-end",
      }}>
        <div style={{ position: "absolute", top: "12%", right: "8%", width: 280, height: 280, background: `radial-gradient(circle, ${C.gradientMint}50 0%, transparent 70%)`, zIndex: 2, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "35%", left: "4%", width: 200, height: 200, background: `radial-gradient(circle, ${C.gradientLavender}40 0%, transparent 70%)`, zIndex: 2, pointerEvents: "none" }} />

        <div ref={heroRef} style={{
          position: "absolute", inset: "-15% 0",
          transform: `translateY(${heroOffset}px)`, willChange: "transform",
        }}>
          <img src={IMG_HERO} alt="Art space" style={{
            width: "100%", height: "100%", objectFit: "cover",
            filter: "grayscale(25%) brightness(0.48) sepia(10%)",
          }} />
        </div>

        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(12,10,9,0.92) 0%, rgba(12,10,9,0.3) 55%, transparent 100%)",
        }} />

        <div style={{ position: "relative", zIndex: 3, padding: "0 20px 52px", width: "100%" }}>
          <div style={{
            fontFamily: FONT.body, fontSize: 12, fontWeight: 600,
            letterSpacing: "0.96px", textTransform: "uppercase",
            color: C.onDarkSoft, marginBottom: 16,
          }}>
            Curator · Creative Director · Cultural Strategist
          </div>

          <h1 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(36px, 12vw, 64px)",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            color: C.onDark, margin: 0,
          }}>
            Fernanda<br />
            <span style={{ color: C.gradientMint }}>Torcida</span>
          </h1>

          <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ width: 28, height: 1, background: C.hairlineStrong, flexShrink: 0 }} />
            <span style={{ fontFamily: FONT.body, fontSize: 14, letterSpacing: "0.15px", color: C.onDarkSoft }}>Miami, FL</span>
            <span style={{ fontFamily: FONT.body, fontSize: 14, letterSpacing: "0.15px", color: `${C.onDark}44` }}>Est. Frost Art Museum</span>
          </div>

          <div style={{ marginTop: 28 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", textDecoration: "none",
              fontFamily: FONT.body, fontSize: 15, fontWeight: 500,
              background: C.onDark, color: C.canvasDeep,
              borderRadius: 9999, padding: "10px 24px", height: 40,
            }}>Let's work together</a>
          </div>
        </div>

        <div style={{
          position: "absolute", bottom: 20, right: 20, zIndex: 3,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{
            fontFamily: FONT.body, fontSize: 10, fontWeight: 600, letterSpacing: "0.96px",
            textTransform: "uppercase", color: C.onDarkSoft, writingMode: "vertical-rl",
          }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: `${C.onDark}50`, animation: "scrollPulse 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── STATEMENT ── */}
      <section ref={stRef} style={{
        padding: "80px 20px",
        background: C.canvas,
        position: "relative", overflow: "hidden",
        opacity: stVis ? 1 : 0,
        transform: stVis ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div style={{ position: "absolute", top: "-8%", right: "-6%", width: 360, height: 360, background: `radial-gradient(circle, ${C.gradientPeach}38 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", fontWeight: 300, color: C.muted }}>I</span>
            <div style={{ flex: 1, height: 1, background: C.hairline }} />
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>Statement</span>
          </div>

          <blockquote style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(22px, 5.5vw, 40px)",
            lineHeight: 1.2, letterSpacing: "-0.01em",
            color: C.ink, margin: "0 0 28px", padding: 0,
          }}>
            "A practice built on the belief that contemporary art is the most vital language of our time."
          </blockquote>

          <div style={{ height: 1, background: C.hairline, marginBottom: 24 }} />

          <p style={{
            fontFamily: FONT.body, fontSize: 15, fontWeight: 400,
            lineHeight: 1.6, letterSpacing: "0.15px",
            color: C.body, margin: 0,
          }}>
            Fernanda Torcida is a curator, creative director, and cultural strategist
            based in Miami. Her multidisciplinary practice spans curatorial work, collection
            management, cultural programming, and international art consulting — with a
            focus on contemporary art and cross-cultural exchange between Latin America
            and global audiences.
          </p>

          <div style={{ marginTop: 24, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Tile Blush Gallery", "Design Miami/", "Zona MACO", "PAMM", "The Bass"].map(tag => (
              <span key={tag} style={{
                fontFamily: FONT.body, fontSize: 12, fontWeight: 600,
                letterSpacing: "0.96px", textTransform: "uppercase",
                color: C.ink, background: C.surfaceStrong,
                borderRadius: 9999, padding: "4px 10px",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRACTICE ── */}
      <section id="practice" ref={prRef} style={{
        padding: "80px 20px",
        background: C.surfaceDark, color: C.onDark,
        position: "relative", overflow: "hidden",
        opacity: prVis ? 1 : 0,
        transform: prVis ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}>
        <div style={{ position: "absolute", bottom: "5%", right: "-6%", width: 320, height: 320, background: `radial-gradient(circle, ${C.gradientLavender}20 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 44 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", fontWeight: 300, color: C.onDarkSoft }}>II</span>
            <div style={{ flex: 1, height: 1, background: `${C.onDark}18` }} />
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.onDarkSoft }}>Practice</span>
          </div>

          <h2 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(28px, 7vw, 48px)",
            lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 44,
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
              <div style={{ display: "grid", gridTemplateColumns: "32px 1fr", gap: "0 16px", padding: "22px 0" }}>
                <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, color: C.onDarkSoft, letterSpacing: "0.1em", paddingTop: 3 }}>{n}</span>
                <div>
                  <div style={{ fontFamily: FONT.display, fontSize: "clamp(17px, 4.5vw, 22px)", fontStyle: "italic", fontWeight: 300, marginBottom: 8, letterSpacing: "-0.01em" }}>
                    {title}
                  </div>
                  <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, letterSpacing: "0.15px", color: C.onDarkSoft, margin: 0 }}>
                    {desc}
                  </p>
                </div>
              </div>
              {i < 3 && <div style={{ height: 1, background: `${C.onDark}12` }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ── SELECTED WORK ── */}
      <section id="work" ref={wrRef} style={{
        padding: "80px 0",
        background: C.canvasSoft,
        opacity: wrVis ? 1 : 0,
        transform: wrVis ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 44 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", fontWeight: 300, color: C.muted }}>III</span>
            <div style={{ flex: 1, height: 1, background: C.hairline }} />
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>Selected Work</span>
          </div>
        </div>

        <div className="work-block-1" style={{ marginBottom: 44 }}>
          <div ref={work1Ref} style={{ overflow: "hidden", width: "100%", height: "clamp(260px, 65vw, 500px)", borderRadius: 16 }}>
            <img src={IMG_WORK1} alt="Tile Blush Gallery — curatorial installation" style={{
              width: "100%", height: "120%", objectFit: "cover",
              transform: `translateY(${work1Offset}px)`, willChange: "transform",
              filter: "grayscale(10%) sepia(8%) contrast(1.05)", display: "block",
            }} />
          </div>
          <div style={{ padding: "14px 20px 0" }}>
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>
              Tile Blush Gallery — Miami, 2024
            </span>
            <div style={{ fontFamily: FONT.display, fontSize: "clamp(19px, 4.5vw, 26px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.2, margin: "6px 0 8px", letterSpacing: "-0.01em" }}>
              Multidisciplinary Programming at Design Miami/
            </div>
            <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, letterSpacing: "0.15px", color: C.body, margin: 0 }}>
              Annual participation in Design Miami/ presenting collectible design alongside contemporary art — curated with a focus on Latin American and international dialogue.
            </p>
          </div>
        </div>

        <div className="work-block-2">
          <div ref={work2Ref} style={{ overflow: "hidden", width: "100%", height: "clamp(210px, 52vw, 380px)", borderRadius: 16 }}>
            <img src={IMG_WORK2} alt="Zona MACO presentation" style={{
              width: "100%", height: "120%", objectFit: "cover",
              transform: `translateY(${work2Offset}px)`, willChange: "transform",
              filter: "grayscale(15%) sepia(8%) brightness(0.97)", display: "block",
            }} />
          </div>
          <div style={{ padding: "14px 20px 0", maxWidth: 640, margin: "0 auto" }}>
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>
              Zona MACO — Mexico City
            </span>
            <div style={{ fontFamily: FONT.display, fontSize: "clamp(19px, 4.5vw, 26px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.2, margin: "6px 0 8px", letterSpacing: "-0.01em" }}>
              International Art Fair Presence
            </div>
            <p style={{ fontFamily: FONT.body, fontSize: 14, lineHeight: 1.6, letterSpacing: "0.15px", color: C.body, margin: 0 }}>
              Representation at one of Latin America's most prestigious contemporary art platforms — connecting Miami-based practice with the broader hemispheric art conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ── COLLABORATIONS ── */}
      <section ref={clRef} style={{
        padding: "80px 20px",
        background: C.canvas,
        borderTop: `1px solid ${C.hairline}`,
        opacity: clVis ? 1 : 0,
        transform: clVis ? "none" : "translateY(24px)",
        transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", fontWeight: 300, color: C.muted }}>IV</span>
            <div style={{ flex: 1, height: 1, background: C.hairline }} />
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.muted }}>Collaborations</span>
          </div>

          <h2 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(24px, 6vw, 36px)",
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
                padding: "15px 0",
                borderBottom: i < arr.length - 1 ? `1px solid ${C.hairline}` : "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ fontFamily: FONT.display, fontSize: "clamp(15px, 4vw, 19px)", fontStyle: "italic", fontWeight: 300 }}>
                  {name}
                </span>
                <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, letterSpacing: "0.5em", textTransform: "uppercase", color: C.mutedSoft, flexShrink: 0, marginLeft: 12 }}>
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{
        background: C.surfaceDark,
        padding: "80px 20px 64px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "8%", right: "-6%", width: 280, height: 280, background: `radial-gradient(circle, ${C.gradientSky}20 0%, transparent 70%)`, pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "12%", left: "-8%", width: 260, height: 260, background: `radial-gradient(circle, ${C.gradientRose}20 0%, transparent 70%)`, pointerEvents: "none" }} />

        <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 44 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", fontWeight: 300, color: C.onDarkSoft }}>V</span>
            <div style={{ flex: 1, height: 1, background: `${C.onDark}18` }} />
            <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.onDarkSoft }}>Contact</span>
          </div>

          <h2 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(36px, 10vw, 64px)",
            lineHeight: 1.05, letterSpacing: "-0.03em",
            color: C.onDark, marginBottom: 12,
          }}>
            Let's work<br />
            <span style={{ color: C.gradientMint }}>together.</span>
          </h2>

          <p style={{ fontFamily: FONT.body, fontSize: 15, lineHeight: 1.6, letterSpacing: "0.15px", color: C.onDarkSoft, marginBottom: 36 }}>
            Available for curatorial projects, collection advisory, and cultural programming engagements.
          </p>

          <div style={{ height: 1, background: `${C.onDark}18`, marginBottom: 32 }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Email",     value: "fernanda@tileblush.com", href: "mailto:fernanda@tileblush.com" },
              { label: "Gallery",   value: "Tile Blush — Miami, FL",  href: "#" },
              { label: "Instagram", value: "@fernandatorcida",        href: "#" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} style={{
                textDecoration: "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "16px 0",
                borderBottom: `1px solid ${C.onDark}18`,
              }}
                onMouseEnter={e => e.currentTarget.querySelector(".cv").style.opacity = "1"}
                onMouseLeave={e => e.currentTarget.querySelector(".cv").style.opacity = "0.7"}
              >
                <span style={{ fontFamily: FONT.body, fontSize: 12, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.onDarkSoft }}>
                  {label}
                </span>
                <span className="cv" style={{
                  fontFamily: FONT.display, fontSize: "clamp(14px, 3.5vw, 18px)",
                  fontStyle: "italic", fontWeight: 300,
                  color: C.onDark, opacity: 0.7,
                  transition: "opacity 0.2s",
                }}>{value}</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 36 }}>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" style={{
              display: "inline-flex", alignItems: "center", textDecoration: "none",
              fontFamily: FONT.body, fontSize: 15, fontWeight: 500,
              background: C.onDark, color: C.canvasDeep,
              borderRadius: 9999, padding: "10px 24px", height: 40,
            }}>Send a message</a>
          </div>

          <div style={{ marginTop: 52, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontFamily: FONT.display, fontSize: 20, fontStyle: "italic", fontWeight: 300, color: C.onDark }}>F.T.</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 16, height: 1, background: C.hairlineStrong }} />
              <span style={{ fontFamily: FONT.body, fontSize: 11, fontWeight: 600, letterSpacing: "0.96px", textTransform: "uppercase", color: C.onDarkSoft }}>
                Miami · 2025
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ── ElevenLabs design tokens ── */
const C = {
  canvas:              "#f5f5f5",
  canvasSoft:          "#fafafa",
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
  @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@400;500;600&display=swap');

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
      column-gap: 40px;
    }
  }
`;

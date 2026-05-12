import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Parallax hook (viewport-relative, safe on mobile) ─── */
function useParallax(factor = 0.18) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const isMobile = () => window.innerWidth < 768;
    const calc = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const mid = rect.top + rect.height / 2;
      const vMid = window.innerHeight / 2;
      const f = isMobile() ? factor * 0.4 : factor;
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

/* ─── Fade-in-on-scroll hook ─── */
function useFadeIn(threshold = 0.15) {
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

/* ─── Images (art-adjacent, seeded picsum) ─── */
const IMG_HERO  = "https://picsum.photos/seed/artspace88/1400/900";
const IMG_WORK1 = "https://picsum.photos/seed/gallery2024/800/1100";
const IMG_WORK2 = "https://picsum.photos/seed/miamidesign/1000/680";

/* ─── Main Component ─── */
export default function FernandaTorcida() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Hero parallax */
  const [heroRef, heroOffset] = useParallax(0.22);

  /* Work images parallax */
  const [work1Ref, work1Offset] = useParallax(0.14);
  const [work2Ref, work2Offset] = useParallax(0.12);

  /* Fade-in sections */
  const [stRef, stVis]   = useFadeIn(0.1);
  const [prRef, prVis]   = useFadeIn(0.12);
  const [wrRef, wrVis]   = useFadeIn(0.08);
  const [clRef, clVis]   = useFadeIn(0.12);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Practice",      id: "practice" },
    { label: "Selected Work", id: "work"     },
    { label: "Contact",       id: "contact"  },
  ];

  return (
    <div style={{ background: C.parchment, color: C.ink, fontFamily: FONT.body, overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ════════ NAV ════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "0 24px",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(242,237,230,0.94)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.rule}` : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <button onClick={() => scrollTo("hero")} style={btnReset}>
          <span style={{
            fontFamily: FONT.display, fontSize: 18, letterSpacing: "0.05em",
            color: scrolled ? C.ink : C.parchment, fontStyle: "italic",
            transition: "color 0.4s",
          }}>
            F.T.
          </span>
        </button>

        {/* Desktop nav */}
        <div className="nav-desktop" style={{ display: "flex", gap: 36 }}>
          {navLinks.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              ...btnReset,
              fontFamily: FONT.label, fontSize: 9, letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: scrolled ? C.ink : C.parchment,
              opacity: 0.75,
              transition: "opacity 0.2s, color 0.4s",
            }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.75}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button className="nav-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{
          ...btnReset,
          display: "flex", flexDirection: "column", gap: 5, padding: 4,
        }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 22, height: 1,
              background: scrolled ? C.ink : C.parchment,
              transition: "all 0.3s",
              transform: menuOpen
                ? i === 0 ? "rotate(45deg) translate(4px,4px)"
                : i === 2 ? "rotate(-45deg) translate(4px,-4px)"
                : "scaleX(0)"
                : "none",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }} />
          ))}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 99,
        background: C.ink,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 40,
        opacity: menuOpen ? 1 : 0,
        pointerEvents: menuOpen ? "all" : "none",
        transition: "opacity 0.35s ease",
      }}>
        {navLinks.map(({ label, id }) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            ...btnReset,
            fontFamily: FONT.display, fontSize: 36,
            fontStyle: "italic", color: C.parchment,
            letterSpacing: "0.02em",
          }}>
            {label}
          </button>
        ))}
        <div style={{ height: 1, width: 40, background: C.gold }} />
        <span style={{ fontFamily: FONT.label, fontSize: 9, color: C.gold, letterSpacing: "0.4em", textTransform: "uppercase" }}>
          Miami · Havana · International
        </span>
      </div>

      {/* ════════ HERO ════════ */}
      <section id="hero" style={{
        position: "relative", height: "100svh", minHeight: 560,
        overflow: "hidden", display: "flex", alignItems: "flex-end",
      }}>
        {/* Parallax image */}
        <div ref={heroRef} style={{
          position: "absolute", inset: "-15% 0",
          transform: `translateY(${heroOffset}px)`,
          willChange: "transform",
        }}>
          <img
            src={IMG_HERO}
            alt="Art space"
            style={{ width: "100%", height: "100%", objectFit: "cover",
              filter: "grayscale(30%) brightness(0.55) sepia(15%)" }}
          />
        </div>

        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(26,20,16,0.88) 0%, rgba(26,20,16,0.3) 55%, transparent 100%)",
        }} />

        {/* Thin top rule */}
        <div style={{ position: "absolute", top: 80, left: 24, right: 24, height: 1, background: `${C.gold}55` }} />

        {/* Hero text */}
        <div style={{ position: "relative", padding: "0 24px 52px", width: "100%" }}>
          {/* Label */}
          <div style={{
            fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.45em",
            textTransform: "uppercase", color: C.gold, marginBottom: 16,
          }}>
            Curator · Creative Director · Cultural Strategist
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: FONT.display, fontWeight: 300, fontStyle: "italic",
            fontSize: "clamp(52px, 14vw, 130px)",
            lineHeight: 0.92, color: C.parchment, margin: 0,
            letterSpacing: "-0.01em",
          }}>
            Fernanda<br />
            <span style={{ color: C.gold }}>Torcida</span>
          </h1>

          {/* Bottom metadata row */}
          <div style={{
            marginTop: 28, display: "flex", alignItems: "center",
            gap: 18, flexWrap: "wrap",
          }}>
            <div style={{ height: 1, width: 32, background: C.gold, flexShrink: 0 }} />
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.35em",
              textTransform: "uppercase", color: `${C.parchment}99`,
            }}>
              Miami, FL
            </span>
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.35em",
              textTransform: "uppercase", color: `${C.parchment}55`,
            }}>
              Est. Frost Art Museum
            </span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 20, right: 24,
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        }}>
          <span style={{
            fontFamily: FONT.label, fontSize: 7, letterSpacing: "0.3em",
            textTransform: "uppercase", color: `${C.parchment}66`,
            writingMode: "vertical-rl",
          }}>
            Scroll
          </span>
          <div style={{
            width: 1, height: 32, background: `${C.gold}88`,
            animation: "scrollPulse 2s ease-in-out infinite",
          }} />
        </div>
      </section>

      {/* ════════ STATEMENT ════════ */}
      <section ref={stRef} style={{
        padding: "80px 24px 72px",
        opacity: stVis ? 1 : 0,
        transform: stVis ? "none" : "translateY(30px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Section marker */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 40 }}>
            <span style={{
              fontFamily: FONT.display, fontSize: 13, fontStyle: "italic",
              color: C.gold, letterSpacing: "0.05em",
            }}>I</span>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.4em",
              textTransform: "uppercase", color: C.muted,
            }}>Statement</span>
          </div>

          {/* Pull quote */}
          <blockquote style={{
            fontFamily: FONT.display, fontSize: "clamp(24px, 6vw, 42px)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.3,
            color: C.ink, margin: "0 0 36px",
            paddingLeft: 0, letterSpacing: "-0.01em",
          }}>
            "A practice built on the belief that contemporary art<br className="br-desktop" />
            {" "}is the most vital language of our time."
          </blockquote>

          <div style={{ height: 1, background: C.rule, marginBottom: 32 }} />

          {/* Bio */}
          <p style={{
            fontFamily: FONT.body, fontSize: "clamp(15px, 4vw, 17px)",
            lineHeight: 1.85, color: C.inkMid, margin: 0,
          }}>
            Fernanda Torcida is a curator, creative director, and cultural strategist
            based in Miami. Her multidisciplinary practice spans curatorial work, collection
            management, cultural programming, and international art consulting — with a
            focus on contemporary art and cross-cultural exchange between Latin America
            and global audiences.
          </p>

          <div style={{ marginTop: 32, display: "flex", gap: 10, flexWrap: "wrap" }}>
            {["Tile Blush Gallery", "Design Miami/", "Zona MACO", "PAMM", "The Bass"].map(tag => (
              <span key={tag} style={{
                fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.25em",
                textTransform: "uppercase", color: C.muted,
                border: `1px solid ${C.rule}`,
                padding: "5px 12px",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ PRACTICE ════════ */}
      <section id="practice" ref={prRef} style={{
        padding: "72px 24px",
        background: C.ink, color: C.parchment,
        opacity: prVis ? 1 : 0,
        transform: prVis ? "none" : "translateY(24px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Section marker */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 52 }}>
            <span style={{
              fontFamily: FONT.display, fontSize: 13, fontStyle: "italic",
              color: C.gold, letterSpacing: "0.05em",
            }}>II</span>
            <div style={{ flex: 1, height: 1, background: `${C.parchment}1A` }} />
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.4em",
              textTransform: "uppercase", color: `${C.parchment}55`,
            }}>Practice</span>
          </div>

          <h2 style={{
            fontFamily: FONT.display, fontSize: "clamp(28px, 7vw, 48px)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.15,
            marginBottom: 52, letterSpacing: "-0.01em",
          }}>
            Areas of<br />Expertise
          </h2>

          {/* Services list */}
          {[
            {
              n: "01", title: "Curatorial Direction",
              desc: "Exhibition concept and development, gallery programming, artist relations, and participation in international art fairs including Design Miami/ and Zona MACO.",
            },
            {
              n: "02", title: "Collection Strategy",
              desc: "Acquisitions, collection management, and long-term advisory for private, corporate, and institutional clients — including Blackstone, Crescent Heights, and Royal Caribbean.",
            },
            {
              n: "03", title: "Cultural Programming",
              desc: "Art-focused tours, institutional collaborations, and cross-cultural exchange programs. Deep expertise in the Latin American contemporary scene and Havana's cultural landscape.",
            },
            {
              n: "04", title: "Art Consulting",
              desc: "Onboard collection curation, hospitality art programs, and bespoke advisory services that place contemporary art at the center of spatial and brand experience.",
            },
          ].map(({ n, title, desc }, i) => (
            <div key={n}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "36px 1fr",
                gap: "0 20px",
                padding: "28px 0",
              }}>
                <span style={{
                  fontFamily: FONT.label, fontSize: 9, color: C.gold,
                  letterSpacing: "0.1em", paddingTop: 4,
                }}>
                  {n}
                </span>
                <div>
                  <div style={{
                    fontFamily: FONT.display, fontSize: "clamp(18px, 5vw, 24px)",
                    fontStyle: "italic", marginBottom: 10, letterSpacing: "-0.01em",
                  }}>
                    {title}
                  </div>
                  <p style={{
                    fontFamily: FONT.body, fontSize: 14, lineHeight: 1.75,
                    color: `${C.parchment}88`, margin: 0,
                  }}>
                    {desc}
                  </p>
                </div>
              </div>
              {i < 3 && <div style={{ height: 1, background: `${C.parchment}12` }} />}
            </div>
          ))}
        </div>
      </section>

      {/* ════════ SELECTED WORK ════════ */}
      <section id="work" ref={wrRef} style={{
        padding: "80px 0 72px",
        opacity: wrVis ? 1 : 0,
        transform: wrVis ? "none" : "translateY(28px)",
        transition: "opacity 0.9s ease, transform 0.9s ease",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 52 }}>
            <span style={{
              fontFamily: FONT.display, fontSize: 13, fontStyle: "italic",
              color: C.gold,
            }}>III</span>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.4em",
              textTransform: "uppercase", color: C.muted,
            }}>Selected Work</span>
          </div>
        </div>

        {/* Image 1 — bleeds left on desktop, full-width mobile */}
        <div className="work-block-1" style={{ marginBottom: 56 }}>
          <div ref={work1Ref} style={{
            overflow: "hidden",
            width: "100%",
            height: "clamp(320px, 70vw, 560px)",
          }}>
            <img
              src={IMG_WORK1}
              alt="Tile Blush Gallery — curatorial installation"
              style={{
                width: "100%", height: "120%", objectFit: "cover",
                transform: `translateY(${work1Offset}px)`,
                willChange: "transform",
                filter: "grayscale(15%) sepia(10%) contrast(1.05)",
                display: "block",
              }}
            />
          </div>
          <div style={{ padding: "20px 24px 0", maxWidth: 460 }}>
            <div style={{
              fontFamily: FONT.label, fontSize: 8, color: C.gold,
              letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 8,
            }}>
              Tile Blush Gallery — Miami, 2024
            </div>
            <div style={{
              fontFamily: FONT.display, fontSize: "clamp(20px, 5vw, 30px)",
              fontStyle: "italic", lineHeight: 1.25, marginBottom: 10,
            }}>
              Multidisciplinary Programming at Design Miami/
            </div>
            <p style={{
              fontFamily: FONT.body, fontSize: 13, lineHeight: 1.7, color: C.inkMid,
            }}>
              Annual participation in Design Miami/ presenting collectible design
              alongside contemporary art — curated with a focus on Latin American
              and international dialogue.
            </p>
          </div>
        </div>

        {/* Image 2 — offset right on desktop, full-width mobile */}
        <div className="work-block-2">
          <div ref={work2Ref} style={{
            overflow: "hidden",
            width: "100%",
            height: "clamp(240px, 55vw, 420px)",
          }}>
            <img
              src={IMG_WORK2}
              alt="Zona MACO presentation"
              style={{
                width: "100%", height: "120%", objectFit: "cover",
                transform: `translateY(${work2Offset}px)`,
                willChange: "transform",
                filter: "grayscale(20%) sepia(8%) brightness(0.95)",
                display: "block",
              }}
            />
          </div>
          <div style={{ padding: "20px 24px 0", maxWidth: 680, margin: "0 auto" }}>
            <div style={{
              fontFamily: FONT.label, fontSize: 8, color: C.gold,
              letterSpacing: "0.35em", textTransform: "uppercase", marginBottom: 8,
            }}>
              Zona MACO — Mexico City
            </div>
            <div style={{
              fontFamily: FONT.display, fontSize: "clamp(20px, 5vw, 30px)",
              fontStyle: "italic", lineHeight: 1.25, marginBottom: 10,
            }}>
              International Art Fair Presence
            </div>
            <p style={{
              fontFamily: FONT.body, fontSize: 13, lineHeight: 1.7, color: C.inkMid,
            }}>
              Representation at one of Latin America's most prestigious contemporary
              art platforms — connecting Miami-based practice with the broader
              hemispheric art conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ════════ COLLABORATIONS ════════ */}
      <section ref={clRef} style={{
        padding: "72px 24px",
        borderTop: `1px solid ${C.rule}`,
        opacity: clVis ? 1 : 0,
        transform: clVis ? "none" : "translateY(24px)",
        transition: "opacity 0.9s ease 0.1s, transform 0.9s ease 0.1s",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 48 }}>
            <span style={{
              fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", color: C.gold,
            }}>IV</span>
            <div style={{ flex: 1, height: 1, background: C.rule }} />
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.4em",
              textTransform: "uppercase", color: C.muted,
            }}>Collaborations</span>
          </div>

          <h2 style={{
            fontFamily: FONT.display, fontSize: "clamp(24px, 6vw, 38px)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.2, marginBottom: 40,
          }}>
            Institutions &amp;<br />Collections
          </h2>

          {/* Two-column client grid on tablet+ */}
          <div className="clients-grid">
            {[
              { name: "Pérez Art Museum Miami", type: "Institution" },
              { name: "The Bass Museum",         type: "Institution" },
              { name: "De La Cruz Collection",   type: "Private Collection" },
              { name: "Galbut Institute",         type: "Institution" },
              { name: "Blackstone",              type: "Corporate Advisory" },
              { name: "Crescent Heights",        type: "Corporate Advisory" },
              { name: "Royal Caribbean",         type: "Hospitality Art" },
              { name: "Frost Art Museum",        type: "Museum" },
            ].map(({ name, type }, i, arr) => (
              <div key={name} style={{
                padding: "18px 0",
                borderBottom: i < arr.length - 1 ? `1px solid ${C.rule}` : "none",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{
                  fontFamily: FONT.display, fontSize: "clamp(15px, 4vw, 19px)",
                  fontStyle: "italic",
                }}>{name}</span>
                <span style={{
                  fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.2em",
                  textTransform: "uppercase", color: C.muted, textAlign: "right",
                  flexShrink: 0, marginLeft: 12,
                }}>{type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ CONTACT ════════ */}
      <section id="contact" style={{
        background: C.ink, padding: "80px 24px 64px",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 52 }}>
            <span style={{
              fontFamily: FONT.display, fontSize: 13, fontStyle: "italic", color: C.gold,
            }}>V</span>
            <div style={{ flex: 1, height: 1, background: `${C.parchment}1A` }} />
            <span style={{
              fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.4em",
              textTransform: "uppercase", color: `${C.parchment}55`,
            }}>Contact</span>
          </div>

          <h2 style={{
            fontFamily: FONT.display, fontSize: "clamp(32px, 10vw, 72px)",
            fontWeight: 300, fontStyle: "italic", lineHeight: 1.05,
            color: C.parchment, marginBottom: 48, letterSpacing: "-0.02em",
          }}>
            Let's work<br />
            <span style={{ color: C.gold }}>together.</span>
          </h2>

          <div style={{ height: 1, background: `${C.parchment}1A`, marginBottom: 40 }} />

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {[
              { label: "Email",    value: "fernanda@tileblush.com",    href: "mailto:fernanda@tileblush.com" },
              { label: "Gallery",  value: "Tile Blush — Miami, FL",     href: "#" },
              { label: "Instagram",value: "@fernandatorcida",          href: "#" },
            ].map(({ label, value, href }) => (
              <a key={label} href={href} style={{
                textDecoration: "none", display: "flex",
                justifyContent: "space-between", alignItems: "center",
                paddingBottom: 20,
                borderBottom: `1px solid ${C.parchment}18`,
              }}
                onMouseEnter={e => e.currentTarget.querySelector(".cv").style.color = C.gold}
                onMouseLeave={e => e.currentTarget.querySelector(".cv").style.color = C.parchment}
              >
                <span style={{
                  fontFamily: FONT.label, fontSize: 8, letterSpacing: "0.35em",
                  textTransform: "uppercase", color: `${C.parchment}55`,
                }}>{label}</span>
                <span className="cv" style={{
                  fontFamily: FONT.display, fontSize: "clamp(14px, 4vw, 18px)",
                  fontStyle: "italic", color: C.parchment,
                  transition: "color 0.2s",
                }}>{value}</span>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div style={{
            marginTop: 64, display: "flex",
            justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12,
          }}>
            <span style={{
              fontFamily: FONT.display, fontSize: 20, fontStyle: "italic", color: C.parchment,
            }}>F.T.</span>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 16, height: 1, background: C.gold }} />
              <span style={{
                fontFamily: FONT.label, fontSize: 7, letterSpacing: "0.35em",
                textTransform: "uppercase", color: `${C.parchment}44`,
              }}>Miami · 2025</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Design tokens ─── */
const C = {
  parchment: "#F2EDE6",
  ink:       "#1A1410",
  inkMid:    "#5C4E44",
  gold:      "#C8A96E",
  rule:      "#D8CEC4",
  muted:     "#8C7B6E",
};

const FONT = {
  display: "'Cormorant Garamond', Georgia, serif",
  body:    "'Cormorant Garamond', Georgia, serif",
  label:   "'Montserrat', sans-serif",
};

const btnReset = {
  background: "none", border: "none", cursor: "pointer",
  padding: 0, font: "inherit",
};

/* ─── Global CSS ─── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Montserrat:wght@200;300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  ::selection { background: #C8A96E33; }

  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50%       { opacity: 1;   transform: scaleY(1.2); }
  }

  /* Mobile: hamburger visible, desktop nav hidden */
  .nav-mobile  { display: flex !important; }
  .nav-desktop { display: none !important; }
  .br-desktop  { display: none; }

  /* Work layout mobile = full-bleed */
  .work-block-1 { }
  .work-block-2 { }

  .clients-grid > * + * { }

  @media (min-width: 640px) {
    .nav-mobile  { display: none !important; }
    .nav-desktop { display: flex !important; }
    .br-desktop  { display: inline; }

    /* Work block 1 — bleed left */
    .work-block-1 { padding-right: 48px; }
    /* Work block 2 — offset right */
    .work-block-2 { padding-left: 48px; }
  }

  @media (min-width: 768px) {
    .clients-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 40px;
    }
  }
`;

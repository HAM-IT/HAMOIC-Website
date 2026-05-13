import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ArrowRight, ArrowUpRight, CheckCircle2, Bot, Layers, CheckSquare, Linkedin } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

// Utility for merging tailwind classes safely
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const containerRef = useRef(null);

  useEffect(() => {
    // GSAP context for clean cleanup
    const ctx = gsap.context(() => {
      // Setup global scroll triggers here if needed
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen">


      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <PhilosophySection />
        <ToolsSection />
        <AboutSection />
        <ProtocolSection />
        <GetStartedSection />
      </main>
      <Footer />
    </div>
  );
}

// ----------------------------------------------------------------------
// COMPONENTS
// ----------------------------------------------------------------------

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out py-3 px-6 rounded-full flex items-center justify-between w-[90%] max-w-5xl",
          scrolled || mobileMenuOpen
            ? "bg-surface/60 backdrop-blur-xl border border-muted shadow-2xl"
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="flex items-center gap-2">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="cursor-pointer flex items-center">
            <img src="/logo-monkey.png" alt="Company Logo" className="h-9 md:h-10 w-auto opacity-95 hover:opacity-100 hover:scale-[1.02] transition-all drop-shadow-lg" />
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {['Process', 'Manifesto', 'Tools', 'About', 'Protocol'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-text/70 hover:text-text transition-colors hover:-translate-y-px duration-300">
              {link}
            </a>
          ))}
        </nav>

        <MagneticButton href="https://calendar.app.google/5VyFxPm4kGYtdeng9" target="_blank" rel="noopener noreferrer" className="hidden md:flex bg-accent text-background border border-accent/20 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-accent/90">
          Let's Question Everything
        </MagneticButton>

        <button className="md:hidden text-text p-1 relative z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 bg-[#050508]/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 md:hidden",
        mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {['Process', 'Manifesto', 'Tools', 'About', 'Protocol'].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-sans font-bold text-text hover:text-accent transition-colors"
          >
            {link}
          </a>
        ))}
        <a
          href="https://calendar.app.google/5VyFxPm4kGYtdeng9"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-4 bg-accent text-background font-semibold px-8 py-3 rounded-full"
        >
          Let's Question Everything
        </a>
      </div>
    </>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo([title1Ref.current, title2Ref.current, ctaRef.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, delay: 0.2 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative w-full min-h-[100dvh] flex flex-col justify-end pt-32 px-6 pb-6 md:px-16 md:pb-12 lg:px-24 lg:pb-16 overflow-hidden will-change-transform" style={{ transform: 'translateZ(0)' }}>
      <div className="absolute inset-0 z-0 will-change-transform" style={{ transform: 'translate3d(0,0,0)' }}>
        <img
          src="/hero-nascar-final.png"
          alt="NASCAR Pit Crew inside Corporate Office Metaphor"
          className="w-full h-full object-cover object-center" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        />
        {/* Adjusted gradient: clear at the top, fading to dark at the bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent h-[60%] mt-auto" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start gap-6 pb-4 md:pb-4" style={{ transform: 'translateZ(0)' }}>
        {/* Soft, targeted fog behind text to ensure crisp readability against the high-quality image */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-transparent blur-3xl -m-16 rounded-[4rem] opacity-90 pointer-events-none" />

        <div className="flex flex-col gap-2 relative z-10">
          <h1 ref={title1Ref} className="font-sans font-bold text-4xl sm:text-5xl lg:text-6xl text-text tracking-tight drop-shadow-md">
            Most companies don't need AI. They need to get organized.
          </h1>
          <h2 ref={title2Ref} className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-accent leading-[0.9] tracking-tight pr-4 drop-shadow-lg">
            We start by fixing your foundation. Everything else comes after.
          </h2>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
          <MagneticButton href="https://calendar.app.google/5VyFxPm4kGYtdeng9" target="_blank" rel="noopener noreferrer" className="bg-accent text-background px-8 py-4 rounded-full font-sans font-semibold text-lg flex items-center justify-center gap-2 group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">
              Let's Question Everything <ArrowRight size={20} className="group-hover:translate-x-1 duration-300" />
            </span>
          </MagneticButton>
          <div className="px-6 py-4 flex items-center justify-center gap-3 border border-muted rounded-full bg-surface/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm text-text/80">Troop Operational</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  const sectionRef = useRef(null);

  return (
    <section id="process" ref={sectionRef} className="w-full py-32 px-6 md:px-12 bg-background relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col gap-20">
        <div className="flex flex-col gap-4 max-w-2xl">
          <h3 className="font-sans text-accent font-semibold tracking-wide uppercase text-sm">🐒 The Process</h3>
          <h2 className="font-serif italic text-4xl md:text-6xl text-text">How We Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DiagnosticShufflerCard />
          <TelemetryTypewriterCard />
          <CursorProtocolCard />
        </div>
      </div>
    </section>
  );
}

// Card 1: Diagnostic Shuffler (Waste Elimination)
function DiagnosticShufflerCard() {
  const [cards, setCards] = useState([
    { id: 1, text: "Reports Nobody Reads" },
    { id: 2, text: "Redundant Data" },
    { id: 3, text: "Outdated Procedures" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-surface border border-muted rounded-3xl p-8 flex flex-col gap-8 h-[400px] shadow-2xl relative overflow-hidden group">
      <div>
        <h4 className="font-sans font-bold text-xl mb-2 flex items-center gap-3">
          <X className="text-red-400" size={20} /> Eliminate Waste
        </h4>
        <p className="text-text/60 text-sm">We question every process. If it doesn't add value, it's gone. Everything must justify itself.</p>
      </div>

      <div className="flex-1 relative flex items-center justify-center w-full">
        {cards.map((card, index) => {
          const isTop = index === 0;
          return (
            <div
              key={card.id}
              className="absolute w-full p-4 rounded-xl border border-muted/50 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-between"
              style={{
                backgroundColor: isTop ? '#2A2A35' : '#1A1A24',
                zIndex: cards.length - index,
                transform: `translateY(${index * 15}px) scale(${1 - index * 0.05})`,
                opacity: 1 - index * 0.2,
                boxShadow: isTop ? '0 10px 30px -10px rgba(0,0,0,0.5)' : 'none'
              }}
            >
              <span className="font-mono text-sm text-text/90 line-through decoration-red-500/50">{card.text}</span>
              <span className="text-xs text-red-400 font-mono">[DEL]</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Card 2: Telemetry Typewriter (Structuring)
function TelemetryTypewriterCard() {
  const [text, setText] = useState("");
  const fullText = "> Sourcing operations...\n> Standardizing pipelines...\n> Syncing CRM data...\n> Systems transparent.\n> Operations structured.";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(typing);
    }, 50);
    return () => clearInterval(typing);
  }, []);

  return (
    <div className="bg-surface border border-muted rounded-3xl p-8 flex flex-col gap-8 h-[400px] shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-sans font-bold text-xl mb-2 flex items-center gap-2">
            <Layers className="text-accent" size={20} /> Simplify & Structure
          </h4>
          <p className="text-text/60 text-sm">We build clear workflows and document everything. No more processes that live in people's heads.</p>
        </div>
        <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full border border-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-text/50 uppercase tracking-widest">Canopy Feed</span>
        </div>
      </div>

      <div className="flex-1 bg-[#09090D] rounded-xl p-4 border border-muted/30 font-mono text-sm text-text/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] whitespace-pre-line overflow-hidden">
        {text}
        <span className="inline-block w-2 h-4 bg-accent ml-1 translate-y-1 animate-pulse" />
      </div>
    </div>
  );
}

// Card 3: Cursor Protocol Scheduler (AI Automation)
function CursorProtocolCard() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const cursorRef = useRef(null);
  const cellRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set(cursorRef.current, { x: 50, y: 150, opacity: 0 })
        .to(cursorRef.current, { opacity: 1, duration: 0.3 })
        .to(cursorRef.current, { x: 120, y: 45, duration: 1, ease: "power2.inOut" })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(cellRef.current, { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 }, "-=0.1")
        .to(cursorRef.current, { x: 220, y: 120, duration: 0.8, ease: "power2.inOut", delay: 0.5 })
        .to(cursorRef.current, { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
        .to(cursorRef.current, { opacity: 0, duration: 0.3, delay: 0.5 })
        .to(cellRef.current, { backgroundColor: 'transparent', color: '#FAF8F5', duration: 0.2 }, "-=0.3");
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-surface border border-muted rounded-3xl p-8 flex flex-col gap-8 h-[400px] shadow-2xl relative overflow-hidden">
      <div>
        <h4 className="font-sans font-bold text-xl mb-2 flex items-center gap-2">
          <Bot className="text-blue-400" size={20} /> AI Automation (If Needed)
        </h4>
        <p className="text-text/60 text-sm">Only then do we consider if AI actually helps. Most companies don't need it.</p>
      </div>

      <div className="flex-1 relative flex flex-col justify-center items-center gap-6 mt-4">
        <div className="grid grid-cols-7 gap-2 w-full">
          {days.map((day, i) => (
            <div
              key={i}
              ref={i === 3 ? cellRef : null}
              className="aspect-square rounded-lg border border-muted flex items-center justify-center font-mono text-xs transition-colors"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="w-full h-10 border border-muted rounded-lg flex items-center justify-center bg-background text-xs font-mono text-text/50">
          [ DEPLOY MONKEY ]
        </div>

        {/* Fake Cursor SVG */}
        <svg
          ref={cursorRef}
          className="absolute z-20 w-6 h-6 drop-shadow-lg text-text pointer-events-none"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="black"
          strokeWidth="1.5"
        >
          <path d="M4 2l6.5 20 2.5-7.5L20 12z" />
        </svg>
      </div>
    </div>
  );
}

function PhilosophySection() {
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const cardsRef = useRef(null);

  const beliefs = [
    {
      num: "01",
      title: "Question Everything",
      desc: "We don't assume you need AI. You probably need organization first."
    },
    {
      num: "02",
      title: "Process Over Tech",
      desc: "Most of your problems aren't tech problems. They're process problems."
    },
    {
      num: "03",
      title: "Humans Decide",
      desc: "Humans make the decisions. Monkeys handle the repetition."
    },
    {
      num: "04",
      title: "Earn Your Place",
      desc: "If it doesn't add value, cut it. Every process, tool, and meeting must justify itself."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(introRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        scrollTrigger: { trigger: introRef.current, start: "top 75%" }
      });
      const cards = gsap.utils.toArray('.belief-card');
      gsap.fromTo(cards, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12,
        scrollTrigger: { trigger: cardsRef.current, start: "top 75%" }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={containerRef} className="w-full py-32 md:py-40 px-6 relative bg-background overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
          alt="Dark Ink Texture"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-16">
        {/* Intro */}
        <div ref={introRef} className="flex flex-col gap-6 max-w-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-muted/50 bg-surface/30 w-fit backdrop-blur-sm">
            <span className="text-base">🐒</span>
            <span className="font-mono text-xs text-accent uppercase tracking-widest font-semibold">What We Believe</span>
          </div>
          <h2 className="font-serif italic text-4xl md:text-6xl text-text leading-tight">Our Manifesto</h2>
          <p className="text-text/60 text-lg leading-relaxed">
            Most companies run on rules nobody questions anymore.
            We audit your operations, cut the waste, and build what actually works. Here's what we believe:
          </p>
        </div>

        {/* Belief Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {beliefs.map((b) => (
            <div key={b.title} className="belief-card bg-surface/50 backdrop-blur-sm border border-muted/50 rounded-2xl p-8 flex flex-col gap-6 hover:border-accent/40 transition-colors duration-300 group">
              <span className="font-mono text-4xl text-accent/20 group-hover:text-accent/40 transition-colors duration-300">
                {b.num}
              </span>
              <div className="flex flex-col gap-2">
                <h4 className="font-sans font-bold text-2xl text-text">{b.title}</h4>
                <p className="text-text/60 text-base leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProtocolSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    let mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      
      mm.add("(min-width: 768px)", () => {
        const cards = gsap.utils.toArray('.protocol-card');
        cards.forEach((card, i) => {
          if (i < cards.length - 1) {
            ScrollTrigger.create({
              trigger: card,
              start: "top top",
              endTrigger: ".protocol-container",
              end: "bottom bottom",
              pin: true,
              pinSpacing: false,
              id: `card-${i}`
            });

            gsap.to(card, {
              scale: 0.9,
              opacity: 0.3,
              filter: "blur(10px)",
              scrollTrigger: {
                trigger: cards[i + 1],
                start: "top bottom",
                end: "top top",
                scrub: true,
              }
            });
          } else {
            ScrollTrigger.create({
              trigger: card,
              start: "top top",
              endTrigger: ".protocol-container",
              end: "bottom bottom",
              pin: true,
              pinSpacing: false,
            });
          }
        });
      });

      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray('.protocol-card');
        cards.forEach((card) => {
          gsap.from(card, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
            }
          });
        });
      });

    }, containerRef);
    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  const protocols = [
    {
      step: "01",
      title: "Question Everything",
      desc: "We don't assume you need technology. We ask hard questions first. Useless reports, redundant workflows — if it doesn't serve the mission, it gets cut. Clarity before change.",
      graphic: <GeometricGraphic />
    },
    {
      step: "02",
      title: "Simplify & Accelerate",
      desc: "We clear the tangled branches, structure what remains into lean CRM/ERP systems, and sharpen cycle time — a faster path through the jungle.",
      graphic: <LaserScanGraphic />
    },
    {
      step: "03",
      title: "Deploy the Monkeys",
      desc: "Once the jungle is clear, the monkeys scale it. AI chatbots, workflow automations, and data syncs — so you focus on decisions, they do the swinging.",
      graphic: <AIBotGraphic />
    }
  ];

  return (
    <section id="protocol" className="w-full bg-[#050508] protocol-container md:pb-[100vh] py-20 md:py-0" ref={containerRef}>
      {protocols.map((p, i) => (
        <div key={i} className="protocol-card w-full md:h-[100dvh] md:sticky top-0 flex items-center justify-center p-4 md:p-8 will-change-transform mb-8 md:mb-0">
          <div className="w-full max-w-5xl min-h-[500px] md:h-full md:max-h-[680px] bg-surface border border-muted rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row shadow-2xl">

            {/* Content Side */}
            <div className="flex-1 p-8 md:p-14 flex flex-col justify-center gap-6 relative z-10">
              <span className="font-mono text-accent text-base">[{p.step}]</span>
              <h2 className="font-sans font-bold text-3xl md:text-5xl text-text tracking-tight">{p.title}</h2>
              <p className="text-text/60 text-base md:text-lg max-w-md leading-relaxed">{p.desc}</p>
            </div>

            {/* Graphic Side */}
            <div className="flex-1 border-t md:border-t-0 md:border-l border-muted bg-background/50 flex items-center justify-center relative overflow-hidden">
              {p.graphic}
            </div>

          </div>
        </div>
      ))}
    </section>
  );
}

// Protocol SVGs
function GeometricGraphic() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });
      // Scanner sweep
      tl.to('.scanner', { rotation: 360, duration: 4, ease: "linear", transformOrigin: "50% 50%" }, 0);
      // Bad node gets caught
      tl.to('.bad-node', { fill: '#E63B2E', duration: 0.3 }, 1.5)
        .to('.bad-node', { scale: 1.5, duration: 0.2, yoyo: true, repeat: 3 }, 1.5)
        .to('.bad-node', { scale: 0, opacity: 0, duration: 0.5, ease: "back.in(1.7)" }, 2.5)
        .to('.bad-node', { scale: 1, opacity: 1, fill: '#2A2A35', duration: 0.5 }, 3.5);
    }, containerRef);
    return () => ctx.revert();
  }, []);
  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden">
      <svg className="w-64 h-64" viewBox="0 0 200 200">
        {/* Connection Lines */}
        <line x1="100" y1="100" x2="50" y2="40" stroke="#2A2A35" strokeWidth="2" />
        <line x1="100" y1="100" x2="160" y2="60" stroke="#2A2A35" strokeWidth="2" />
        <line x1="100" y1="100" x2="150" y2="150" stroke="#2A2A35" strokeWidth="2" />
        <line x1="100" y1="100" x2="40" y2="140" stroke="#2A2A35" strokeWidth="2" strokeDasharray="4 4" className="bad-link" />

        {/* Good Nodes */}
        <circle cx="100" cy="100" r="12" fill="#FAF8F5" />
        <circle cx="50" cy="40" r="8" fill="#C9A84C" />
        <circle cx="160" cy="60" r="10" fill="#C9A84C" />
        <circle cx="150" cy="150" r="8" fill="#C9A84C" />

        {/* The Bad Node */}
        <circle cx="40" cy="140" r="14" fill="#2A2A35" className="bad-node" style={{ transformOrigin: "40px 140px" }} />

        {/* Scanner */}
        <g className="scanner">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="2 6" opacity="0.3" />
          <path d="M100 100 L100 20 A80 80 0 0 1 180 100 Z" fill="url(#scanGrad)" opacity="0.4" />
        </g>
        <defs>
          <radialGradient id="scanGrad">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

function LaserScanGraphic() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = gsap.utils.toArray('.chaotic-block');

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

      // Starting positions (scattered)
      blocks.forEach((block) => {
        gsap.set(block, {
          x: (Math.random() - 0.5) * 150,
          y: (Math.random() - 0.5) * 150,
          rotation: Math.random() * 90 - 45,
          scaleX: 1,
          opacity: 1,
          backgroundColor: '#1A1A24'
        });
      });

      // Structure phase
      tl.to(blocks, {
        y: 0,
        x: (i) => i * 30 - 60,
        rotation: 0,
        backgroundColor: '#C9A84C',
        duration: 1.5,
        ease: "power3.inOut",
        stagger: 0.1
      })
        // Accelerate phase
        .to(blocks, {
          x: '+=300',
          scaleX: 3,
          opacity: 0,
          duration: 0.6,
          ease: "power2.in",
          stagger: 0.05
        }, "+=0.5");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden">
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Target structured zone indicator */}
        <div className="absolute w-[160px] h-[30px] border border-dashed border-muted/40 rounded-sm" />

        {/* Chaotic Blocks */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="chaotic-block absolute w-6 h-6 rounded-sm border border-muted"
          />
        ))}
      </div>
    </div>
  );
}

function AIBotGraphic() {
  const containerRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      // Central AI Node hovering
      gsap.to('.ai-brain', { y: -5, duration: 1.5, yoyo: true, repeat: -1, ease: "sine.inOut" });

      // Ingesting chaotic data
      tl.fromTo('.chaotic-input',
        { x: 10, y: () => 70 + Math.random() * 60, scale: 0, opacity: 0 },
        { x: 94, y: 94, scale: 1, opacity: 1, duration: 0.4, ease: "power2.inOut", stagger: 0.1 }
      )
        .to('.chaotic-input', { scale: 0, opacity: 0, duration: 0.2 }, "+=0.1")

        // Processing Flash
        .to('.ai-brain-core', { fill: '#FAF8F5', duration: 0.1, yoyo: true, repeat: 1 })

        // Routing perfectly structured output
        .fromTo('.structured-output',
          { x: 100, y: 96, scale: 0, opacity: 0 },
          { x: 160, y: (i) => 46 + (i * 50), scale: 1, opacity: 1, duration: 0.3, ease: "power3.out", stagger: 0.05 }
        )
        .to('.structured-output', { x: "+=30", opacity: 0, duration: 0.3, delay: 0.5 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[300px] flex items-center justify-center overflow-hidden">
      <svg className="w-full h-full max-w-[300px]" viewBox="0 0 200 200">

        {/* Background Grid/Lines */}
        <path d="M 0 100 Q 50 100 80 100" stroke="#2A2A35" strokeWidth="2" strokeDasharray="4 4" fill="none" />
        <path d="M 120 100 L 170 50 M 120 100 L 170 100 M 120 100 L 170 150" stroke="#2A2A35" strokeWidth="2" fill="none" />

        {/* Input Blocks (Chaotic) */}
        {[...Array(3)].map((_, i) => (
          <rect key={`in-${i}`} className="chaotic-input" x="0" y="0" width="12" height="12" rx="2" fill="#2A2A35" stroke="#FAF8F5" strokeWidth="1" />
        ))}

        {/* Output Blocks (Structured) */}
        {[...Array(3)].map((_, i) => (
          <rect key={`out-${i}`} className="structured-output" x="0" y="0" width="20" height="8" rx="4" fill="#C9A84C" />
        ))}

        {/* Central AI Node */}
        <g className="ai-brain" style={{ transformOrigin: "100px 100px" }}>
          {/* Outer glow */}
          <circle cx="100" cy="100" r="28" fill="#1A1A24" stroke="#2A2A35" strokeWidth="2" />
          <circle cx="100" cy="100" r="22" fill="#0D0D12" />
          {/* Inner core */}
          <circle cx="100" cy="100" r="12" fill="#C9A84C" className="ai-brain-core" />
          <path d="M96 98 L104 98 M100 94 L100 102" stroke="#0D0D12" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}

// ----------------------------------------------------------------------
// ABOUT SECTION
// ----------------------------------------------------------------------

function AboutSection() {
  const sectionRef = useRef(null);
  const quoteRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal for quote lines
      const lines = gsap.utils.toArray('.about-line');
      gsap.fromTo(lines,
        { opacity: 0, y: 25 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
          scrollTrigger: { trigger: quoteRef.current, start: 'top 75%' }
        }
      );

      // Image parallax float
      gsap.fromTo(imageRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: imageRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full py-32 md:py-40 px-6 md:px-12 bg-background relative z-10 overflow-hidden">
      {/* Ambient jungle glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(34,120,60,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Left — Image */}
        <div ref={imageRef} className="relative flex-shrink-0">
          <div className="relative w-[280px] h-[340px] md:w-[320px] md:h-[400px] rounded-[2.5rem] overflow-hidden border-2 border-muted/50 shadow-2xl">
            <img
              src="/omar-jungle.jpg"
              alt="The one we follow"
              className="w-full h-full object-cover object-top"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </div>
          {/* Floating label */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-surface border border-muted/60 rounded-full px-5 py-2 flex items-center gap-2 shadow-xl">
            <span className="text-base">🐒</span>
            <span className="font-mono text-[11px] text-accent uppercase tracking-widest">Field Report</span>
          </div>
        </div>

        {/* Right — Monkey-narrated quote */}
        <div ref={quoteRef} className="flex flex-col gap-6 max-w-xl">
          <h3 className="font-sans text-accent font-semibold tracking-wide uppercase text-sm about-line">🌿 About the Human</h3>

          <div className="flex flex-col gap-4">
            <p className="font-serif italic text-2xl md:text-3xl text-text/80 leading-relaxed about-line">
              We found him observing.
            </p>
            <p className="font-serif italic text-xl md:text-2xl text-text/50 leading-relaxed about-line">
              While others build complexity…<br />
              <span className="text-text/70">he removes it.</span>
            </p>
            <p className="font-serif italic text-xl md:text-2xl text-text/50 leading-relaxed about-line">
              And things start working again.
            </p>
            <p className="font-serif italic text-2xl md:text-3xl text-accent leading-relaxed about-line">
              That's why we follow him.
            </p>
          </div>

          {/* LinkedIn CTA */}
          <div className="flex flex-col gap-3 mt-4 about-line">
            <p className="font-mono text-sm text-text/40 tracking-wide">See how he thinks:</p>
            <a
              href="https://www.linkedin.com/in/omar-abou-el-ouafa-el-idrissi-0b0974237/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-[#0A66C2]/15 border border-[#0A66C2]/30 text-[#0A66C2] hover:bg-[#0A66C2]/25 hover:border-[#0A66C2]/50 px-6 py-3 rounded-full font-sans font-semibold text-sm transition-all duration-300 w-fit hover:-translate-y-0.5 shadow-lg hover:shadow-[#0A66C2]/20"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </a>
          </div>

          {/* Signature */}
          <div className="flex items-center gap-3 pt-4 border-t border-muted/30 about-line">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-xs text-text/30 italic">— Transmitted from the canopy, by the monkeys.</span>
          </div>
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------------------------
// TOOLS SECTION
// ----------------------------------------------------------------------

function ToolsSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 80%' }
        }
      );
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: cardRef.current, start: 'top 80%' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="tools" ref={sectionRef} className="w-full py-32 px-6 md:px-12 bg-[#050508] relative z-10 overflow-hidden">
      {/* Ambient orb */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto flex flex-col gap-14">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col gap-4 max-w-2xl">
          <h3 className="font-sans text-accent font-semibold tracking-wide uppercase text-sm flex items-center gap-2">
            🍌 Example Utilities
          </h3>
          <h2 className="font-serif italic text-4xl md:text-5xl text-text leading-tight">
            Built by humans. <span className="text-accent">Run by AI.</span>
          </h2>
          <p className="text-text/50 text-base max-w-xl leading-relaxed">
            We don't sell off-the-shelf software. We build utilities tailored to what you actually need. MonkeyFill is an example — a tool we created because a client needed it. Here's what we can build:
          </p>
        </div>

        {/* Portfolio Grid */}
        <div ref={cardRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* MonkeyFill — Live */}
          <MonkeyFillCard />

          {/* Coming Soon Utilities */}
          {[
            { 
              name: 'Silverback ERP', 
              desc: 'A lightweight, intelligent ERP that lives inside your Google Sheets. No bloated software, just smart, connected data that scales with your troop.', 
              icon: <img src="/silverback.png" alt="Silverback" className="w-8 h-8 object-contain opacity-80" /> 
            },
            { 
              name: 'CRM Auto-Sync', 
              desc: 'Automatic data sync between your CRM, spreadsheets, and pipelines. No manual entry.', 
              icon: <span className="text-2xl">🔄</span> 
            },
          ].map((tool) => (
            <div key={tool.name} className="bg-surface border border-muted/50 rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden hover:border-muted/70 transition-colors duration-300">
              <div className="flex items-center justify-between">
                <div>{tool.icon}</div>
                <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-muted/20 text-text/30 border border-muted/30">Coming Soon</span>
              </div>
              <h4 className="font-sans font-bold text-lg text-text">{tool.name}</h4>
              <p className="text-text/45 text-sm leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* More coming label */}
        <p className="text-text/25 text-sm font-mono text-center">More utilities in development — each one built for a specific client need.</p>

      </div>
    </section>
  );
}

function MonkeyFillCard() {
  return (
    <div className="bg-surface border border-accent/30 rounded-2xl p-8 flex flex-col gap-5 relative overflow-hidden hover:border-accent/50 transition-colors duration-300">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-xl">
            🐒
          </div>
          <div>
            <h4 className="font-sans font-bold text-lg text-text">MonkeyFill</h4>
            <p className="text-text/35 text-xs font-mono">Chrome Extension</p>
          </div>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-accent/20 text-accent border border-accent/30">Live</span>
      </div>

      <p className="text-text/55 text-sm leading-relaxed">
        Reads any job posting and rebuilds your CV to match — tailored, sharp, and recruiter-ready in seconds. Built because a client needed it.
      </p>

      <div className="flex flex-wrap gap-2">
        {['CV Matching', 'PDF Export', 'Privacy-first', 'Free Beta'].map((tag) => (
          <span key={tag} className="text-[11px] font-mono text-text/35 border border-muted/40 rounded-full px-3 py-1">{tag}</span>
        ))}
      </div>

      <a
        href="https://github.com/HAM-IT/MonkeyFill-Extention/releases/latest"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 text-accent text-sm font-sans font-semibold hover:text-accent/80 transition-colors w-fit mt-1"
      >
        Try it free <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
      </a>
    </div>
  );
}


function GetStartedSection() {
  return (
    <section className="w-full py-40 px-6 bg-background relative z-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl flex flex-col items-center gap-8">
        <h2 className="font-sans font-bold text-5xl md:text-7xl text-text tracking-tight">Ready to question everything?</h2>
        <p className="font-serif italic text-2xl text-text/60">Start with the hard work. The results follow.</p>

        <AliveBookingButton href="https://calendar.app.google/5VyFxPm4kGYtdeng9" />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="w-full bg-[#050508] pt-24 pb-12 px-6 md:px-12 rounded-t-[4rem] border-t border-muted relative z-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-sans font-bold text-3xl tracking-tight text-text">Habomic</span>
            <span className="font-mono text-[10px] text-text/30 mt-1 uppercase tracking-wider" title="Hire A Bunch Of Monkeys Its Cheaper">
              *Hire A Bunch Of Monkeys Its Cheaper
            </span>
          </div>
          <p className="text-text/50 max-w-xs text-sm">We remove the chaos from your business, then let AI run what's left.</p>
          <div className="flex flex-col gap-1 mt-2 text-sm text-text/60">
            <a href="mailto:Apollo.303@outlook.com" className="hover:text-accent transition-colors">Apollo.303@outlook.com</a>
            <a href="mailto:omarabouelouafa303@gmail.com" className="hover:text-accent transition-colors">omarabouelouafa303@gmail.com</a>
          </div>

          <div className="flex items-center gap-3 mt-4 border border-muted/50 w-fit px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
            <span className="font-mono text-xs text-text/60">Troop Core Online</span>
          </div>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-text/40 uppercase tracking-widest">Navigation</span>
            {['Process', 'Manifesto', 'Tools', 'About', 'Protocol'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm text-text/70 hover:text-accent transition-colors">{link}</a>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-text/40 uppercase tracking-widest">Legal</span>
            {['Privacy', 'Terms', 'Connect'].map((link) => (
              <a key={link} href="#" className="text-sm text-text/70 hover:text-accent transition-colors">{link}</a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 max-w-6xl mx-auto pt-8 border-t border-muted/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-text/30 text-xs">© {new Date().getFullYear()} Habomic. All rights reserved.</span>
        <span className="text-text/30 text-xs font-mono">🍌 BUILT BY MONKEYS</span>
      </div>
    </footer>
  );
}

// Reusable Magnetic Button Component
function MagneticButton({ children, className, href, ...props }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        scale: 1.03,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      });
    };

    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);


  const Component = href ? 'a' : 'button';

  return (
    <Component ref={buttonRef} href={href} className={cn("will-change-transform", className, href && "inline-block")} {...props}>
      {children}
    </Component>
  );
}

// Escaping Button Component
function AliveBookingButton({ href }) {
  const buttonRef = useRef(null);
  const pinRef = useRef(null);
  const quoteRef = useRef(null);
  const [escapeCount, setEscapeCount] = useState(0);
  const timeoutRef = useRef(null);

  const quotes = [
    "The monkey escaped the cage. We're working on it.",
    "*Sigh*... I told them not to give the monkey a button.",
    "It thinks dodging is more efficient than clicking. Classic monkey.",
    "We automate processes, but this monkey automates chaos.",
    "The monkey determined that evasion is the optimal workflow.",
    "Manual override required. The monkey went rogue. 🍌"
  ];
  const [activeQuote, setActiveQuote] = useState(quotes[0]);

  const resetState = () => {
    setEscapeCount(0);
    gsap.to(buttonRef.current, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.6, ease: "elastic.out(1, 0.4)" });
    gsap.to(pinRef.current, { y: -50, opacity: 0, scale: 0, duration: 0.3 });
    gsap.to(quoteRef.current, { opacity: 0, y: -10, duration: 0.3 });
  };

  const getRandomQuote = (current) => {
    let next;
    do {
      next = quotes[Math.floor(Math.random() * quotes.length)];
    } while (next === current);
    return next;
  };

  const handleEvade = (e) => {
    // If it's a touch event, optionally prevent the default click so they actually have to chase it
    if (e.type === 'touchstart' && escapeCount < 2) {
      e.preventDefault();
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (escapeCount < 2) {
      // Calculate dynamic boundaries so the button stays fully within the screen on mobile devices
      const safeX = Math.min(250, (window.innerWidth / 2) - 100);
      const safeY = Math.min(125, (window.innerHeight / 2) - 50);

      const randomX = (Math.random() - 0.5) * (safeX * 2); 
      const randomY = (Math.random() - 0.5) * (safeY * 2); 
      const randomRot = (Math.random() - 0.5) * 60;
      
      gsap.to(buttonRef.current, { 
        x: randomX, 
        y: randomY, 
        rotation: randomRot,
        scale: 0.9,
        duration: 0.35, 
        ease: "power2.out",
        overwrite: "auto"
      });
      
      setEscapeCount(prev => prev + 1);
    } else if (escapeCount === 2) {
      // 3rd hover - give up and get pinned
      setEscapeCount(3);
      
      // Snap to center
      gsap.to(buttonRef.current, { 
        x: 0, 
        y: 0, 
        rotation: 0,
        scale: 1,
        duration: 0.5, 
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto"
      });
      
      // Smash the literal emoji pin down exactly into it
      gsap.fromTo(pinRef.current, 
        { y: -150, opacity: 0, scale: 2 },
        { y: -25, opacity: 1, scale: 1, duration: 0.6, delay: 0.25, ease: "bounce.out", overwrite: "auto" }
      );

      // Reveal the funny quote
      setActiveQuote(prev => getRandomQuote(prev));
      gsap.fromTo(quoteRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.6, ease: "power2.out", overwrite: "auto" }
      );
    } else if (escapeCount >= 3) {
      // If they keep hovering while it's pinned, shuffle the quote to keep it interesting
      setActiveQuote(prev => getRandomQuote(prev));
      gsap.fromTo(quoteRef.current,
        { y: -5, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" }
      );
    }
    
    // Automatic timeout back to 0 if they don't click it (increased to give time to read the quote)
    timeoutRef.current = setTimeout(resetState, 9000);
  };

  const handleClick = (e) => {
    if (escapeCount < 3) {
      // Prevent click if they somehow snipe it while it's evading
      e.preventDefault(); 
    }
  };

  return (
    <div className="relative inline-block mt-8 z-50">
      {/* The Red Pushpin Emoji animated drop */}
      <div ref={pinRef} className="absolute left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0 text-5xl drop-shadow-xl" style={{ textShadow: "0px 10px 15px rgba(0,0,0,0.6)" }}>
        📍
      </div>

      <a 
        ref={buttonRef}
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        onClick={handleClick}
        onMouseEnter={handleEvade}
        onTouchStart={handleEvade}
        className={cn(
          "bg-text text-background px-10 py-5 rounded-full font-sans font-bold text-xl flex items-center gap-3 transition-colors relative z-10 shadow-2xl block",
          escapeCount >= 3 ? "hover:bg-text/90 cursor-pointer" : "cursor-default drop-shadow-[0_0_15px_rgba(250,248,245,0.4)]"
        )}
      >
        Book Your Audit <ArrowUpRight size={24} />
      </a>

      {/* Funny Quote Reveal */}
      <div ref={quoteRef} className="absolute top-[130%] w-max left-1/2 -translate-x-1/2 opacity-0 text-text/40 text-sm font-mono italic pointer-events-none">
        {activeQuote}
      </div>
    </div>
  );
}

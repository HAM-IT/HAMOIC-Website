import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, ArrowRight, ArrowUpRight, CheckCircle2, Bot, Layers, CheckSquare } from 'lucide-react';
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
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={navRef}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 ease-in-out py-3 px-6 rounded-full flex items-center justify-between w-[90%] max-w-5xl",
        scrolled
          ? "bg-surface/60 backdrop-blur-xl border border-muted shadow-2xl"
          : "bg-transparent border border-transparent"
      )}
    >
      <div className="flex items-center gap-2">
        <img src="/logo-monkey.png" alt="Company Logo" className="h-9 md:h-10 w-auto opacity-95 hover:opacity-100 hover:scale-[1.02] transition-all drop-shadow-lg" />
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {['Process', 'Manifesto', 'Protocol'].map((link) => (
          <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-text/70 hover:text-text transition-colors hover:-translate-y-px duration-300">
            {link}
          </a>
        ))}
      </nav>

      <MagneticButton href="https://calendar.app.google/5VyFxPm4kGYtdeng9" target="_blank" rel="noopener noreferrer" className="hidden md:flex bg-accent text-background border border-accent/20 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-accent/90">
        Book an Audit
      </MagneticButton>

      <button className="md:hidden text-text">
        <Menu size={24} />
      </button>
    </header>
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
    <section ref={heroRef} className="relative w-full h-[100dvh] flex flex-col justify-end p-6 md:p-16 lg:p-24 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-nascar-final.png"
          alt="NASCAR Pit Crew inside Corporate Office Metaphor"
          className="w-full h-full object-cover object-center"
        />
        {/* Adjusted gradient: clear at the top, fading to dark at the bottom for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent h-1/2 mt-auto" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-start gap-6 pb-12">
        {/* Soft, targeted fog behind text to ensure crisp readability against the high-quality image */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/80 to-transparent blur-3xl -m-16 rounded-[4rem] opacity-90 pointer-events-none" />

        <div className="flex flex-col gap-2 relative z-10">
          <h1 ref={title1Ref} className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-text tracking-tight drop-shadow-md">
            Business chaos meets
          </h1>
          <h2 ref={title2Ref} className="font-serif italic text-6xl md:text-8xl lg:text-[9rem] text-accent leading-[0.85] tracking-tight pr-4 drop-shadow-lg">
            Surgical precision.
          </h2>
        </div>

        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mt-8">
          <MagneticButton href="https://calendar.app.google/5VyFxPm4kGYtdeng9" target="_blank" rel="noopener noreferrer" className="bg-accent text-background px-8 py-4 rounded-full font-sans font-semibold text-lg flex items-center justify-center gap-2 group overflow-hidden relative">
            <span className="relative z-10 flex items-center gap-2">
              Book an Audit <ArrowRight size={20} className="group-hover:translate-x-1 duration-300" />
            </span>
          </MagneticButton>
          <div className="px-6 py-4 flex items-center justify-center gap-3 border border-muted rounded-full bg-surface/30 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-mono text-sm text-text/80">Systems Operational</span>
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
          <h3 className="font-sans text-accent font-semibold tracking-wide uppercase text-sm">The Process</h3>
          <h2 className="font-serif italic text-4xl md:text-6xl text-text">Interactive Functional Artifacts</h2>
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
    { id: 1, text: "Useless Reports" },
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
        <p className="text-text/60 text-sm">We remove the chaos. Every process must justify its existence.</p>
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
          <p className="text-text/60 text-sm">Organizing operations and pipelines into transparent systems.</p>
        </div>
        <div className="flex items-center gap-2 bg-background px-3 py-1 rounded-full border border-muted">
          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] font-mono text-text/50 uppercase tracking-widest">Live Feed</span>
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
          <Bot className="text-blue-400" size={20} /> AI Automation
        </h4>
        <p className="text-text/60 text-sm">Humans focus on decisions — AI handles the repetitive work.</p>
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
          [ DEPLOY AGENT ]
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
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 30%",
          toggleActions: "play none none reverse"
        }
      });
      tl.fromTo(text1Ref.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .fromTo(text2Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.4");
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="manifesto" ref={containerRef} className="w-full py-40 px-6 relative bg-background flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop"
          alt="Dark Ink Texture"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col gap-12 text-center">
        <h3 ref={text1Ref} className="font-sans text-xl md:text-2xl text-text/60 max-w-2xl mx-auto leading-relaxed">
          Most companies run on rules nobody questions anymore, slowing down operations with unnecessary layers.
        </h3>
        <h2 ref={text2Ref} className="font-serif italic text-4xl md:text-7xl lg:text-8xl text-text leading-tight">
          We focus on <br /><span className="text-accent relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-accent/40">removing the chaos.</span>
        </h2>
      </div>
    </section>
  );
}

function ProtocolSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const protocols = [
    {
      step: "01",
      title: "Question Everything",
      desc: "Every process must justify its existence. We uncover useless reports and redundant workflows. Clarity before change.",
      graphic: <GeometricGraphic />
    },
    {
      step: "02",
      title: "Simplify & Accelerate",
      desc: "We clear the waste, structure what remains into simple CRM/ERP systems, and focus on cycle time to build a faster company.",
      graphic: <LaserScanGraphic />
    },
    {
      step: "03",
      title: "Automate with AI",
      desc: "Once the system is clean, machines scale it. Deploying AI chatbots, workflow automations, and data syncs so humans focus on decisions.",
      graphic: <AIBotGraphic />
    }
  ];

  return (
    <section id="protocol" className="w-full bg-[#050508] protocol-container pb-[100vh]" ref={containerRef}>
      {protocols.map((p, i) => (
        <div key={i} className="protocol-card w-full h-[100dvh] sticky top-0 flex items-center justify-center p-6 md:p-12 will-change-transform">
          <div className="w-full max-w-6xl h-full max-h-[800px] bg-surface border border-muted rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row shadow-2xl">

            {/* Content Side */}
            <div className="flex-1 p-10 md:p-20 flex flex-col justify-center gap-8 relative z-10">
              <span className="font-mono text-accent text-lg">[{p.step}]</span>
              <h2 className="font-sans font-bold text-4xl md:text-6xl text-text tracking-tight">{p.title}</h2>
              <p className="text-text/60 text-lg md:text-xl max-w-md leading-relaxed">{p.desc}</p>
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

function GetStartedSection() {
  return (
    <section className="w-full py-40 px-6 bg-background relative z-20 flex flex-col items-center justify-center text-center">
      <div className="max-w-3xl flex flex-col items-center gap-8">
        <h2 className="font-sans font-bold text-5xl md:text-7xl text-text tracking-tight">Ready to scale?</h2>
        <p className="font-serif italic text-2xl text-text/60">A smarter company that grows without chaos.</p>

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
          <span className="font-sans font-bold text-3xl tracking-tight text-text">Habomic</span>
          <p className="text-text/50 max-w-xs text-sm">We remove the chaos from your business, then let AI run what's left.</p>
          <div className="flex flex-col gap-1 mt-2 text-sm text-text/60">
            <a href="mailto:Apollo.303@outlook.com" className="hover:text-accent transition-colors">Apollo.303@outlook.com</a>
            <a href="mailto:omarabouelouafa303@gmail.com" className="hover:text-accent transition-colors">omarabouelouafa303@gmail.com</a>
          </div>

          <div className="flex items-center gap-3 mt-4 border border-muted/50 w-fit px-4 py-2 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-[pulse_2s_infinite]" />
            <span className="font-mono text-xs text-text/60">System Core Online</span>
          </div>
        </div>

        <div className="flex gap-16">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs text-text/40 uppercase tracking-widest">Navigation</span>
            {['Process', 'Manifesto', 'Protocol'].map((link) => (
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
        <span className="text-text/30 text-xs font-mono">1:1 PIXEL PERFECT</span>
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
    "Sorry, the button is gaining consciousness.",
    "*Sigh*... I told them to stop putting AI in the buttons.",
    "It thinks it's optimizing your cursor trajectory. Just click it.",
    "We automate processes, but clearly not this button.",
    "The AI determined that evasion is the most efficient workflow.",
    "Manual override required. The button went rogue."
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

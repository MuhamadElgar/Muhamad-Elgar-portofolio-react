import { useState, useRef, useEffect } from 'react';
import InstagramGallery from './InstagramGallery';
import dataDiri from './data';

import profilePic from './assets/profile/profile.png';
import resumeId from './assets/resume/Resume Muhamad Elgar id.pdf';
import resumeEn from './assets/resume/Resume Muhamad Elgar en.pdf';

// ---- Konstanta font (dipakai di seluruh komponen, statis) ----
const fontDisplay = { fontFamily: "'Space Grotesk', sans-serif" };
const fontMono = { fontFamily: "'JetBrains Mono', monospace" };
const fontBody = { fontFamily: "'Inter', sans-serif" };

// ---- Reveal: wrapper animasi masuk (fade + slide up) saat elemen masuk viewport ----
function Reveal({ children, className = '', delay = 0, as: Tag = 'div', style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`egr-reveal ${visible ? 'egr-reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}

// ---- Section eyebrow dengan garis aksen kecil (motif berulang di seluruh halaman) ----
function Eyebrow({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-7 h-[2px] rounded-full shrink-0" style={{ backgroundColor: 'var(--accent)' }}></span>
      <span className="text-[11px] tracking-[0.22em] uppercase font-medium" style={{ color: 'var(--accent)', ...fontMono }}>
        {children}
      </span>
    </div>
  );
}

// ---- Ikon logo sosial media (dipakai di Channels & Footer, tanpa bungkus "card") ----
function IconGitHub(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.16.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.63 1.6.23 2.77.11 3.06.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.69.42.36.78 1.08.78 2.17 0 1.57-.01 2.83-.01 3.22 0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function IconLinkedIn(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

function IconInstagram(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconYouTube(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.5 6.7a3 3 0 0 0-2.11-2.13C19.47 4 12 4 12 4s-7.47 0-9.39.57A3 3 0 0 0 .5 6.7 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.3 3 3 0 0 0 2.11 2.13C4.53 20 12 20 12 20s7.47 0 9.39-.57a3 3 0 0 0 2.11-2.13A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.3ZM9.6 15.5v-7l6.4 3.5-6.4 3.5Z" />
    </svg>
  );
}

// ---- Timeline: dipakai di Education, Organization, Experience (konten memang kronologis) ----
// Garis vertikal dibuat sebagai elemen absolute tersendiri agar selalu lurus, tidak tergantung tinggi tiap item.
function Timeline({ items, mainKey, subKey, yearKey, descKey }) {
  return (
    <div className="relative">
      <div className="absolute top-1 bottom-1 w-[2px]" style={{ left: '7px', backgroundColor: 'var(--border)' }}></div>
      <div className="space-y-7">
        {items.map((item, i) => (
          <Reveal key={item.id || i} delay={i * 70}>
            <div className="relative pl-9">
              <span
                className="absolute top-1.5 w-4 h-4 rounded-full border-2 z-10"
                style={{ left: '0px', backgroundColor: 'var(--card)', borderColor: 'var(--accent)' }}
              ></span>
              <div
                className="p-5 md:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[0_14px_34px_-16px_var(--shadow-accent)]"
                style={{ backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}
              >
                <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold" style={{ color: 'var(--text)', ...fontDisplay }}>{item[mainKey]}</h3>
                    {subKey && <p className="text-xs mt-0.5" style={{ color: 'var(--accent)', ...fontMono }}>{item[subKey]}</p>}
                  </div>
                  {yearKey && (
                    <span
                      className="text-[11px] px-3 py-1 rounded-md shrink-0"
                      style={{ color: 'var(--text-muted)', border: `1px solid var(--border)`, ...fontMono }}
                    >
                      {item.year || item.time}
                    </span>
                  )}
                </div>
                {descKey && (
                  <p className="text-xs md:text-sm leading-relaxed mt-2" style={{ color: 'var(--text-muted)', ...fontBody }}>
                    {item[descKey] || item.desc}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const dropdownRef = useRef(null);

  // Muat font dari Google Fonts + inject CSS global kecil (animasi reveal, mask foto desktop, reduced-motion)
  useEffect(() => {
    const fontId = 'egr-portfolio-fonts';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap';
      document.head.appendChild(link);
    }

    const styleId = 'egr-portfolio-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        .egr-reveal { opacity: 0; transform: translateY(26px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .egr-reveal-visible { opacity: 1; transform: translateY(0); }
        .egr-hero-photo { transition: filter 0.4s ease; }
        @media (prefers-reduced-motion: reduce) {
          .egr-reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsResumeOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const serviceIcons = [
    <svg key="1" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    <svg key="2" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    <svg key="3" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    <svg key="4" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 9a2 2 0 012-2h.93a2 2 0 011.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ];

  if (showGallery) {
    return <InstagramGallery onBack={() => setShowGallery(false)} />;
  }

  const profilePicUrl = profilePic;
  const resumeEnUrl = resumeEn;
  const resumeIdUrl = resumeId;

  const nameParts = dataDiri?.nama ? dataDiri.nama.split(' ') : ['Muhamad', 'Elgar'];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');
  const initials = `${(firstName || 'M')[0]}${(lastName || 'E')[0]}`.toUpperCase();

  // Menggabungkan atau mengambil data organisasi dengan fallback aman
  const organizationList = dataDiri?.organization || (dataDiri?.experience || []).filter(item =>
    item.role.toLowerCase().includes('anggota') || item.role.toLowerCase().includes('divisi')
  );

  const workExperienceList = dataDiri?.experience ? dataDiri.experience.filter(item =>
    !item.role.toLowerCase().includes('anggota') && !item.role.toLowerCase().includes('divisi')
  ) : [];

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Work' },
    { href: '#education', label: 'Education' },
    { href: '#organization', label: 'Organization' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
  ];

  // ---- Token warna (light: bone white + crimson/maroon accent | dark: charcoal + crimson accent) ----
  const theme = isDark
    ? {
        bg: '#121212',
        card: '#1A1A1A',
        text: '#F2F0EE',
        textMuted: '#9C9994',
        border: 'rgba(255,255,255,0.10)',
        navBg: 'rgba(18,18,18,0.72)',
        accent: '#DC143C',
        accentDeep: '#8C1030',
        accentSoft: 'rgba(220,20,60,0.14)',
        shadowAccent: 'rgba(220,20,60,0.28)',
      }
    : {
        bg: '#FAFAFA',
        card: '#FFFFFF',
        text: '#1F1F1F',
        textMuted: '#69655F',
        border: 'rgba(31,31,31,0.10)',
        navBg: 'rgba(250,250,250,0.75)',
        accent: '#DC143C',
        accentDeep: '#800020',
        accentSoft: 'rgba(220,20,60,0.07)',
        shadowAccent: 'rgba(128,0,32,0.16)',
      };

  const cssVars = {
    '--bg': theme.bg,
    '--card': theme.card,
    '--text': theme.text,
    '--text-muted': theme.textMuted,
    '--border': theme.border,
    '--nav-bg': theme.navBg,
    '--accent': theme.accent,
    '--accent-deep': theme.accentDeep,
    '--accent-soft': theme.accentSoft,
    '--shadow-accent': theme.shadowAccent,
  };

  return (
    <div
      className="min-h-screen antialiased scroll-smooth transition-colors duration-500"
      style={{ ...cssVars, backgroundColor: 'var(--bg)', color: 'var(--text)', ...fontBody }}
    >

      {/* NAVIGATION BAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl transition-colors duration-300"
        style={{ backgroundColor: 'var(--nav-bg)', borderBottom: `1px solid var(--border)` }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center gap-4">

          <a href="#about" className="flex items-center gap-3 group shrink-0">
            <div
              className="w-9 h-9 rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold transition-colors group-hover:bg-[var(--accent)] group-hover:text-white"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)', ...fontDisplay }}
            >
              {initials}
            </div>
            <span className="text-base font-semibold tracking-tight whitespace-nowrap" style={{ color: 'var(--text)', ...fontDisplay }}>
              {firstName} {lastName}
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-5 xl:gap-7 text-[13px] font-medium" style={{ color: 'var(--text-muted)', ...fontBody }}>
            {navLinks.map((n) => (
              <a key={n.href} href={n.href} className="relative group/link py-1 whitespace-nowrap">
                <span className="relative z-10 transition-colors group-hover/link:text-[var(--accent)]">{n.label}</span>
                <span
                  className="absolute left-0 -bottom-0.5 h-[1.5px] w-0 group-hover/link:w-full transition-all duration-300"
                  style={{ backgroundColor: 'var(--accent)' }}
                ></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
              style={{ color: 'var(--text-muted)' }}
            >
              {isDark ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.72 0l-.7.7M6.34 17.66l-.7.7M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            {/* Resume Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsResumeOpen(!isResumeOpen)}
                className="flex items-center gap-2 text-xs font-medium text-white pl-5 pr-4 py-2.5 rounded-full transition-all duration-300 active:scale-95 hover:-translate-y-0.5"
                style={{ backgroundColor: 'var(--accent)', ...fontMono }}
              >
                RESUME
                <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute right-0 mt-3 w-56 rounded-xl overflow-hidden transition-all duration-300 origin-top-right z-50 ${isResumeOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}
                style={{ backgroundColor: 'var(--card)', border: `1px solid var(--border)`, boxShadow: `0 20px 40px -20px var(--shadow-accent)` }}
              >
                <div className="flex flex-col p-1">
                  <a
                    href={resumeEnUrl}
                    target="_blank"
                    rel="noreferrer"
                    download="Resume Muhamad Elgar en.pdf"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    <span>🇬🇧</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>English Resume</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)', ...fontMono }}>Download CV (EN)</p>
                    </div>
                  </a>
                  <a
                    href={resumeIdUrl}
                    target="_blank"
                    rel="noreferrer"
                    download="Resume Muhamad Elgar id.pdf"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors hover:bg-[var(--accent-soft)]"
                  >
                    <span>🇮🇩</span>
                    <div>
                      <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>Resume Indonesia</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)', ...fontMono }}>Unduh CV (ID)</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* HERO SECTION / TENTANG SAYA */}
      <section id="about" className="pt-36 md:pt-44 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="flex flex-col gap-14 lg:grid lg:grid-cols-[1.15fr_0.85fr] lg:gap-x-14 lg:gap-y-0">

          {/* Foto: urutan pertama secara DOM (tampil di atas saat mobile), dipindah ke kanan & dibentangkan penuh saat desktop */}
          <div className="relative order-1 flex justify-center lg:justify-end lg:[grid-row:1] lg:[grid-column:2] lg:min-h-[560px]">
            {/* Cahaya ambient di belakang foto, seperti sorotan lembut dari bawah — beda intensitas per tema */}
            <div
              className="absolute inset-x-6 bottom-0 h-2/3 blur-[90px] pointer-events-none rounded-full transition-opacity duration-500"
              style={{ backgroundColor: 'var(--accent-deep)', opacity: isDark ? 0.5 : 0.22 }}
            ></div>

            <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-none h-80 sm:h-96 lg:h-full lg:w-full">
              <div
                className="relative w-full h-full rounded-2xl lg:rounded-b-none overflow-hidden border lg:border-0 bg-[var(--card)] lg:bg-transparent p-2 lg:p-0 shadow-[0_24px_50px_-24px_var(--shadow-accent)] lg:shadow-none transition-colors duration-500"
                style={{ borderColor: 'var(--border)' }}
              >
                <img
                  src={profilePicUrl}
                  alt={dataDiri?.nama || "Muhamad Elgar"}
                  className="egr-hero-photo w-full h-full object-cover object-top lg:object-bottom rounded-xl lg:rounded-2xl lg:rounded-b-none"
                  style={{
                    filter: isDark
                      ? 'brightness(1.08) contrast(1.1) saturate(1.05)'
                      : 'brightness(1.02) contrast(1.04)',
                  }}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Teks Informasi */}
          <Reveal className="order-2 flex flex-col justify-center max-w-2xl lg:[grid-row:1] lg:[grid-column:1]">
            <p className="mb-4 text-xs tracking-[0.25em] uppercase font-medium" style={{ color: 'var(--accent)', ...fontMono }}>
              Hi, my name is
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold leading-[1.08] mb-6" style={{ color: 'var(--text)', ...fontDisplay }}>
              {firstName} {lastName}
            </h1>

            <h2
              className="inline-block w-fit text-lg md:text-xl font-medium mb-7 pb-1.5"
              style={{ color: 'var(--text-muted)', borderBottom: `3px solid var(--accent-deep)` }}
            >
              Frontend Developer &amp; UI Designer
            </h2>

            <p className="text-base leading-relaxed mb-9" style={{ color: 'var(--text-muted)' }}>
              {dataDiri?.about}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#portfolio"
                className="text-sm font-semibold text-white px-7 py-3.5 rounded-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_var(--shadow-accent)]"
                style={{ backgroundColor: 'var(--accent)', ...fontMono }}
              >
                View My Work
              </a>
              <a
                href="#contact"
                className="text-sm font-semibold px-7 py-3.5 rounded-lg border-2 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-soft)]"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent)', ...fontMono }}
              >
                Let's Talk
              </a>
            </div>
          </Reveal>

          {/* CORE STACK & CONNECT CHANNELS — baris ke-2 grid, foto di atas menyentuh garis ini persis */}
          <Reveal
            className="order-3 pt-9 flex flex-col md:flex-row justify-between items-start md:items-center gap-7 lg:[grid-row:2] lg:[grid-column:1_/_span_2]"
            style={{ borderTop: `1px solid var(--border)` }}
            delay={120}
          >
            <div className="flex-1">
              <span className="block mb-3 text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--accent)', ...fontMono }}>
                Core Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {(dataDiri?.skills?.hard || []).map((s, i) => (
                  <div
                    key={i}
                    className="text-xs px-3.5 py-2 rounded-lg flex items-center gap-2 transition-colors hover:border-[var(--accent)]"
                    style={{ color: 'var(--text)', border: `1px solid var(--border)`, ...fontMono }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }}></span>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <span className="block mb-3 text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--accent)', ...fontMono }}>
                Channels
              </span>
              <div className="flex items-center gap-4">
                {dataDiri?.contact?.github && (
                  <a
                    href={dataDiri.contact.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <IconGitHub className="w-[22px] h-[22px]" />
                  </a>
                )}
                {dataDiri?.contact?.linkedin && (
                  <a
                    href={dataDiri.contact.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <IconLinkedIn className="w-[22px] h-[22px]" />
                  </a>
                )}
                {dataDiri?.contact?.instagram && (
                  <a
                    href={dataDiri.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <IconInstagram className="w-[22px] h-[22px]" />
                  </a>
                )}
                {dataDiri?.contact?.youtube1 && (
                  <a
                    href={dataDiri.contact.youtube1}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--accent)]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <IconYouTube className="w-[22px] h-[22px]" />
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ backgroundColor: 'var(--bg)', borderTop: `1px solid var(--border)` }}>
        <div className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Services</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(dataDiri?.services || []).map((service, i) => (
              <Reveal key={service.id || i} delay={i * 80}>
                <div
                  className="group relative h-full p-6 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_-16px_var(--shadow-accent)]"
                  style={{ backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}
                >
                  <span
                    className="absolute top-0 left-0 right-0 h-[3px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    style={{ backgroundColor: 'var(--accent)' }}
                  ></span>
                  <div
                    className="w-11 h-11 mb-4 rounded-xl flex items-center justify-center transition-colors group-hover:border-[var(--accent)]"
                    style={{ color: 'var(--accent)', border: `1px solid var(--border)` }}
                  >
                    {serviceIcons[i % serviceIcons.length]}
                  </div>
                  <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text)', ...fontDisplay }}>{service.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{service.description || service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO / WORK */}
      <section id="portfolio" style={{ backgroundColor: 'var(--card)', borderTop: `1px solid var(--border)` }}>
        <div className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <Reveal className="mb-10">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Projects</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(dataDiri?.projects || []).map((p, index) => (
              <Reveal key={p.project_id || p.id || index} delay={index * 90}>
                <div
                  className="group h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_var(--shadow-accent)]"
                  style={{ backgroundColor: 'var(--bg)', border: `1px solid var(--border)` }}
                >
                  {/* Banner Foto Proyek */}
                  <div className="w-full h-48 relative overflow-hidden" style={{ backgroundColor: 'var(--card)', borderBottom: `1px solid var(--border)` }}>
                    <img
                      src={p.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop";
                      }}
                    />
                    <span
                      className="absolute top-3 right-3 text-[10px] px-2.5 py-1 rounded-md backdrop-blur-md"
                      style={{
                        color: p.time === "Recent Project" ? 'var(--accent)' : 'var(--text-muted)',
                        backgroundColor: 'var(--nav-bg)',
                        border: `1px solid var(--border)`,
                        ...fontMono,
                      }}
                    >
                      {p.time}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 transition-colors group-hover:text-[var(--accent)]" style={{ color: 'var(--text)', ...fontDisplay }}>
                        {p.title}
                      </h3>
                      <p className="text-xs mb-4" style={{ color: 'var(--accent)', ...fontMono }}>{p.role}</p>
                      <p className="text-xs leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>{p.description || p.desc}</p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(p.tech || []).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2.5 py-1 rounded-md"
                            style={{ color: 'var(--text-muted)', border: `1px solid var(--border)`, ...fontMono }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {p.link === "#gallery" ? (
                        <button
                          onClick={() => setShowGallery(true)}
                          className="w-full text-white text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:opacity-90"
                          style={{ backgroundColor: 'var(--accent)', ...fontMono }}
                        >
                          Open Photo Gallery ↗
                        </button>
                      ) : p.link && p.link !== "#" ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-medium hover:bg-[var(--accent)] hover:text-white hover:border-[var(--accent)]"
                          style={{ color: 'var(--accent)', border: `1px solid var(--accent)`, ...fontMono }}
                        >
                          Open Repository ↗
                        </a>
                      ) : (
                        <span
                          className="w-full text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
                          style={{ color: 'var(--text-muted)', border: `1px dashed var(--border)`, ...fontMono }}
                        >
                          Private Repository 🔒
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION & SKILLS */}
      <section id="education" style={{ backgroundColor: 'var(--bg)', borderTop: `1px solid var(--border)` }}>
        <div className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

            {/* EDUCATION */}
            <div>
              <Reveal className="mb-7">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Education</h2>
              </Reveal>

              <Timeline items={dataDiri?.education || []} mainKey="institution" descKey="detail" yearKey="year" />

              <Reveal className="mt-9" delay={150}>
                <span className="block mb-3 text-[11px] tracking-[0.2em] uppercase font-medium" style={{ color: 'var(--accent)', ...fontMono }}>Interests</span>
                <div className="flex flex-wrap gap-2">
                  {(dataDiri?.hobbies || []).map((h, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1.5 rounded-lg"
                      style={{ color: 'var(--text)', backgroundColor: 'var(--card)', border: `1px solid var(--border)`, ...fontMono }}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* SKILLS DETAILED */}
            <div>
              <Reveal className="mb-7">
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Skills &amp; Tools</h2>
              </Reveal>

              <Reveal delay={90}>
                <div className="p-6 rounded-2xl space-y-6" style={{ backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)', ...fontMono }}>Soft Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {(dataDiri?.skills?.soft || []).map((s, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-lg"
                          style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-soft)', ...fontMono }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[11px] uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)', ...fontMono }}>Software &amp; Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      {(dataDiri?.software || []).map((s, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-lg"
                          style={{ color: 'var(--text)', border: `1px solid var(--border)`, ...fontMono }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ORGANIZATION SECTION */}
      <section id="organization" style={{ backgroundColor: 'var(--card)', borderTop: `1px solid var(--border)` }}>
        <div className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <Reveal className="mb-9">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Organization</h2>
          </Reveal>

          <Timeline items={organizationList} mainKey="role" subKey="company" descKey="description" yearKey="year" />
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section id="experience" style={{ backgroundColor: 'var(--bg)', borderTop: `1px solid var(--border)` }}>
        <div className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <Reveal className="mb-9">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Work Experience</h2>
          </Reveal>

          <Timeline items={workExperienceList} mainKey="role" subKey="company" descKey="description" yearKey="year" />
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        style={{
          background: `linear-gradient(180deg, var(--card) 0%, var(--accent-soft) 100%)`,
          borderTop: `1px solid var(--border)`,
        }}
      >
        <div className="py-16 md:py-20 px-6 md:px-12 max-w-6xl mx-auto">
          <Reveal className="mb-9 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ color: 'var(--text)', ...fontDisplay }}>Kontak</h2>
          </Reveal>

          <Reveal delay={100}>
            <div
              className="relative max-w-3xl mx-auto md:mx-0 overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
              style={{ backgroundColor: 'var(--card)', border: `1px solid var(--border)` }}
            >
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full blur-[80px] opacity-30 pointer-events-none"
                style={{ backgroundColor: 'var(--accent-deep)' }}
              ></div>

              <div className="flex-1 relative z-10">
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--text)', ...fontDisplay }}>Mari membangun sesuatu bersama</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Saya selalu terbuka untuk mendiskusikan proyek pengembangan web baru, ide kreatif, atau kesempatan untuk menjadi bagian dari visi Anda. Jangan ragu untuk menghubungi saya melalui email!
                </p>
              </div>

              <div className="w-full md:w-auto shrink-0 relative z-10">
                <a
                  href={`mailto:${dataDiri?.contact?.email}`}
                  className="group block p-5 rounded-xl transition-all hover:-translate-y-0.5"
                  style={{ backgroundColor: 'var(--accent)', ...fontMono }}
                >
                  <span className="text-white/70 block mb-1 text-xs">Email Saya di</span>
                  <span className="text-white font-semibold text-base break-all">
                    {dataDiri?.contact?.email}
                  </span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'var(--bg)', borderTop: `1px solid var(--border)` }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs" style={{ color: 'var(--text-muted)', ...fontMono }}>
          <p>© {new Date().getFullYear()} {dataDiri?.nama || "Muhamad Elgar"}</p>

          <div className="flex items-center gap-4">
            {dataDiri?.contact?.github && (
              <a href={dataDiri.contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all duration-300">
                <IconGitHub className="w-[18px] h-[18px]" />
              </a>
            )}
            {dataDiri?.contact?.linkedin && (
              <a href={dataDiri.contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all duration-300">
                <IconLinkedIn className="w-[18px] h-[18px]" />
              </a>
            )}
            {dataDiri?.contact?.instagram && (
              <a href={dataDiri.contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all duration-300">
                <IconInstagram className="w-[18px] h-[18px]" />
              </a>
            )}
            {dataDiri?.contact?.youtube1 && (
              <a href={dataDiri.contact.youtube1} target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-[var(--accent)] hover:-translate-y-0.5 transition-all duration-300">
                <IconYouTube className="w-[18px] h-[18px]" />
              </a>
            )}
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;

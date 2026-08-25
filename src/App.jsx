import { useState, useRef, useEffect } from 'react';
import InstagramGallery from './InstagramGallery';
import dataDiri from './data';

import profilePic from './assets/profile/profile.png';

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);

  const dropdownRef = useRef(null);

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
    <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
    <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
    <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 011.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
  ];

  if (showGallery) {
    return <InstagramGallery onBack={() => setShowGallery(false)} />;
  }

  const profilePicUrl = profilePic;
  const resumeEnUrl = dataDiri?.resume;
  const resumeIdUrl = dataDiri?.resume_id;

  const nameParts = dataDiri?.nama ? dataDiri.nama.split(' ') : ['Muhamad', 'Elgar'];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // Menggabungkan atau mengambil data organisasi dengan fallback aman
  const organizationList = dataDiri?.organization || (dataDiri?.experience || []).filter(item => 
    item.role.toLowerCase().includes('anggota') || item.role.toLowerCase().includes('divisi')
  );

  const workExperienceList = dataDiri?.experience ? dataDiri.experience.filter(item => 
    !item.role.toLowerCase().includes('anggota') && !item.role.toLowerCase().includes('divisi')
  ) : [];

  return (
    <div className="bg-[#0A0A0E] text-slate-100 min-h-screen font-sans antialiased selection:bg-indigo-500 selection:text-white scroll-smooth">

      {/* NAVIGATION BAR */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0A0A0E]/60 backdrop-blur-xl border-b border-slate-800/40 z-50 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">

          <a href="#about" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <span className="font-mono font-bold text-base">EGR</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-indigo-400 transition-colors font-mono">
              {firstName} {lastName}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono tracking-wider text-slate-400 uppercase">
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
            <a href="#services" className="hover:text-indigo-400 transition-colors">Services</a>
            <a href="#portfolio" className="hover:text-indigo-400 transition-colors">Work</a>
            <a href="#education" className="hover:text-indigo-400 transition-colors">Education</a>
            <a href="#organization" className="hover:text-indigo-400 transition-colors">Organization</a>
            <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>

          {/* Resume Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsResumeOpen(!isResumeOpen)}
              className="flex items-center gap-2 text-xs font-mono bg-indigo-600/90 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-600/20 active:scale-95"
            >
              RESUME
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isResumeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`absolute right-0 mt-3 w-56 bg-[#12131A]/90 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-800/80 overflow-hidden transition-all duration-300 origin-top-right z-50 ${isResumeOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
              <div className="flex flex-col p-1">
                <a
                  href={resumeEnUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-indigo-600/20 transition-colors"
                >
                  <span>🇬🇧</span>
                  <div>
                    <p className="font-semibold text-white">English Resume</p>
                    <p className="text-[10px] text-slate-400">Download CV (EN)</p>
                  </div>
                </a>
                <a
                  href={resumeIdUrl}
                  target="_blank"
                  rel="noreferrer"
                  download
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-mono text-slate-300 hover:text-white hover:bg-indigo-600/20 transition-colors"
                >
                  <span>🇮🇩</span>
                  <div>
                    <p className="font-semibold text-white">Resume Indonesia</p>
                    <p className="text-[10px] text-slate-400">Unduh CV (ID)</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

        </div>
      </nav>

      {/* HERO SECTION / TENTANG SAYA */}
      <section id="about" className="pt-36 pb-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="bg-[#12131C]/30 backdrop-blur-md border border-slate-800/50 rounded-3xl p-8 md:p-12 mb-8 relative overflow-hidden">
          
          {/* Background Kodingan Semi Blur di Sisi Kanan */}
          <div 
            className="absolute inset-y-0 right-0 w-full lg:w-2/3 bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 blur-[3px] pointer-events-none"
            style={{
              WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
              maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
            }}
          ></div>

          {/* Efek Cahaya / Aura di belakang foto profil */}
          <div className="absolute bottom-0 right-0 lg:right-10 w-[20rem] md:w-[30rem] h-[20rem] md:h-[30rem] bg-indigo-500/25 rounded-full blur-[100px] -z-0 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Teks Informasi di Kiri */}
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 leading-tight">
                {firstName} {lastName}
              </h1>

              <h2 className="text-xl md:text-2xl font-semibold text-indigo-400 mb-6 font-mono">
                Frontend Developer & UI Designer.
              </h2>

              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                {dataDiri?.about}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <a
                  href="#portfolio"
                  className="bg-indigo-600/90 hover:bg-indigo-500 text-white font-mono text-xs font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg shadow-indigo-600/20"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="bg-slate-800/40 hover:bg-slate-800/80 text-slate-200 border border-slate-700/50 font-mono text-xs font-semibold px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Let's Talk
                </a>
              </div>
            </div>

            {/* Bagian Kanan: Khusus Foto Profil Saja (Posisi Menempel Tepat di Bawah Card) */}
            <div className="w-full lg:w-[400px] shrink-0 flex justify-center items-end mt-10 lg:mt-0 relative z-10 -mb-8 md:-mb-12">
              <div className="w-full h-[24rem] md:h-[32rem] relative group flex justify-center items-end">
                <img
                  src={profilePicUrl}
                  alt={dataDiri?.nama || "Muhamad Elgar"}
                  className="w-full h-full object-contain object-bottom group-hover:scale-105 transition-transform duration-700 filter drop-shadow-[0_0_40px_rgba(99,102,241,0.35)] brightness-[1.1] contrast-[1.15] saturate-[1.1]"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* CORE STACK & CONNECT CHANNELS */}
        <div className="bg-[#12131C]/30 backdrop-blur-md border border-slate-800/50 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <span className="text-indigo-400 font-mono text-xs tracking-wider uppercase block mb-3">core stack</span>
            <div className="flex flex-wrap gap-2">
              {(dataDiri?.skills?.hard || []).map((s, i) => (
                <div key={i} className="bg-slate-900/60 border border-slate-800/80 text-slate-300 font-mono text-xs px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2 hover:border-indigo-500/40 hover:text-white transition-all">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  {s}
                </div>
              ))}
            </div>
          </div>

          <div className="w-full md:w-auto shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-slate-800/40">
            <span className="text-indigo-400 font-mono text-xs tracking-wider uppercase block mb-3">channels</span>
            <div className="flex flex-wrap gap-3">
              {dataDiri?.contact?.github && (
                <a
                  href={dataDiri.contact.github}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900/60 hover:bg-indigo-600/20 border border-slate-800/80 hover:border-indigo-500/40 text-slate-200 text-xs font-mono py-2 px-4 rounded-xl flex items-center gap-2 transition-all"
                >
                  <span>💻</span> GitHub
                </a>
              )}
              {dataDiri?.contact?.linkedin && (
                <a
                  href={dataDiri.contact.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-900/60 hover:bg-indigo-600/20 border border-slate-800/80 hover:border-indigo-500/40 text-slate-200 text-xs font-mono py-2 px-4 rounded-xl flex items-center gap-2 transition-all"
                >
                  <span>🔗</span> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Services</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(dataDiri?.services || []).map((service, i) => (
            <div
              key={service.id || i}
              className="p-6 bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-2xl hover:border-indigo-500/30 hover:bg-[#12131C]/60 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 mb-4 rounded-xl bg-slate-900/80 border border-slate-800/80 text-indigo-400 flex items-center justify-center group-hover:border-indigo-500/40 group-hover:bg-indigo-600/10 transition-colors">
                  {serviceIcons[i % serviceIcons.length]}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{service.description || service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO / WORK */}
      <section id="portfolio" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(dataDiri?.projects || []).map((p, index) => (
            <div
              key={p.project_id || p.id || index}
              className="bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-2xl p-6 flex flex-col justify-between hover:border-indigo-500/30 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-end items-center mb-3">
                  <span className={`text-[10px] font-mono px-2.5 py-1 rounded-md border ${p.time === "Recent Project" ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-300" : "bg-slate-900/50 border-slate-800/50 text-slate-400"}`}>
                    {p.time}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  {p.title}
                </h3>
                <p className="text-xs font-mono text-indigo-400 mb-4">{p.role}</p>

                {/* Banner Foto Proyek di Tengah Card */}
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/50 relative">
                  <img
                    src={p.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop";
                    }}
                  />
                </div>

                {/* Penjelasan Proyek */}
                <p className="text-slate-400 text-xs leading-relaxed mb-6">{p.description || p.desc}</p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {(p.tech || []).map((t, idx) => (
                    <span key={idx} className="bg-slate-900/60 border border-slate-800/60 text-slate-400 font-mono text-[10px] px-2.5 py-1 rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>

                {p.link === "#gallery" ? (
                  <button
                    onClick={() => setShowGallery(true)}
                    className="w-full bg-slate-900/60 hover:bg-indigo-600/80 border border-slate-800/80 hover:border-indigo-500/50 text-white font-mono text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    Open Photo Gallery ↗
                  </button>
                ) : p.link && p.link !== "#" ? (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-slate-900/60 hover:bg-indigo-600/80 border border-slate-800/80 hover:border-indigo-500/50 text-white font-mono text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                  >
                    Open Repository ↗
                  </a>
                ) : (
                  <span className="w-full bg-slate-900/30 border border-slate-800/30 text-slate-600 font-mono text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                    Private Repository 🔒
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION & SKILLS */}
      <section id="education" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* EDUCATION */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Education</h2>
            </div>

            <div className="space-y-4">
              {(dataDiri?.education || []).map((edu, i) => (
                <div key={edu.id || i} className="p-5 bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-xl font-mono">
                  <span className="text-indigo-400 text-xs">{edu.year}</span>
                  <h3 className="text-white font-bold font-sans text-base mt-1">{edu.institution}</h3>
                  <p className="text-slate-400 text-xs font-sans mt-1">{edu.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <span className="text-indigo-400 font-mono text-xs block mb-3">Interests</span>
              <div className="flex flex-wrap gap-2">
                {(dataDiri?.hobbies || []).map((h, i) => (
                  <span key={i} className="bg-[#12131C]/30 border border-slate-800/40 text-slate-300 font-mono text-xs px-3 py-1.5 rounded-lg">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* SKILLS DETAILED */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white tracking-tight">Skills & Tools</h2>
            </div>

            <div className="bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-2xl p-6 space-y-6">
              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Soft Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {(dataDiri?.skills?.soft || []).map((s, i) => (
                    <span key={i} className="bg-slate-900/60 border border-slate-800/60 text-indigo-300 font-mono text-xs px-3 py-1.5 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Software & Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {(dataDiri?.software || []).map((s, i) => (
                    <span key={i} className="bg-slate-900/60 border border-slate-800/60 text-slate-300 font-mono text-xs px-3 py-1.5 rounded-lg">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ORGANIZATION SECTION (DIPISAHKAN DARI EDUCATION & WORK) */}
      <section id="organization" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Organization</h2>
        </div>

        <div className="space-y-4">
          {organizationList.map((org, i) => (
            <div
              key={org.id || i}
              className="p-6 bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-2xl hover:border-indigo-500/30 transition-all"
            >
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{org.role}</h3>
                  <p className="text-xs font-mono text-indigo-400">{org.company || org.organization}</p>
                </div>
                <span className="text-xs font-mono bg-slate-900/60 text-slate-400 px-3 py-1 rounded-md border border-slate-800/60">
                  {org.year || org.time}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-3">{org.description || org.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WORK EXPERIENCE */}
      <section id="experience" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Work Experience</h2>
        </div>

        <div className="space-y-4">
          {workExperienceList.map((exp, i) => (
            <div
              key={exp.id || i}
              className="p-6 bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-2xl hover:border-slate-700/60 transition-all"
            >
              <div className="flex justify-between items-start flex-wrap gap-2 mb-2">
                <div>
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="text-xs font-mono text-indigo-400">{exp.company}</p>
                </div>
                <span className="text-xs font-mono bg-slate-900/60 text-slate-400 px-3 py-1 rounded-md border border-slate-800/60">
                  {exp.year || exp.time}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mt-3">{exp.description || exp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-slate-800/40">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Contact</h2>
        </div>

        <div className="max-w-3xl mx-auto md:mx-0 bg-[#12131C]/30 backdrop-blur-md border border-slate-800/40 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div className="flex-1">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Let's build something together</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm always open to discussing new web development projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out via email!
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0 flex flex-col gap-4 text-sm font-mono">
                <a href={`mailto:${dataDiri?.contact?.email}`} className="group p-5 bg-slate-900/60 hover:bg-indigo-600/20 rounded-xl border border-slate-800/60 hover:border-indigo-500/40 transition-all flex flex-col items-center md:items-start gap-1">
                  <span className="text-slate-500 group-hover:text-indigo-300 transition-colors block mb-1">Email Me At</span>
                  <span className="text-indigo-400 group-hover:text-white transition-colors font-semibold text-base">
                    {dataDiri?.contact?.email}
                  </span>
                </a>
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/40 bg-[#0A0A0E] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {dataDiri?.nama || "Muhamad Elgar"}. Built with React & Tailwind.</p>

          <div className="flex gap-4">
            {dataDiri?.contact?.github && (
              <a href={dataDiri.contact.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">GitHub</a>
            )}
            {dataDiri?.contact?.linkedin && (
              <a href={dataDiri.contact.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">LinkedIn</a>
            )}
            {dataDiri?.contact?.instagram && (
              <a href={dataDiri.contact.instagram} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">Instagram</a>
            )}
            {dataDiri?.contact?.youtube1 && (
              <a href={dataDiri.contact.youtube1} target="_blank" rel="noreferrer" className="hover:text-indigo-400 transition-colors">YouTube</a>
            )}
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
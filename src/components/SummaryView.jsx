import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, RefreshCw, Printer, ArrowUp,
  Code2, Languages, GraduationCap, Award, 
  Briefcase, TerminalSquare, ExternalLink, Calendar, MapPin
} from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import PdfResume from './PdfResume';
gsap.registerPlugin(ScrollTrigger);

const SummaryView = ({ profile, onRestart }) => {
  const containerRef = useRef(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // Scroll to top immediately when summary is shown
    window.scrollTo(0, 0);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useGSAP(() => {
    // Reset scrolltrigger positions since we might have just forcefully scrolled to top
    ScrollTrigger.refresh();

    const sections = gsap.utils.toArray(".summary-section");
    
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 95%", // Trigger slightly earlier to ensure it appears before user passes it
            toggleActions: "play none none none"
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <>
      <div className="print:hidden">
        <main ref={containerRef} className="w-full max-w-7xl mx-auto px-6 py-24 min-h-screen bg-[#020617] text-slate-200">
      
      {/* Action Buttons */}
      <div className="fixed top-6 left-6 z-50 summary-section print:hidden flex items-center gap-4">
        <button 
          onClick={onRestart}
          className="px-6 py-2 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 backdrop-blur-md rounded-full text-sm font-medium transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Restart Scrollytelling Animation"
        >
          <RefreshCw size={16} />
          Replay Animation
        </button>
        <button 
          onClick={() => window.print()}
          className="px-6 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 backdrop-blur-md rounded-full text-sm font-medium transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          aria-label="Print or Save as PDF"
        >
          <Printer size={16} />
          Save as PDF
        </button>
      </div>

      {/* Header Section */}
      <header className="summary-section text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
          {profile.personal.name}
        </h1>
        <p className="text-2xl text-slate-400 font-medium">{profile.personal.title}</p>
        
        <nav className="mt-6 flex justify-center gap-8 text-sm text-blue-300" aria-label="Social Links">
          <a href={`https://${profile.personal.linkedin}`} className="flex items-center gap-2 hover:text-white transition" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={18} /> LinkedIn
          </a>
          <a href={`https://${profile.personal.github}`} className="flex items-center gap-2 hover:text-white transition" target="_blank" rel="noopener noreferrer">
            <FaGithub size={18} /> GitHub
          </a>
          <a href={`mailto:${profile.personal.email}`} className="flex items-center gap-2 hover:text-white transition">
            <Mail size={18} /> Email
          </a>
        </nav>
        
        <p className="max-w-3xl mx-auto mt-8 text-slate-300 leading-relaxed text-lg">
          {profile.personal.summary}
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Skills, Languages, Education */}
        <aside className="space-y-8 lg:col-span-1">
          
          {/* Skills */}
          <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="skills-heading">
            <h2 id="skills-heading" className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <Code2 size={24} /> Skills
            </h2>
            
            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2" role="list">
                {profile.skills.languages.map(s => <span key={s} role="listitem" className="px-3 py-1 bg-teal-500/10 text-teal-300 rounded-full text-sm">{s}</span>)}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Frameworks</h3>
              <div className="flex flex-wrap gap-2" role="list">
                {profile.skills.frameworks.map(s => <span key={s} role="listitem" className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm">{s}</span>)}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">DevOps & Databases</h3>
              <div className="flex flex-wrap gap-2" role="list">
                {[...profile.skills.databases, ...profile.skills.tools, ...profile.skills.devops].map(s => (
                  <span key={s} role="listitem" className="px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-sm">{s}</span>
                ))}
              </div>
            </div>
          </section>

          {/* Spoken Languages */}
          {profile.personal.languages && profile.personal.languages.length > 0 && (
            <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="spoken-languages-heading">
              <h2 id="spoken-languages-heading" className="text-2xl font-bold text-indigo-400 mb-6 flex items-center gap-3">
                <Languages size={24} /> Languages
              </h2>
              <div className="space-y-4">
                {profile.personal.languages.map((lang, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-lg font-semibold text-white">{lang.language}</span>
                    <span className="text-indigo-300 text-sm">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="education-heading">
            <h2 id="education-heading" className="text-2xl font-bold text-blue-400 mb-6 flex items-center gap-3">
              <GraduationCap size={24} /> Education
            </h2>
            <div className="space-y-6">
              {profile.education.map(edu => (
                <article key={edu.id}>
                  <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                  <p className="text-blue-300 font-medium">{edu.institution}</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1"><Calendar size={12}/> {edu.startDate} - {edu.endDate}</p>
                  <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><MapPin size={12}/> {edu.location}</p>
                  {edu.details && <p className="text-xs text-slate-500 mt-2 italic">{edu.details}</p>}
                </article>
              ))}
            </div>
          </section>
          
          {/* Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (
            <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="certs-heading">
              <h2 id="certs-heading" className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-3">
                <Award size={24} /> Certifications
              </h2>
              <div className="space-y-6">
                {profile.certifications.map((cert, idx) => (
                  <article key={idx}>
                    <h3 className="text-md font-semibold text-white">{cert.name}</h3>
                    <p className="text-pink-300 text-sm">{cert.issuer}</p>
                    <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                      <Calendar size={12} /> {cert.date} 
                      {cert.credentialId && ` | ID: ${cert.credentialId}`}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          )}

        </aside>

        {/* Right Column: Experience, Projects, Recommendations */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Experience */}
          <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="text-2xl font-bold text-purple-400 mb-6 flex items-center gap-3">
              <Briefcase size={24} /> Experience
            </h2>
            <div className="space-y-10">
              {profile.experience.map(exp => (
                <article key={exp.id} className="relative pl-6 border-l-2 border-slate-800">
                  <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-2" aria-hidden="true"></div>
                  <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                  <p className="text-purple-300 font-medium text-lg">{exp.company}</p>
                  <div className="flex flex-wrap gap-4 mt-2 mb-4">
                    <p className="text-sm text-slate-400 flex items-center gap-1">
                      <Calendar size={14} /> {exp.startDate} - {exp.endDate} <span className="text-slate-500 text-xs ml-1">({exp.duration})</span>
                    </p>
                    <p className="text-sm text-slate-400 flex items-center gap-1">
                      <MapPin size={14} /> {exp.location}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-slate-300 flex items-start gap-2">
                        <span className="text-purple-500 mt-1.5 text-xs" aria-hidden="true">▹</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="projects-heading">
            <h2 id="projects-heading" className="text-2xl font-bold text-teal-400 mb-6 flex items-center gap-3">
              <TerminalSquare size={24} /> Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {profile.projects.map(proj => (
                <article key={proj.title} className="p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-teal-500/30 transition-colors flex flex-col h-full">
                  <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-mono text-teal-300">{proj.techStack}</p>
                  </div>
                  {proj.date && (
                    <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                      <Calendar size={12} /> {proj.date}
                    </p>
                  )}
                  <p className="text-sm text-slate-300 flex-grow">{proj.description}</p>
                  {proj.link && (
                    <a href={`https://${proj.link}`} target="_blank" rel="noopener noreferrer" className="mt-4 text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition">
                      View Project <ExternalLink size={14} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>

          {/* Recommendations */}
          {profile.recommendations && profile.recommendations.length > 0 && (
            <section className="summary-section bg-slate-900/50 border border-slate-800 rounded-3xl p-8 shadow-xl" aria-labelledby="recommendations-heading">
              <h2 id="recommendations-heading" className="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                <Award size={24} /> Recommendations
              </h2>
              <div className="space-y-6">
                {profile.recommendations.map((rec, idx) => (
                  <article key={idx} className="bg-slate-800/30 p-6 rounded-2xl border border-slate-700/50 relative">
                    <span className="absolute top-4 left-4 text-4xl text-amber-500/20 font-serif">"</span>
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 relative z-10">{rec.text}</p>
                    <div className="flex flex-col">
                      <span className="text-white font-semibold">{rec.name}</span>
                      <span className="text-amber-300 text-xs">{rec.title}</span>
                      <span className="text-slate-500 text-xs mt-1">{rec.date}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 p-4 bg-teal-500/10 hover:bg-teal-500/30 border border-teal-500/50 text-teal-400 backdrop-blur-md rounded-full shadow-lg transition-all focus:outline-none print:hidden animate-fade-in"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
        </main>
      </div>
      <PdfResume profile={profile} />
    </>
  );
};

export default SummaryView;

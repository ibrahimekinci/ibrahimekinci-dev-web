import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Calendar, MapPin } from 'lucide-react';
import Character from './Character';

function extractYear(dateStr) {
  if (!dateStr) return 0;
  const match = dateStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : 0;
}

const CloudCard = ({ children, alignLeft, title, typeColor = "from-blue-300 to-purple-400" }) => {
  return (
    <div className={`intro-element absolute w-full px-6 md:px-24 flex opacity-0 ${alignLeft ? 'justify-start' : 'justify-end'}`}>
      <div className="w-full md:w-5/12 lg:w-4/12 bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
        <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h3 className={`text-xl md:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r ${typeColor} mb-4`}>
          {title}
        </h3>
        <div className="text-slate-300 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const YearMarker = ({ year }) => {
  return (
    <div className="intro-element absolute w-full flex justify-center opacity-0 pointer-events-none z-0">
      <h2 className="text-[120px] md:text-[200px] font-black text-white/5 tracking-tighter drop-shadow-2xl">
        {year}
      </h2>
    </div>
  );
};

const IntroScene = ({ profile, onComplete }) => {
  const containerRef = useRef(null);

  // 1. Combine and parse all items
  const combined = [
    ...profile.experience.map(exp => ({ 
      ...exp, 
      type: 'Experience', 
      year: extractYear(exp.startDate),
      dateStr: `${exp.startDate} – ${exp.endDate} | ${exp.duration}`
    })),
    ...profile.education.map(edu => ({ 
      ...edu, 
      type: 'Education', 
      year: extractYear(edu.startDate),
      dateStr: `${edu.startDate} – ${edu.endDate}`
    })),
    ...profile.projects.map(proj => ({ 
      ...proj, 
      type: 'Project', 
      year: extractYear(proj.date),
      dateStr: proj.date
    }))
  ];

  // 2. Sort combined items by Year descending
  combined.sort((a, b) => b.year - a.year);

  // 3. Group by Year
  const groupedByYear = {};
  combined.forEach(item => {
    if (!groupedByYear[item.year]) groupedByYear[item.year] = [];
    groupedByYear[item.year].push(item);
  });

  const yearsDesc = Object.keys(groupedByYear).sort((a, b) => b - a);

  // 4. Flatten into an animation sequence
  const introSequence = [];
  yearsDesc.forEach(year => {
     introSequence.push({ isYearMarker: true, year });
     groupedByYear[year].forEach(item => {
        introSequence.push({ isYearMarker: false, item });
     });
  });

  // Listen for manual interactions to skip
  useEffect(() => {
    const handleSkip = (e) => {
      if (e.target.tagName === 'BUTTON' || e.target.closest('button')) return;
      onComplete();
    };

    const handleKey = (e) => {
      if (['ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'PageUp'].includes(e.code)) {
        onComplete();
      }
    };

    window.addEventListener('wheel', handleSkip, { once: true });
    window.addEventListener('touchmove', handleSkip, { once: true });
    window.addEventListener('keydown', handleKey, { once: true });

    return () => {
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('touchmove', handleSkip);
      window.removeEventListener('keydown', handleKey);
    };
  }, [onComplete]);

  useGSAP(() => {
    const elements = gsap.utils.toArray('.intro-element');
    // Speed up the animation slightly since we have more items now (2s interval instead of 2.5s)
    const interval = 2.0; 
    const totalDuration = elements.length * interval + 4;

    const masterTl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 1000);
      }
    });

    masterTl.to('.bg-nebula', {
      y: 400,
      duration: totalDuration,
      ease: "none"
    }, 0);
    
    elements.forEach((el, i) => {
      const startTime = i * interval; 
      
      gsap.set(el, { y: -200, scale: 0.8, opacity: 0 });
      
      const elTl = gsap.timeline();
      elTl.to(el, {
        y: window.innerHeight * 0.35,
        scale: 1,
        opacity: 1,
        duration: 2,
        ease: "power2.out"
      })
      .to(el, {
        y: window.innerHeight * 1.2,
        scale: 1.2,
        opacity: 0,
        duration: 2.5,
        ease: "power2.in"
      });

      masterTl.add(elTl, startTime);
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-screen bg-[#020617] overflow-hidden flex items-center justify-center">
      
      <div className="bg-nebula absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-900/30 rounded-full blur-[120px]"></div>
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[150px]"></div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-10">
        {introSequence.map((seq, idx) => {
          if (seq.isYearMarker) {
            return <YearMarker key={`year-${idx}`} year={seq.year} />;
          }

          const item = seq.item;
          // Strategy: Projects on the right (alignLeft=false), Education/Experience on the left (alignLeft=true)
          const isProject = item.type === 'Project';
          const alignLeft = !isProject;

          let typeColor = "from-blue-300 to-purple-400";
          if (item.type === 'Experience') typeColor = "from-purple-400 to-pink-400";
          if (item.type === 'Project') typeColor = "from-teal-300 to-emerald-400";

          return (
            <CloudCard key={`item-${idx}`} alignLeft={alignLeft} title={item.type} typeColor={typeColor}>
               <div className="mb-2">
                  <p className="text-lg text-white font-medium">{item.title || item.degree}</p>
                  <p className="text-purple-300 text-sm mb-2">{item.company || item.institution || item.techStack}</p>
                  {item.dateStr && <p className="text-slate-400 text-xs mt-1 flex items-center gap-1"><Calendar size={12}/> {item.dateStr}</p>}
                  {item.location && <p className="text-teal-400/80 text-xs mt-1 flex items-center gap-1"><MapPin size={12}/> {item.location}</p>}
               </div>
            </CloudCard>
          );
        })}
      </div>

      <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-30 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)]">
        <Character />
      </div>

      <div className="absolute bottom-6 text-slate-500 text-xs tracking-widest uppercase animate-pulse z-40">
        Scroll or press any key to skip
      </div>

    </div>
  );
};

export default IntroScene;

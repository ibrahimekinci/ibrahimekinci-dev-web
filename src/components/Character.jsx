import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Character = () => {
  const charRef = useRef(null);

  useGSAP(() => {
    const dur = 1.2; 
    
    // Set all transform origins strictly to 0,0 (the joints)
    gsap.set(['#left-thigh', '#left-calf', '#right-thigh', '#right-calf', '#left-arm', '#right-arm', '#head', '#dreads'], {
      transformOrigin: '0px 0px'
    });

    gsap.to('#left-thigh', {
      keyframes: { "0%": { rotation: 20 }, "50%": { rotation: -35 }, "100%": { rotation: 20 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#left-calf', {
      keyframes: { "0%": { rotation: 5 }, "25%": { rotation: 55 }, "50%": { rotation: 0 }, "75%": { rotation: 10 }, "100%": { rotation: 5 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#right-thigh', {
      keyframes: { "0%": { rotation: -35 }, "50%": { rotation: 20 }, "100%": { rotation: -35 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#right-calf', {
      keyframes: { "0%": { rotation: 0 }, "25%": { rotation: 10 }, "50%": { rotation: 5 }, "75%": { rotation: 55 }, "100%": { rotation: 0 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#left-arm', {
      keyframes: { "0%": { rotation: -30 }, "50%": { rotation: 30 }, "100%": { rotation: -30 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#right-arm', {
      keyframes: { "0%": { rotation: 30 }, "50%": { rotation: -30 }, "100%": { rotation: 30 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#torso-group', {
      keyframes: { "0%": { y: 0 }, "25%": { y: -12 }, "50%": { y: 0 }, "75%": { y: -12 }, "100%": { y: 0 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#head', {
      keyframes: { "0%": { rotation: 3 }, "25%": { rotation: -2 }, "50%": { rotation: -3 }, "75%": { rotation: 2 }, "100%": { rotation: 3 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

    gsap.to('#dreads', {
      keyframes: { "0%": { rotation: 10 }, "25%": { rotation: 0 }, "50%": { rotation: -10 }, "75%": { rotation: 0 }, "100%": { rotation: 10 } },
      duration: dur, ease: 'sine.inOut', repeat: -1
    });

  }, { scope: charRef });

  return (
    <div ref={charRef} className="relative w-48 h-[350px] flex flex-col items-center justify-end z-20 pointer-events-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]">
      <svg viewBox="0 0 200 400" className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
        
        {/* Global Wrapper (DO NOT ANIMATE) to preserve translation */}
        <g transform="translate(100, 220)">
          
          {/* Animated Torso Group (Starts at local 0,0) */}
          <g id="torso-group">
            
            {/* Back Arm (Left) */}
            <g id="left-arm" transform="translate(-40, -100)">
               <rect x="-10" y="0" width="20" height="70" rx="10" fill="#0f766e" />
               <circle cx="0" cy="75" r="10" fill="#8b5a2b" />
            </g>

            {/* Back Leg (Left) */}
            <g id="left-thigh" transform="translate(-25, 0)">
              <rect x="-15" y="0" width="30" height="75" rx="10" fill="#334155" />
              <g id="left-calf" transform="translate(0, 65)">
                <rect x="-12" y="0" width="24" height="65" rx="8" fill="#334155" />
                <path d="M -15 55 L 15 55 C 25 55, 25 75, 15 75 L -25 75 C -25 55, -15 55, -15 55 Z" fill="#f97316" />
                <path d="M -5 70 L 10 70" stroke="white" strokeWidth="3" />
              </g>
            </g>

            {/* Torso */}
            <path d="M -40 -100 C -50 -90, -50 -20, -35 0 L 35 0 C 50 -20, 50 -90, 40 -100 Z" fill="#14b8a6" />
            <path d="M -20 -40 L 20 -40 L 30 -10 L -30 -10 Z" fill="#0f766e" />
            <path d="M -30 -100 C -30 -70, 30 -70, 30 -100 Z" fill="#0f766e" />

            {/* Head & Hat */}
            <g id="head" transform="translate(0, -110)">
               <rect x="-10" y="-15" width="20" height="20" fill="#8b5a2b" />
               <circle cx="0" cy="-35" r="28" fill="#8b5a2b" />
               
               <g id="dreads" transform="translate(0, -15)">
                 <path d="M -15 -10 Q -25 40 -15 70" stroke="#1c1917" strokeWidth="8" strokeLinecap="round" fill="none" />
                 <path d="M -5 -5 Q -10 50 -5 80" stroke="#1c1917" strokeWidth="10" strokeLinecap="round" fill="none" />
                 <path d="M 5 -5 Q 10 50 5 85" stroke="#1c1917" strokeWidth="10" strokeLinecap="round" fill="none" />
                 <path d="M 15 -10 Q 25 40 15 70" stroke="#1c1917" strokeWidth="8" strokeLinecap="round" fill="none" />
                 <path d="M 0 -10 Q 0 60 0 90" stroke="#0a0a0a" strokeWidth="8" strokeLinecap="round" fill="none" />
               </g>

               <path d="M -29 -40 C -29 -75, 29 -75, 29 -40 Z" fill="#1e293b" />
               <rect x="-31" y="-40" width="62" height="16" rx="5" fill="#0f172a" />
               <path d="M -20 -50 L 20 -50" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
               <path d="M -15 -60 L 15 -60" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" />
            </g>

            {/* Front Leg (Right) */}
            <g id="right-thigh" transform="translate(25, 0)">
              <rect x="-15" y="0" width="30" height="75" rx="10" fill="#475569" />
              <g id="right-calf" transform="translate(0, 65)">
                <rect x="-12" y="0" width="24" height="65" rx="8" fill="#475569" />
                <path d="M -15 55 L 15 55 C 25 55, 25 75, 15 75 L -25 75 C -25 55, -15 55, -15 55 Z" fill="#f97316" />
                <path d="M -5 70 L 10 70" stroke="white" strokeWidth="3" />
              </g>
            </g>

            {/* Front Arm (Right) */}
            <g id="right-arm" transform="translate(40, -100)">
               <rect x="-10" y="0" width="20" height="70" rx="10" fill="#14b8a6" />
               <circle cx="0" cy="75" r="10" fill="#8b5a2b" />
            </g>

          </g>
        </g>
      </svg>
    </div>
  );
};

export default Character;

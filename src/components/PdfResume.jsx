import React from 'react';

const PdfResume = ({ profile }) => {
  return (
    <div className="hidden print:block bg-white text-black font-sans w-full mx-auto pb-8">
      {/* Header */}
      <header className="pb-4 mb-6 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2 uppercase text-black">{profile.personal.name}</h1>
        <p className="text-xl font-semibold text-gray-800 mb-3">{profile.personal.title}</p>
        
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-800">
          <a href={`mailto:${profile.personal.email}`} className="flex items-center gap-1 text-black">
            <span className="font-bold">Email:</span> {profile.personal.email}
          </a>
          <a href={`https://${profile.personal.linkedin}`} className="flex items-center gap-1 text-black">
            <span className="font-bold">LinkedIn:</span> {profile.personal.linkedin}
          </a>
          <a href={`https://${profile.personal.github}`} className="flex items-center gap-1 text-black">
            <span className="font-bold">GitHub:</span> {profile.personal.github}
          </a>
        </div>
        <p className="mt-4 text-[13px] text-gray-800 leading-relaxed text-justify">
          {profile.personal.summary}
        </p>
      </header>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Skills & Education (4 cols) */}
        <aside className="col-span-4 space-y-6 border-r border-gray-300 pr-6">
          
          {/* Skills */}
          <section>
            <h2 className="text-lg font-bold uppercase pb-1 mb-3 text-black">Skills</h2>
            
            <div className="mb-4">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase mb-1">Languages</h3>
              <p className="text-[13px] leading-tight text-gray-900">{profile.skills.languages.join(", ")}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-[11px] font-bold text-gray-500 uppercase mb-1">Frameworks</h3>
              <p className="text-[13px] leading-tight text-gray-900">{profile.skills.frameworks.join(", ")}</p>
            </div>
            
            <div>
              <h3 className="text-[11px] font-bold text-gray-500 uppercase mb-1">DevOps & Tools</h3>
              <p className="text-[13px] leading-tight text-gray-900">
                {[...profile.skills.databases, ...profile.skills.tools, ...profile.skills.devops].join(", ")}
              </p>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold uppercase pb-1 mb-3 text-black">Education</h2>
            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div key={idx}>
                  <h3 className="text-[13px] font-bold text-black">{edu.degree}</h3>
                  <p className="text-[13px] text-gray-800">{edu.institution}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{edu.startDate} - {edu.endDate} | {edu.location}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Languages */}
          {profile.personal.languages && profile.personal.languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase pb-1 mb-3 text-black">Languages</h2>
              <ul className="space-y-1.5">
                {profile.personal.languages.map((lang, idx) => (
                  <li key={idx} className="text-[13px] flex justify-between">
                    <span className="font-semibold text-gray-900">{lang.language}</span>
                    <span className="text-gray-600">{lang.proficiency}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {profile.certifications && profile.certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold uppercase pb-1 mb-3 text-black">Certifications</h2>
              <div className="space-y-3">
                {profile.certifications.map((cert, idx) => (
                  <div key={idx}>
                    <h3 className="text-[13px] font-bold text-black">{cert.name}</h3>
                    <p className="text-[11px] text-gray-700">{cert.issuer}</p>
                    <p className="text-[11px] text-gray-500">{cert.date}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>

        {/* Right Column: Experience & Projects (8 cols) */}
        <div className="col-span-8 space-y-6">
          
          {/* Experience */}
          <section>
            <h2 className="text-lg font-bold uppercase pb-1 mb-4 text-black">Professional Experience</h2>
            <div className="space-y-5">
              {profile.experience.map((exp, idx) => (
                <article key={idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[15px] font-bold text-black">{exp.title}</h3>
                    <span className="text-[11px] font-semibold text-gray-600 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-[13px] font-semibold text-gray-800">{exp.company}</p>
                    <span className="text-[11px] text-gray-500">{exp.location}</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 space-y-1">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="text-[13px] text-gray-800 leading-snug">{desc}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-lg font-bold uppercase pb-1 mb-4 text-black">Selected Projects</h2>
            <div className="space-y-4">
              {profile.projects.map((proj, idx) => (
                <article key={idx}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[14px] font-bold text-black">
                      {proj.title}
                      {proj.link && (
                        <span className="ml-2 text-[11px] font-normal text-gray-500">
                          ({proj.link})
                        </span>
                      )}
                    </h3>
                  </div>
                  <p className="text-[11px] font-mono text-gray-500 mb-1.5">{proj.techStack}</p>
                  <p className="text-[13px] text-gray-800 leading-snug">{proj.description}</p>
                </article>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PdfResume;

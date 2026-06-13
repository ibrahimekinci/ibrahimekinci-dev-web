import React, { useState } from 'react';
import IntroScene from './components/IntroScene';
import SummaryView from './components/SummaryView';
import profileData from './data/profile.json';

function App() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">
      {!showSummary && (
        <button 
          onClick={() => setShowSummary(true)}
          className="fixed top-6 right-6 z-50 px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md rounded-full text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500"
          aria-label="Skip animation and go to summary"
        >
          Skip to Summary
        </button>
      )}

      {showSummary ? (
        <SummaryView profile={profileData} onRestart={() => setShowSummary(false)} />
      ) : (
        <IntroScene profile={profileData} onComplete={() => setShowSummary(true)} />
      )}
    </div>
  );
}

export default App;

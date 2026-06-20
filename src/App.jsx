import React, { useState } from 'react';
import IntroScene from './components/IntroScene';
import SummaryView from './components/SummaryView';
import profileData from './data/profile.json';

function App() {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans overflow-x-hidden">


      {showSummary ? (
        <SummaryView profile={profileData} onRestart={() => setShowSummary(false)} />
      ) : (
        <IntroScene profile={profileData} onComplete={() => setShowSummary(true)} />
      )}
    </div>
  );
}

export default App;

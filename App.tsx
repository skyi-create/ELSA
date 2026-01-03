import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Intro } from './components/Intro';
import { Business } from './components/Business';
import { Community } from './components/Community';
import { Webzine } from './components/Webzine';
import { Footer } from './components/Footer';
import { Diagnosis } from './components/Diagnosis';
import { BusinessDetail } from './components/Business';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'diagnosis' | 'business-detail'>('home');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);

  const navigateToHome = () => {
    setCurrentView('home');
    window.scrollTo(0, 0);
  };

  const navigateToDiagnosis = () => {
    setCurrentView('diagnosis');
    window.scrollTo(0, 0);
  };

  const handleBusinessSelect = (id: string) => {
    setSelectedBusinessId(id);
    setCurrentView('business-detail');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Navbar onGoHome={navigateToHome} isHome={currentView === 'home'} />
      
      <main className="flex-grow">
        {currentView === 'home' ? (
          <>
            <Hero onStartDiagnosis={navigateToDiagnosis} />
            <Business onSelect={handleBusinessSelect} />
            <Community />
            <Intro />
            <Webzine />
          </>
        ) : currentView === 'diagnosis' ? (
          <Diagnosis onBack={navigateToHome} />
        ) : (
          <BusinessDetail id={selectedBusinessId} onBack={navigateToHome} />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
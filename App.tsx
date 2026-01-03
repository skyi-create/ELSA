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
import { SubPage } from './components/SubPage';

const App: React.FC = () => {
  // Extended view types to include generic sub-pages
  const [currentView, setCurrentView] = useState<'home' | 'diagnosis' | 'business-detail' | 'sub-page'>('home');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  
  // State for generic sub-pages (Intro, Community, Webzine)
  const [subPageInfo, setSubPageInfo] = useState<{ category: string, title: string } | null>(null);

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

  // Helper mapping for Korean Business Menu -> Business ID
  const businessIdMap: Record<string, string> = {
    '일자리 지원사업': 'job-support',
    '교육 및 자격사업': 'education',
    '컨설팅 사업': 'consulting',
    '실사, 인증 및 평가사업': 'due-diligence'
  };

  // Unified navigation handler for Navbar and Main Content clicks
  const handleNavigation = (menu: string, subItem: string) => {
    // Standardize '주요 사업' / '사업 내용' handling
    if (menu === '주요 사업' || menu === '사업 내용') {
       const mappedId = businessIdMap[subItem];
       if (mappedId) {
         handleBusinessSelect(mappedId);
       } else {
         console.warn(`No mapping found for business item: ${subItem}`);
         // Fallback if no ID map found, though strictly shouldn't happen with correct data
       }
    } else {
       // For Intro, Community, Webzine
       setSubPageInfo({ category: menu, title: subItem });
       setCurrentView('sub-page');
       window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <Navbar 
        onGoHome={navigateToHome} 
        onNavigate={handleNavigation}
        isHome={currentView === 'home'} 
      />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onStartDiagnosis={navigateToDiagnosis} />
            <Business onSelect={handleBusinessSelect} />
            <Community onNavigate={(subItem) => handleNavigation('커뮤니티', subItem)} />
            <Intro onNavigate={(subItem) => handleNavigation('협회 소개', subItem)} />
            <Webzine onNavigate={(subItem) => handleNavigation('웹진', subItem)} />
          </>
        )}
        
        {currentView === 'diagnosis' && (
          <Diagnosis onBack={navigateToHome} />
        )}
        
        {currentView === 'business-detail' && (
          <BusinessDetail id={selectedBusinessId} onBack={navigateToHome} />
        )}

        {currentView === 'sub-page' && subPageInfo && (
           <SubPage 
             category={subPageInfo.category} 
             title={subPageInfo.title} 
             onBack={navigateToHome}
             onNavigate={handleNavigation} // Allow side-bar navigation
           />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
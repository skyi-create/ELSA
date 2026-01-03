import React from 'react';

interface HeroProps {
  onStartDiagnosis?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartDiagnosis }) => {
  return (
    <section className="relative w-full h-screen bg-[#000] overflow-hidden pt-20">
      {/* 3D Scene Background */}
      <div className="w-full h-full">
         <spline-viewer url="https://prod.spline.design/bcH-y7EfcI2AqTRO/scene.splinecode"></spline-viewer>
      </div>

      {/* CTA Button Overlay - Positioned bottom-right to cover Spline logo */}
      <div className="absolute bottom-4 right-4 z-10">
        <button 
          onClick={onStartDiagnosis}
          className="group flex items-center gap-4 pl-8 pr-3 py-3 bg-[#0F2522] rounded-full transition-transform hover:scale-105 active:scale-95 shadow-lg border border-[#2F4F4F]/30 cursor-pointer text-left"
          style={{ minWidth: '300px', justifyContent: 'space-between' }}
        >
          <div className="flex flex-col items-start justify-center">
            <span className="text-[#D4FF3F] text-sm font-medium tracking-wider opacity-90 mb-0.5">
              ESG 공급망 실사
            </span>
            <span className="text-[#D4FF3F] text-xl font-bold tracking-wide">
              자가 진단 시작하기
            </span>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#D4FF3F] flex items-center justify-center text-[#0F2522] group-hover:rotate-45 transition-transform duration-300 flex-shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </div>
        </button>
      </div>
      
      {/* Gradient fade at bottom to blend with next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2F4F4F] to-transparent pointer-events-none"></div>
    </section>
  );
};
import React, { useState } from 'react';

interface NavbarProps {
  onGoHome?: () => void;
  isHome?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onGoHome, isHome = true }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { 
      name: '사업 내용', 
      href: '#business',
      subItems: ['일자리 지원사업', '교육 및 자격사업', '컨설팅 사업', '실사, 인증 및 평가사업']
    },
    { 
      name: '커뮤니티', 
      href: '#community',
      subItems: ['공지사항', '회원사 소식', '자료실', 'Q&A']
    },
    { 
      name: '협회 소개', 
      href: '#intro',
      subItems: ['이사장 인사말', '협회 연혁', '조직도', '찾아오시는 길']
    },
    { 
      name: '웹진', 
      href: '#webzine',
      subItems: ['특집 기사', '전문가 칼럼', '정책 동향', '교육/행사']
    },
  ];

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onGoHome) onGoHome();
  };

  const handleNavClick = (href: string) => {
    if (!isHome && onGoHome) {
      onGoHome();
      // Use setTimeout to allow view switch before scrolling
      setTimeout(() => {
        const element = document.querySelector(href);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#2F4F4F] border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/logo.png" 
              alt="(사)ESG노동사회협회" 
              className="h-12 md:h-14 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* Fallback text if image fails to load */}
            <span className="hidden text-white font-bold text-xl tracking-tight">
              (사)<span className="text-[#A3D154]">E</span><span className="text-[#748FFC]">S</span><span className="text-[#E0C84A]">G</span>노동사회협회
            </span>
          </a>
        </div>
        
        {/* Center/Right: Navigation Menu (Desktop) with Dropdown */}
        <div className="hidden md:flex space-x-10 h-full items-center">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group h-full flex items-center">
              <a 
                href={isHome ? item.href : '#'}
                onClick={(e) => {
                   if (!isHome) {
                     e.preventDefault();
                     handleNavClick(item.href);
                   }
                }}
                className="text-base font-medium text-gray-200 hover:text-white hover:font-bold transition-all duration-200 relative py-2"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4FF3F] transition-all duration-300 group-hover:w-full"></span>
              </a>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-56 bg-white rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-[#D4FF3F] overflow-hidden">
                <ul className="py-2">
                  {item.subItems.map((sub, idx) => (
                    <li key={idx}>
                      <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#2F4F4F] hover:font-bold border-b border-gray-50 last:border-0">
                        {sub}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#264040] absolute top-20 left-0 right-0 border-t border-white/10 shadow-xl overflow-y-auto max-h-[80vh]">
          <div className="flex flex-col p-4 space-y-4">
            {menuItems.map((item) => (
              <div key={item.name} className="border-b border-white/10 pb-2">
                <a 
                  href={isHome ? item.href : '#'}
                  onClick={(e) => {
                    setIsOpen(false);
                    if (!isHome) {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }
                  }}
                  className="block text-[#D4FF3F] font-bold text-lg mb-2"
                >
                  {item.name}
                </a>
                <div className="pl-4 space-y-2">
                   {item.subItems.map((sub, idx) => (
                     <a key={idx} href="#" className="block text-gray-300 hover:text-white text-sm">
                       - {sub}
                     </a>
                   ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2F4F4F] border-t border-white/10 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-center gap-6">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center lg:items-start">
             <a href="#" className="inline-block">
                <img 
                  src="/logo.png" 
                  alt="(사)ESG노동사회협회" 
                  className="h-10 w-auto object-contain"
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

          {/* Contact Info - Compact Row */}
          <div className="flex flex-wrap justify-center lg:justify-end gap-x-6 gap-y-2 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-400">주소</span>
                <span>서울시 송파구 문정로 31, 3층</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-400">전화</span>
                <span>02-2138-1416</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-400">이메일</span>
                <a href="mailto:elsa@elsa.or.lr" className="hover:text-white transition-colors">elsa@elsa.or.lr</a>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-400">팩스</span>
                <span>0000</span>
              </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/10 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
           <p>© 2024 (사)ESG노동사회협회. All rights reserved.</p>
           <div className="flex space-x-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-[#D4FF3F] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#D4FF3F] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#D4FF3F] transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
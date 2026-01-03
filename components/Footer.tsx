import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2F4F4F] border-t border-white/10 pt-16 pb-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Logo and Copyright Section */}
          <div className="flex flex-col md:w-1/3">
             <div className="mb-6">
                <a href="#" className="inline-block">
                  {/* 
                    [사용 가이드]
                    프로젝트의 public 폴더 또는 루트 경로에 'logo.png' 파일을 추가하세요.
                  */}
                  <img 
                    src="/logo.png" 
                    alt="(사)ESG노동사회협회" 
                    className="h-14 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  {/* Fallback text if image fails to load */}
                  <span className="hidden text-white font-bold text-2xl tracking-tight">
                    (사)<span className="text-[#A3D154]">E</span><span className="text-[#748FFC]">S</span><span className="text-[#E0C84A]">G</span>노동사회협회
                  </span>
                </a>
             </div>
             <p className="text-gray-300 text-sm leading-relaxed mb-4">
               ESG 경영과 노동의 가치를 조화롭게 연결하여<br/> 
               지속 가능한 미래를 만들어갑니다.
             </p>
          </div>

          {/* Contact Info Section */}
          <div className="flex flex-col md:w-2/3">
             <h3 className="text-[#D4FF3F] font-bold text-lg mb-4 uppercase tracking-wide">Contact Us</h3>
             <address className="not-italic grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 text-sm text-gray-200">
                <div className="flex items-start gap-2">
                  <span className="font-bold min-w-[60px] text-gray-400">주소</span>
                  <span>서울시 송파구 문정로 31, 3층</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold min-w-[60px] text-gray-400">전화번호</span>
                  <span>02-2138-2426</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold min-w-[60px] text-gray-400">이메일</span>
                  <a href="mailto:elsa@elsa.or.lr" className="hover:text-white transition-colors">elsa@elsa.or.lr</a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold min-w-[60px] text-gray-400">팩스번호</span>
                  <span>0000</span>
                </div>
             </address>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
           <p>© 2024 (사)ESG노동사회협회. All rights reserved.</p>
           <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#D4FF3F] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#D4FF3F] transition-colors">Facebook</a>
            <a href="#" className="hover:text-[#D4FF3F] transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
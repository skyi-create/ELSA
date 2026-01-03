import React from 'react';

interface SubPageProps {
  category: string;
  title: string;
  onBack: () => void;
  onNavigate?: (menu: string, subItem: string) => void;
}

// Sidebar component for sub-navigation
const SubSidebar: React.FC<{ 
    currentCategory: string, 
    currentTitle: string, 
    onNavigate?: (menu: string, subItem: string) => void 
}> = ({ currentCategory, currentTitle, onNavigate }) => {
    
    // Define sibling menus for sidebar
    const menus: Record<string, string[]> = {
        '협회 소개': ['이사장 인사말', '주요 회원', '협회 연혁', '조직도', '찾아오시는 길'],
        '커뮤니티': ['공지사항', '회원사 소식', '자료실', 'Q&A'],
        '웹진': ['특집 기사', '전문가 칼럼', '정책 동향', '교육/행사']
    };

    const items = menus[currentCategory] || [];

    return (
        <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-[#2F4F4F] text-white p-6 rounded-t-xl">
                <h3 className="text-xl font-bold">{currentCategory}</h3>
            </div>
            <div className="bg-white border border-gray-200 rounded-b-xl overflow-hidden shadow-sm">
                <ul>
                    {items.map((item, idx) => (
                        <li key={idx} className="border-b border-gray-100 last:border-0">
                            <button
                                onClick={() => onNavigate && onNavigate(currentCategory, item)}
                                className={`w-full text-left px-6 py-4 text-sm font-medium transition-colors hover:bg-gray-50 flex justify-between items-center
                                    ${currentTitle === item ? 'text-[#2F4F4F] font-bold bg-gray-50 border-l-4 border-l-[#2F4F4F]' : 'text-gray-600'}`}
                            >
                                {item}
                                {currentTitle === item && (
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

// Content Renderer
const ContentArea: React.FC<{ category: string, title: string }> = ({ category, title }) => {
    
    // Layout 1: Board List (Community)
    if (category === '커뮤니티') {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm min-h-[500px]">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    <div className="relative">
                        <input type="text" placeholder="검색어를 입력하세요" className="pl-4 pr-10 py-2 border rounded-lg text-sm focus:outline-none focus:border-[#2F4F4F]" />
                        <svg className="w-4 h-4 text-gray-400 absolute right-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                </div>
                
                {/* Board Table Header */}
                <div className="grid grid-cols-12 gap-4 border-t-2 border-[#2F4F4F] bg-gray-50 py-3 px-4 text-sm font-bold text-gray-700 text-center">
                    <div className="col-span-1">No</div>
                    <div className="col-span-8 md:col-span-7 text-left pl-4">제목</div>
                    <div className="col-span-2 hidden md:block">작성자</div>
                    <div className="col-span-3 md:col-span-2">작성일</div>
                </div>

                {/* Dummy List */}
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="grid grid-cols-12 gap-4 border-b border-gray-100 py-4 px-4 text-sm text-gray-600 items-center hover:bg-gray-50 transition-colors cursor-pointer">
                        <div className="col-span-1 text-center font-medium">{15 - i}</div>
                        <div className="col-span-8 md:col-span-7 text-left pl-4 font-medium text-gray-900 truncate">
                            {title === '공지사항' ? `[공지] 2024년도 ${title} 관련 안내 사항입니다.` : `[${title}] 관련 게시물 제목 예시입니다. (${i + 1})`}
                        </div>
                        <div className="col-span-2 hidden md:block text-center">관리자</div>
                        <div className="col-span-3 md:col-span-2 text-center text-gray-400">2024.05.{10 - i}</div>
                    </div>
                ))}
            </div>
        );
    }

    // Layout 2: Webzine Grid
    if (category === '웹진') {
        return (
            <div className="min-h-[500px]">
                 <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#2F4F4F]/10 group-hover:bg-transparent transition-colors"></div>
                                <div className="flex items-center justify-center h-full text-gray-400">Image Area</div>
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-bold text-[#2F4F4F] bg-[#D4FF3F] px-2 py-1 rounded-sm mb-2 inline-block">
                                    Vol. {12 - i}
                                </span>
                                <h4 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-[#2F4F4F] transition-colors">
                                    ESG 경영과 {title}의 미래 - 전문가 심층 분석
                                </h4>
                                <p className="text-sm text-gray-500 line-clamp-2">
                                    본 기사에서는 최신 트렌드를 반영하여 기업이 나아가야 할 방향을 제시합니다.
                                </p>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )
    }

    // Layout 3: Default Text Content (Intro & Others)
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm min-h-[500px]">
            <h3 className="text-3xl font-bold text-[#2F4F4F] mb-6 pb-4 border-b border-gray-100">{title}</h3>
            
            <div className="prose max-w-none text-gray-600 leading-relaxed space-y-6">
                <p className="text-lg font-medium text-gray-800">
                    (사)ESG노동사회협회 홈페이지를 방문해주셔서 감사합니다.
                </p>
                <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-[#2F4F4F]">
                    <p className="italic">
                        "{title}" 페이지 준비 중입니다.<br/>
                        협회는 노동의 가치를 존중하고 기업의 지속가능한 성장을 지원하기 위해 최선을 다하고 있습니다.
                    </p>
                </div>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                {title === '이사장 인사말' && (
                     <div className="mt-8 flex items-center gap-4">
                         <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">Photo</div>
                         <div>
                             <p className="font-bold text-xl text-gray-900">이 사 장</p>
                             <p className="text-[#2F4F4F]">(사)ESG노동사회협회 이사장</p>
                         </div>
                     </div>
                )}
                
                {title === '조직도' && (
                    <div className="mt-8 border p-8 rounded bg-gray-50 text-center">
                        [조직도 이미지 영역]
                    </div>
                )}

                {title === '찾아오시는 길' && (
                    <div className="mt-8">
                         <div className="bg-gray-200 w-full h-64 rounded-lg flex items-center justify-center mb-4">
                             [지도 API 영역]
                         </div>
                         <p>📍 주소: 서울시 송파구 문정로 31, 3층</p>
                         <p>📞 전화: 02-2138-1416</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export const SubPage: React.FC<SubPageProps> = ({ category, title, onBack, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16 animate-fade-in">
      {/* Page Header */}
      <div className="bg-[#2F4F4F] text-white py-12 mb-12 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
             <h1 className="text-4xl font-bold mb-4">{category}</h1>
             <p className="text-white/80 text-lg">ELSA는 노동이 존중받는 사회, 기업과 노동자가 함께 웃는 미래를 만듭니다.</p>
         </div>
         {/* Decorative Background Element */}
         <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-12"></div>
      </div>

      <div className="container mx-auto px-6">
         {/* Breadcrumb & Back */}
         <div className="flex justify-between items-center mb-8 text-sm">
             <div className="flex items-center gap-2 text-gray-500">
                 <button onClick={onBack} className="hover:text-[#2F4F4F]">Home</button>
                 <span>&gt;</span>
                 <span>{category}</span>
                 <span>&gt;</span>
                 <span className="font-bold text-[#2F4F4F]">{title}</span>
             </div>
             <button onClick={onBack} className="flex items-center gap-1 text-gray-500 hover:text-[#2F4F4F] font-medium transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
                메인으로
             </button>
         </div>

         <div className="flex flex-col md:flex-row gap-8 items-start">
             {/* Left Sidebar Navigation */}
             <SubSidebar currentCategory={category} currentTitle={title} onNavigate={onNavigate} />

             {/* Main Content */}
             <div className="flex-grow w-full">
                 <ContentArea category={category} title={title} />
             </div>
         </div>
      </div>
    </div>
  );
};
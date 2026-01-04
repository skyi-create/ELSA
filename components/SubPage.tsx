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

// Data for Members
const memberGroups = [
    {
        title: "고용노동 정책 및 정책 연구 (Policy & Research)",
        desc: "정부 정책 수립 및 집행의 최고위급 경험을 바탕으로, 기업에 가장 실효성 있는 정책 대응 전략을 제시합니다.",
        members: [
            { name: "이성기 박사", title: "IT정책경영학", desc: "전 고용노동부 차관 및 서울지방고용노동청장 (35년 경력), 고용노동정책 및 ESG 전략 전문가" },
            { name: "나영돈 박사", title: "노동경제학", desc: "전 한국고용정보원 이사장 및 고용노동부 고용정책실장 (34년 경력), HRD·HRM 및 국제노동기준 전문가" },
            { name: "황기돈 박사", title: "노동경제학", desc: "전 한국노동교육원 사무총장 및 한국고용정보원 본부장 (30년 경력), 독일공급망실사법 및 노사관계 전문가" },
            { name: "송홍석 교수", title: "숙명여대", desc: "전 중앙노동위원회 사무처장 및 고용노동부 직업능력개발국장 (30년 경력), 중대재해 및 노동법 전문가" },
        ]
    },
    {
        title: "ESG 공급망 실사 및 산업안전 (ESG & Safety)",
        desc: "글로벌 규제(CSDDD) 대응과 중대재해 예방을 위한 실질적인 현장 진단 및 컨설팅을 수행합니다.",
        members: [
            { name: "함병호 박사", title: "산업안전", desc: "전 고용노동부 화학안전과장 및 인천북부지청장 (35년 경력), 위험성평가 및 화학안전 전문가" },
            { name: "이준원 박사", title: "산업안전", desc: "현 숭실대학교 교수 및 전 안전보건공단 본부장 (35년 경력), 중대재해 예방 및 안전관리 수준 평가 전문가" },
            { name: "양선모 박사", title: "산업공학", desc: "CSDDD·ESG 경영진단 및 수준 평가, ERP 컨설팅 전문가 (30년 경력)" },
            { name: "강병노 박사", title: "기술지도사", desc: "공급망 실사, 탄소배출권 및 ESG 진단 평가 전문가 (30년 경력)" },
            { name: "이종재 박사", title: "현 PSI 대표", desc: "전 이투데이 대표, ESG 경영 평가·교육 및 공급망 실사 전반 전문가" },
        ]
    },
    {
        title: "노동법률 및 기업경영 진단 (Legal & Management)",
        desc: "노동·인권 리스크 관리와 지속가능경영 보고서 작성 등 기업의 법적·경영적 신뢰도를 제고합니다.",
        members: [
            { name: "최정철 박사", title: "경영학", desc: "인하대학교 교수, 노동·인권 및 지속가능경영보고서(GRI) 전문가" },
            { name: "류호식 대표", title: "공인노무사", desc: "라온 노무법인 대표, 노동·인권 및 중대재해 예방 컨설팅 전문가 (30년 경력)" },
            { name: "정택근 대표", title: "공인노무사", desc: "전 고용노동부 근로감독과장 (35년 경력), 노동·인권 실사 및 ESG 경영평가 전문가" },
            { name: "성의경 대표", title: "경영지도사", desc: "전 신용보증기금 영업본부장, 기업 진단 및 경영 컨설팅 전문가 (35년 경력)" },
            { name: "노기후 대표", title: "경영지도사", desc: "공급망 실사, 탄소배출권, CDP 및 CBAM 대응 전문가 (30년 경력)" },
        ]
    }
];

// Data for History
const historyData = [
    { year: 2025, month: 12, content: "미래내일 청년일경험 사업 우수기관 선정" },
    { year: 2025, month: 12, content: "『ESG 공급망 실사관리사 1급』 자격시험 시행: 20명 합격" },
    { 
        year: 2025, month: 3, 
        content: "『대한상공회의소』 주관 미래내일 청년일경험 사업 운영기관 선정",
        details: ["인턴형: 한국철도공사, 한국농수산식품유통공사, 하나금융TI 등 11개 기관 308명", "프로젝트형: 한국철도공사, 셀트리온 69명"]
    },
    { 
        year: 2025, month: 2, 
        content: "『노사발전재단』 주관 일터혁신 컨설팅 운영 기관 선정(CNP 공동)",
        details: ["(주) 서현 등 44개 기관 일터 혁신 컨설팅 수행"]
    },
    { year: 2024, month: 12, content: "항공기업 ESG 사내전문가 양성교육 실시 (항공우주산학융합원 발주)" },
    { year: 2024, month: 12, content: "『사단법인 한국HRD협회』 업무 협약(MOU) 체결" },
    { year: 2024, month: 9, content: "『대한상공회의소』 주관 미래내일 청년일경험 사업 운영기관 선정" },
    { year: 2024, month: 7, content: "공공기관 안전활동 수행 평가 기업 컨설팅" },
    { year: 2024, month: 5, content: "『한국경영기술지도사회』 업무 협약(MOU) 체결" },
    { year: 2024, month: 3, content: "『한국기술교육대학교』 주관 STEP 학습관리시스템 운영기관 선정" },
    { year: 2024, month: 2, content: "2024년 『한국산업인력공단』 주관 공정채용 컨설팅 사업 수주 (공인노무사회 공동)" },
    { year: 2024, month: 1, content: "사단법인 ESG 노동사회협회(ELSA) 설립 허가 (고용노동부)" },
    { year: 2023, month: 12, content: "사단법인 ESG 노동사회협회(ELSA) 창립 총회 개최" },
];

// Content Renderer
const ContentArea: React.FC<{ category: string, title: string }> = ({ category, title }) => {
    
    // Layout: Chairman's Greeting
    if (title === '이사장 인사말') {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm min-h-[500px]">
                <h3 className="text-3xl font-bold text-[#2F4F4F] mb-8 pb-4 border-b border-gray-100">{title}</h3>
                
                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    {/* Profile Section */}
                    <div className="w-full lg:w-1/3 flex flex-col items-center flex-shrink-0">
                        <div className="w-full aspect-[3/4] max-w-[300px] bg-gray-100 rounded-2xl overflow-hidden shadow-lg mb-6 relative border border-gray-200">
                             <img 
                                src="/chairman.jpg" 
                                alt="이성기 이사장" 
                                className="w-full h-full object-cover object-[65%_center]"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none'; 
                                    const parent = e.currentTarget.parentElement;
                                    if(parent) {
                                        parent.innerHTML = `
                                            <div class="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                                                <svg class="w-20 h-20" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                                            </div>
                                        `;
                                    }
                                }}
                             />
                        </div>
                        <div className="text-center w-full max-w-[300px]">
                            <h4 className="text-2xl font-bold text-gray-900 mb-1">이 성 기</h4>
                            <p className="text-[#2F4F4F] font-bold text-sm mb-4">(사)ESG노동사회협회 이사장</p>
                            <div className="text-gray-500 text-sm space-y-2 bg-gray-50 p-5 rounded-xl w-full border border-gray-100 shadow-sm text-left">
                                <p className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F4F4F] mt-1.5 flex-shrink-0"></span>
                                    <span>前 고용노동부 차관</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F4F4F] mt-1.5 flex-shrink-0"></span>
                                    <span>前 한국기술교육대학교 총장</span>
                                </p>
                                <p className="flex items-start gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F4F4F] mt-1.5 flex-shrink-0"></span>
                                    <span>제32회 행정고시 합격</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Text Section */}
                    <div className="w-full lg:w-2/3 prose prose-lg max-w-none text-gray-700">
                        <h4 className="text-2xl font-bold text-[#2F4F4F] mb-8 relative">
                            <span className="relative z-10">"기업의 지속가능한 성장과 노동존중 사회,<br/> ELSA가 함께 엽니다."</span>
                            <div className="absolute bottom-1 left-0 w-24 h-3 bg-[#D4FF3F] -z-0 opacity-60 rounded-full"></div>
                        </h4>
                        
                        <div className="space-y-6 text-[16px] leading-8 text-justify font-light text-gray-800">
                            <p>
                                안녕하십니까. <strong>(사)ESG노동사회협회(ELSA) 이사장 이성기</strong>입니다.
                            </p>
                            <p>
                                최근 글로벌 경제 시스템은 급격한 전환기를 맞이하고 있습니다. EU CSDDD(기업 지속가능성 실사 지침)를 비롯한 글로벌 공급망 규제는 이제 우리 기업들에게 단순한 '사회 공헌'을 넘어 실질적인 <strong>'생존 전략'</strong>이 되었습니다. 특히 노동 환경과 인권 경영을 중심으로 하는 'S(Social)' 분야의 대응은 기업 경쟁력의 핵심 지표가 되었습니다.
                            </p>
                            <p>
                                ELSA는 <strong>대한민국 최고의 고용노동 행정 및 법률 전문가 집단</strong>입니다. 우리는 35년 이상 노동 정책을 입안하고 집행해온 고위 관료, 노동법 학자, 그리고 풍부한 현장 경험을 가진 공인노무사와 경영지도사들이 뜻을 모아 설립했습니다.
                            </p>
                            <p>
                                우리의 차별점은 '책상 위'가 아닌 <strong>'일터 현장'</strong>에 있습니다. 지난 3년간 100여 개 기업과 함께하며 청년 일경험 지원과 일터혁신 컨설팅을 성공적으로 수행해온 실전 데이터는 ELSA만의 독보적인 자산입니다. 우리는 복잡한 법리와 규제를 나열하는 데 그치지 않고, 기업이 즉시 적용 가능한 '실행 가능한 솔루션'을 제공합니다.
                            </p>
                            <p>
                                글로벌 공급망 실사의 선도 기관으로서 함께하겠습니다. ELSA는 기업이 규제를 넘어 지속가능한 성장을 이루고, 노동자가 존중받는 건강한 산업 생태계를 조성하는 데 앞장서겠습니다. 대한민국 기업들이 글로벌 시장에서 가장 신뢰받는 파트너로 우뚝 설 수 있도록, 저희 ELSA가 든든한 전략적 동반자가 되어 드릴 것을 약속드립니다.
                            </p>
                            <p>
                                감사합니다.
                            </p>
                        </div>
                        
                        <div className="mt-12 flex justify-end items-center gap-4">
                            <div className="text-right">
                                <p className="text-lg font-bold text-gray-900">(사)ESG노동사회협회 이사장</p>
                                <p className="text-3xl font-serif font-bold mt-1 text-[#2F4F4F]">이 성 기</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Layout: Key Members (주요 회원)
    if (title === '주요 회원') {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm min-h-[500px]">
                <h3 className="text-3xl font-bold text-[#2F4F4F] mb-8 pb-4 border-b border-gray-100">{title}</h3>
                
                <div className="space-y-16">
                    {memberGroups.map((group, idx) => (
                        <div key={idx} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                            <div className="mb-6">
                                <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
                                    <div className="w-1.5 h-8 bg-[#D4FF3F] rounded-full"></div>
                                    {group.title}
                                </h4>
                                <p className="text-gray-600 pl-4">{group.desc}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-4">
                                {group.members.map((member, mIdx) => (
                                    <div key={mIdx} className="flex flex-col md:flex-row md:items-center bg-gray-50 p-5 rounded-lg border border-gray-100 hover:border-[#2F4F4F]/30 hover:shadow-md transition-all">
                                        <div className="md:w-48 flex-shrink-0 mb-2 md:mb-0">
                                            <span className="text-lg font-bold text-[#2F4F4F]">{member.name}</span>
                                            <span className="text-sm text-gray-500 ml-2">({member.title})</span>
                                        </div>
                                        <div className="flex-grow text-gray-700 text-sm md:text-base border-l-0 md:border-l-2 border-gray-200 md:pl-4">
                                            {member.desc}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Layout: History (협회 연혁)
    if (title === '협회 연혁') {
        return (
            <div className="bg-white rounded-xl border border-gray-200 p-8 md:p-12 shadow-sm min-h-[500px]">
                <h3 className="text-3xl font-bold text-[#2F4F4F] mb-12 pb-4 border-b border-gray-100">{title}</h3>
                
                <div className="relative border-l-2 border-[#2F4F4F]/20 ml-4 md:ml-8 space-y-12">
                    {historyData.map((item, idx) => (
                        <div key={idx} className="relative pl-8 md:pl-12 group">
                            {/* Dot */}
                            <div className="absolute -left-[9px] top-1.5 w-[18px] h-[18px] bg-white border-4 border-[#2F4F4F] rounded-full group-hover:scale-125 group-hover:bg-[#D4FF3F] transition-all duration-300"></div>
                            
                            {/* Content */}
                            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
                                <div className="flex-shrink-0 w-24 font-bold text-[#2F4F4F] text-lg">
                                    {item.year}. {String(item.month).padStart(2, '0')}
                                </div>
                                <div className="flex-grow pb-1">
                                    <p className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#2F4F4F] transition-colors">
                                        {item.content}
                                    </p>
                                    {item.details && (
                                        <ul className="mt-2 space-y-1">
                                            {item.details.map((detail, dIdx) => (
                                                <li key={dIdx} className="text-sm text-gray-600 flex items-start gap-2">
                                                    <span className="w-1 h-1 rounded-full bg-gray-400 mt-2 flex-shrink-0"></span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

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
import React from 'react';

interface WebzineProps {
  onNavigate?: (subItem: string) => void;
}

const webzineContent = [
  {
    category: '특집 기사',
    title: 'ESG 트렌드 및 이슈 분석',
    desc: '공급망 실사 대응 전략과 중대재해처벌법 사례 연구'
  },
  {
    category: '전문가 칼럼',
    title: '노동법 전문가 기고',
    desc: '안전보건 전문가 인사이트 및 ESG 컨설턴트 조언'
  },
  {
    category: '정책 동향',
    title: '국내외 ESG 관련 법규 변화',
    desc: '정부 지원정책 업데이트 및 산업별 규제 현황'
  },
  {
    category: '회원사 소식', // Changed to match a potential subItem if needed, or keep as is. '현장 스토리' needs mapping.
    title: '회원사 ESG 실천 사례',
    desc: '일터혁신 성공 스토리와 청년 인재 채용 경험담'
  },
  {
    category: '교육/행사', // Changed from '교육 및 행사' to match Navbar subItems if strict matching used.
    title: '세미나 및 워크숍 후기',
    desc: '교육 프로그램 소개와 컨퍼런스 하이라이트'
  },
  {
    category: '특집 기사', // Reused category for layout filling
    title: 'ESG 실사 준비도 현황',
    desc: '산업재해 발생 통계 및 노동법 위반 사례 분석'
  }
];

export const Webzine: React.FC<WebzineProps> = ({ onNavigate }) => {
  return (
    <section id="webzine" className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
             <h2 className="text-3xl md:text-4xl font-bold text-[#2F4F4F] mb-4">웹진</h2>
             <div className="w-16 h-1 bg-[#2F4F4F] rounded-full"></div>
          </div>
          <button 
            onClick={() => onNavigate && onNavigate('특집 기사')}
            className="text-[#2F4F4F] font-semibold hover:underline mt-4 md:mt-0 flex items-center gap-1"
          >
            전체 보기
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {webzineContent.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => onNavigate && onNavigate(item.category)}
              className="group cursor-pointer text-left w-full"
            >
              <div className="bg-gray-100 aspect-video rounded-lg mb-4 overflow-hidden relative">
                <div className="absolute inset-0 bg-[#2F4F4F]/10 group-hover:bg-transparent transition-colors"></div>
                {/* Placeholder for images */}
                <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200">
                   Image
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#A9D95D] uppercase tracking-wider mb-2 bg-[#2F4F4F] w-fit px-2 py-1 rounded">
                  {item.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#2F4F4F] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};